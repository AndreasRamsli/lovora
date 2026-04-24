/* eslint-env jest */
const mockPrisma = {
  workspace_chats: {
    findMany: jest.fn(),
  },
  conversation_flags: {
    findFirst: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
  users: {
    update: jest.fn(),
  },
  $transaction: jest.fn(),
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

  test('returns metadata-only flagged review DTO without prompts, responses, or attachment names', async () => {
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
    expect(review.messages).toBeUndefined();
    expect(review.thread).toEqual(
      expect.objectContaining({
        id: 22,
      })
    );
    expect(mockPrisma.conversation_flags.findFirst).toHaveBeenCalledWith({
      where: { id: 77 },
      include: {
        user: true,
        workspace: true,
        thread: true,
        reviewer: true,
      },
    });
    expect(JSON.stringify(review)).not.toContain('prompt');
    expect(JSON.stringify(review)).not.toContain('response');
  });

  test('marks api-session review cases as reviewable for oversight actors', async () => {
    mockPrisma.conversation_flags.findMany.mockResolvedValue([
      {
        id: 91,
        sourceType: 'workspace_chat',
        chatId: 45,
        userId: null,
        workspaceId: 11,
        threadId: null,
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
        reviewedAt: null,
        reviewNote: null,
        createdAt: new Date('2026-03-18T12:00:00Z'),
        reviewer: null,
        user: null,
        workspace: {
          id: 11,
          name: 'Assigned Workspace',
          slug: 'assigned-workspace',
        },
        thread: null,
        chat: {
          id: 45,
          api_session_id: 'api-session-1',
        },
      },
    ]);

    const results = await ConversationFlags.listReviewCases({
      actor: { id: 1, role: 'admin' },
      status: 'open',
      limit: 10,
    });

    expect(results).toEqual([
      expect.objectContaining({
        id: 91,
        userId: null,
        sourceType: 'workspace_chat',
        reviewAvailable: true,
      }),
    ]);
    expect(JSON.stringify(results[0])).not.toContain('prompt');
    expect(JSON.stringify(results[0])).not.toContain('response');
  });

  test('dismiss returns null for flags that are not open', async () => {
    mockPrisma.conversation_flags.findUnique.mockResolvedValue({
      id: 12,
      status: 'dismissed',
      resolution: 'not_actionable',
    });

    const result = await ConversationFlags.dismiss(12, 99, 'already handled');

    expect(result).toBeNull();
    expect(mockPrisma.conversation_flags.update).not.toHaveBeenCalled();
  });

  test('suspendUser returns null for non-open flags', async () => {
    mockPrisma.conversation_flags.findUnique.mockResolvedValue({
      id: 13,
      userId: 9,
      status: 'resolved',
      resolution: 'suspended',
    });

    const result = await ConversationFlags.suspendUser(13, 99, 'too late');

    expect(result).toBeNull();
    expect(mockPrisma.$transaction).not.toHaveBeenCalled();
  });

  test('unsuspendUser returns null for non-suspended flags', async () => {
    mockPrisma.conversation_flags.findUnique.mockResolvedValue({
      id: 14,
      userId: 9,
      status: 'dismissed',
      resolution: 'not_actionable',
    });

    const result = await ConversationFlags.unsuspendUser(14, 99, 'not suspended');

    expect(result).toBeNull();
    expect(mockPrisma.$transaction).not.toHaveBeenCalled();
  });

  test('unsuspendUser moves suspended flags into a non-replayable terminal resolution', async () => {
    mockPrisma.conversation_flags.findUnique.mockResolvedValue({
      id: 15,
      userId: 9,
      status: 'resolved',
      resolution: 'suspended',
    });
    mockPrisma.users.update.mockReturnValue({ kind: 'user-update' });
    mockPrisma.conversation_flags.update.mockReturnValue({ kind: 'flag-update' });
    mockPrisma.$transaction.mockResolvedValue([
      { id: 9, suspended: 0 },
      { id: 15, status: 'resolved', resolution: 'unsuspended' },
    ]);

    const result = await ConversationFlags.unsuspendUser(15, 99, 'appeal accepted');

    expect(result).toEqual({
      id: 15,
      status: 'resolved',
      resolution: 'unsuspended',
    });
    expect(mockPrisma.conversation_flags.update).toHaveBeenCalledWith({
      where: { id: 15 },
      data: expect.objectContaining({
        status: 'resolved',
        resolution: 'unsuspended',
        reviewedBy: 99,
        reviewNote: 'appeal accepted',
      }),
    });
  });
});
