/* eslint-env jest */
const mockPrisma = {
  workspace_chats: {
    findMany: jest.fn(),
  },
  conversation_flags: {
    findFirst: jest.fn(),
  },
};

jest.mock('../../utils/prisma', () => mockPrisma);
jest.mock('../../models/workspace', () => ({
  Workspace: {
    where: jest.fn(),
  },
}));
jest.mock('../../models/workspaceThread', () => ({
  WorkspaceThread: {
    where: jest.fn(),
  },
}));

const { ConversationFlags } = require('../../models/conversationFlags');
const { Workspace } = require('../../models/workspace');
const { WorkspaceThread } = require('../../models/workspaceThread');

describe('ConversationFlags', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('allows admins and managers to open active workspace chat cases', () => {
    expect(
      ConversationFlags.canViewFlaggedConversation(
        { role: 'admin' },
        { status: 'open', sourceType: 'workspace_chat' }
      )
    ).toBe(true);

    expect(
      ConversationFlags.canViewFlaggedConversation(
        { role: 'manager' },
        { status: 'open', sourceType: 'workspace_chat' }
      )
    ).toBe(true);
  });

  test('denies access for closed cases or unsupported actors', () => {
    expect(
      ConversationFlags.canViewFlaggedConversation(
        { role: 'admin' },
        { status: 'resolved', sourceType: 'workspace_chat' }
      )
    ).toBe(false);

    expect(
      ConversationFlags.canViewFlaggedConversation(
        { role: 'default' },
        { status: 'open', sourceType: 'workspace_chat' }
      )
    ).toBe(false);
  });

  test('serializes metadata without raw prompt, response, or attachment payloads', async () => {
    mockPrisma.workspace_chats.findMany.mockResolvedValue([
      {
        id: 44,
        workspaceId: 11,
        thread_id: 22,
        api_session_id: null,
        createdAt: new Date("2026-03-18T12:00:00Z"),
        response: JSON.stringify({
          text: 'assistant response that should stay hidden',
          attachments: [
            {
              name: 'secret.txt',
              mime: 'text/plain',
              contentString: 'do-not-leak',
            },
          ],
          metrics: {
            provider: 'openrouter',
            model: 'openrouter/test-model',
          },
        }),
        users: {
          id: 9,
          username: 'member-user',
          suspended: 0,
        },
        conversation_flag: {
          riskLevel: 'review',
          categories: JSON.stringify(['prompt_injection']),
          status: 'open',
        },
      },
    ]);
    Workspace.where.mockResolvedValue([
      { id: 11, name: 'Assigned Workspace', slug: 'assigned-workspace' },
    ]);
    WorkspaceThread.where.mockResolvedValue([
      { id: 22, name: 'Incident Review', slug: 'incident-review' },
    ]);
    jest.spyOn(ConversationFlags, 'openCountsByUserIds').mockResolvedValue(
      new Map([[9, 1]])
    );

    const results = await ConversationFlags.listMetadataByClause({
      clause: { workspaceId: 11 },
      limit: 10,
    });

    expect(results).toEqual([
      expect.objectContaining({
        id: 44,
        chatId: 44,
        provider: 'openrouter',
        model: 'openrouter/test-model',
        attachmentCount: 1,
        riskLevel: 'review',
        categories: ['prompt_injection'],
      }),
    ]);
    expect(results[0].prompt).toBeUndefined();
    expect(results[0].response).toBeUndefined();
    expect(results[0].responseText).toBeUndefined();
    expect(JSON.stringify(results[0])).not.toContain('do-not-leak');
    ConversationFlags.openCountsByUserIds.mockRestore();
  });

  test('returns full flagged review DTO only from the review accessor and sanitizes attachments', async () => {
    mockPrisma.conversation_flags.findFirst.mockResolvedValue({
      id: 77,
      sourceType: 'workspace_chat',
      chatId: 12,
      userId: 9,
      workspaceId: 11,
      threadId: 22,
      riskLevel: 'review',
      categories: JSON.stringify(['secrets_credentials']),
      matchedRules: JSON.stringify([
        {
          id: 'secret.api_key',
          category: 'secrets_credentials',
        },
      ]),
      status: 'open',
      resolution: 'none',
      createdAt: new Date("2026-03-18T12:00:00Z"),
      chat: {
        id: 12,
        api_session_id: null,
      },
      workspace: {
        id: 11,
        name: 'Assigned Workspace',
        slug: 'assigned-workspace',
      },
      thread: {
        id: 22,
        name: 'Incident Review',
        slug: 'incident-review',
      },
      reviewer: null,
    });
    mockPrisma.workspace_chats.findMany.mockResolvedValue([
      {
        id: 12,
        prompt: 'My API key is sk-testsecret1234567890',
        response: JSON.stringify({
          text: 'assistant response',
          attachments: [
            {
              name: 'secret.txt',
              mime: 'text/plain',
              contentString: 'do-not-leak',
            },
          ],
          metrics: {
            provider: 'openrouter',
            model: 'openrouter/test-model',
          },
        }),
        createdAt: new Date("2026-03-18T12:00:00Z"),
      },
    ]);

    const review = await ConversationFlags.getReviewConversation(77);

    expect(review).toEqual(
      expect.objectContaining({
        caseId: 77,
        flag: expect.objectContaining({
          chatId: 12,
          categories: ['secrets_credentials'],
        }),
      })
    );
    expect(review.messages[0]).toEqual(
      expect.objectContaining({
        prompt: 'My API key is sk-testsecret1234567890',
        responseText: 'assistant response',
        attachments: [
          {
            name: 'secret.txt',
            mime: 'text/plain',
          },
        ],
      })
    );
    expect(JSON.stringify(review.messages[0])).not.toContain('do-not-leak');
  });
});
