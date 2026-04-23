/* eslint-env jest */
const request = require("supertest");
const { safeJsonParse } = require("../../utils/http");
const { createSecurityHarness } = require("../../test-support/securityHarness");
const { ApiKey } = require("../../models/apiKeys");

jest.setTimeout(30000);

const FORBIDDEN_METADATA_KEYS = new Set([
  "prompt",
  "response",
  "contentString",
  "text",
  "message",
]);

function expectNoPayloadFields(value, path = "payload") {
  if (Array.isArray(value)) {
    value.forEach((entry, index) =>
      expectNoPayloadFields(entry, `${path}[${index}]`)
    );
    return;
  }

  if (!value || typeof value !== "object") return;

  for (const [key, nestedValue] of Object.entries(value)) {
    expect(FORBIDDEN_METADATA_KEYS.has(key)).toBe(false);
    expectNoPayloadFields(nestedValue, `${path}.${key}`);
  }
}

function expectMetadataOnly(payload, sensitiveValues = []) {
  expectNoPayloadFields(payload);
  const serialized = JSON.stringify(payload);
  for (const value of sensitiveValues) {
    expect(serialized).not.toContain(value);
  }
}

describe("api conversation security contracts", () => {
  let harness;
  let app;
  let prisma;
  let fixtures;
  let ApiChatHandler;

  beforeAll(async () => {
    harness = await createSecurityHarness();
    app = harness.app;
    prisma = harness.prisma;
    fixtures = harness.fixtures;
    ({ ApiChatHandler } = require("../../utils/chats/apiChatHandler"));
  });

  afterAll(async () => {
    if (harness) await harness.cleanup();
  });

  test("API history endpoints stay metadata-only for workspace, thread, and embed chats", async () => {
    const serviceThread = await prisma.workspace_threads.create({
      data: {
        name: "Service metadata thread",
        slug: "service-metadata-thread",
        workspace_id: fixtures.workspaces.assignedWorkspace.id,
        user_id: null,
      },
    });
    await prisma.workspace_chats.create({
      data: {
        workspaceId: fixtures.workspaces.assignedWorkspace.id,
        thread_id: serviceThread.id,
        user_id: null,
        api_session_id: null,
        prompt: "Service thread prompt should stay hidden",
        response: JSON.stringify({
          text: "Service thread response should stay hidden",
          sources: [],
        }),
        include: true,
      },
    });

    const [workspaceHistory, threadHistory, embedHistory, embedSessionHistory] =
      await Promise.all([
        request(app)
          .get(`/api/v1/workspace/${fixtures.workspaces.assignedWorkspace.slug}/chats`)
          .set("Authorization", fixtures.auth.apiKey),
        request(app)
          .get(
            `/api/v1/workspace/${fixtures.workspaces.assignedWorkspace.slug}/thread/${serviceThread.slug}/chats`
          )
          .set("Authorization", fixtures.auth.workspaceServiceApiKey),
        request(app)
          .get(`/api/v1/embed/${fixtures.embed.embedConfig.uuid}/chats`)
          .set("Authorization", fixtures.auth.apiKey),
        request(app)
          .get(
            `/api/v1/embed/${fixtures.embed.embedConfig.uuid}/chats/embed-session-1`
          )
          .set("Authorization", fixtures.auth.apiKey),
      ]);

    expect(workspaceHistory.status).toBe(200);
    expect(threadHistory.status).toBe(200);
    expect(embedHistory.status).toBe(200);
    expect(embedSessionHistory.status).toBe(200);

    expect(workspaceHistory.body.history[0].chatId).toBeDefined();
    expect(threadHistory.body.history[0].chatId).toBeDefined();
    expect(embedHistory.body.chats[0].sessionId).toBeDefined();
    expect(embedSessionHistory.body.chats[0].sessionId).toBe("embed-session-1");

    expectMetadataOnly(workspaceHistory.body, [
      fixtures.chats.flaggedDefaultChat.prompt,
      "Flagged default thread response",
    ]);
    expectMetadataOnly(threadHistory.body, [
      "Service thread prompt should stay hidden",
      "Service thread response should stay hidden",
    ]);
    expectMetadataOnly(embedHistory.body, [
      "Embed prompt should stay hidden",
      "Embed response should stay hidden",
    ]);
    expectMetadataOnly(embedSessionHistory.body, [
      "Embed prompt should stay hidden",
      "Embed response should stay hidden",
    ]);
  });

  test("admin API metadata queue stays metadata-only", async () => {
    const response = await request(app)
      .post("/api/v1/admin/workspace-chats")
      .set("Authorization", fixtures.auth.apiKey)
      .send({ offset: 0 });

    expect(response.status).toBe(200);
    expect(response.body.chats.length).toBeGreaterThan(0);
    expectMetadataOnly(response.body, [
      fixtures.chats.flaggedDefaultChat.prompt,
      "Flagged default thread response",
    ]);
  });

  test("API-key moderation actions emit audit records with API key identity", async () => {
    const response = await request(app)
      .post(`/api/v1/admin/conversation-flags/${fixtures.flags.openNamedFlag.id}/suspend-user`)
      .set("Authorization", fixtures.auth.apiKey)
      .send({ reviewNote: "API moderation action" });

    expect(response.status).toBe(200);

    const user = await prisma.users.findUnique({
      where: { id: fixtures.users.member.id },
    });
    const flag = await prisma.conversation_flags.findUnique({
      where: { id: fixtures.flags.openNamedFlag.id },
    });
    const event = await prisma.event_logs.findFirst({
      where: { event: "user_suspended_from_flag" },
      orderBy: { id: "desc" },
    });

    expect(user.suspended).toBe(1);
    expect(flag.status).toBe("resolved");
    expect(safeJsonParse(event.metadata, {})).toEqual(
      expect.objectContaining({
        caseId: fixtures.flags.openNamedFlag.id,
        apiKeyId: fixtures.apiKey.id,
        createdBy: fixtures.users.apiKeyOwner.id,
        })
    );
  });

  test("API keys cannot mint delegated user login tokens", async () => {
    const originalSimpleSSOEnabled = process.env.SIMPLE_SSO_ENABLED;
    process.env.SIMPLE_SSO_ENABLED = "true";
    try {
      const priorCount = await prisma.temporary_auth_tokens.count({
        where: { userId: fixtures.users.member.id },
      });
      const response = await request(app)
        .get(`/api/v1/users/${fixtures.users.member.id}/issue-auth-token`)
        .set("Authorization", fixtures.auth.apiKey);

      expect(response.status).toBe(403);
      expect(response.text || JSON.stringify(response.body)).toContain(
        "cannot issue user auth tokens"
      );
      const afterCount = await prisma.temporary_auth_tokens.count({
        where: { userId: fixtures.users.member.id },
      });
      expect(afterCount).toBe(priorCount);
    } finally {
      if (originalSimpleSSOEnabled === undefined) {
        delete process.env.SIMPLE_SSO_ENABLED;
      } else {
        process.env.SIMPLE_SSO_ENABLED = originalSimpleSSOEnabled;
      }
    }
  });

  test("admin API-key endpoints create and list workspace service keys with workspace metadata", async () => {
    const workspace = fixtures.workspaces.assignedWorkspace;

    const createResponse = await request(app)
      .post("/api/admin/generate-api-key")
      .set("Authorization", fixtures.auth.admin)
      .send({
        name: "Assigned workspace service",
        principalType: "workspace_service",
        workspaceId: workspace.id,
      });

    expect(createResponse.status).toBe(200);
    expect(createResponse.body.error).toBeNull();
    expect(createResponse.body.apiKey).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        bindingStatus: "active",
        bindingValid: true,
        name: "Assigned workspace service",
        principalType: "workspace_service",
        workspaceId: workspace.id,
        workspace: {
          id: workspace.id,
          name: workspace.name,
          slug: workspace.slug,
        },
        scopes: ["workspace:api_sessions:read", "workspace:api_sessions:write"],
      })
    );
    expect(createResponse.body.apiKey.secret).toEqual(expect.any(String));

    const [listResponse, workspaceResponse] = await Promise.all([
      request(app)
        .get("/api/admin/api-keys")
        .set("Authorization", fixtures.auth.admin),
      request(app)
        .get("/api/admin/api-key-workspaces")
        .set("Authorization", fixtures.auth.admin),
    ]);

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.error).toBeNull();
    expect(listResponse.body.apiKeys).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining({
          id: createResponse.body.apiKey.id,
          secret: expect.any(String),
        }),
      ])
    );
    expect(listResponse.body.apiKeys).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: createResponse.body.apiKey.id,
          bindingStatus: "active",
          bindingValid: true,
          name: "Assigned workspace service",
          principalType: "workspace_service",
          workspaceId: workspace.id,
          workspace: {
            id: workspace.id,
            name: workspace.name,
            slug: workspace.slug,
          },
          scopes: ["workspace:api_sessions:read", "workspace:api_sessions:write"],
          createdBy: expect.objectContaining({
            id: fixtures.users.admin.id,
            username: fixtures.users.admin.username,
            role: fixtures.users.admin.role,
          }),
        }),
      ])
    );

    expect(workspaceResponse.status).toBe(200);
    expect(workspaceResponse.body.workspaces).toEqual(
      expect.arrayContaining([
        {
          id: workspace.id,
          name: workspace.name,
          slug: workspace.slug,
        },
      ])
    );
  });

  test("orphaned workspace service keys stay visible in admin lists with invalid binding metadata", async () => {
    const transientWorkspace = await prisma.workspaces.create({
      data: {
        name: "Transient Workspace",
        slug: "transient-workspace",
        chatMode: "chat",
        openAiHistory: 20,
      },
    });

    const createResponse = await request(app)
      .post("/api/admin/generate-api-key")
      .set("Authorization", fixtures.auth.admin)
      .send({
        name: "Transient workspace service",
        principalType: "workspace_service",
        workspaceId: transientWorkspace.id,
      });

    expect(createResponse.status).toBe(200);
    expect(createResponse.body.apiKey).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        bindingStatus: "active",
        bindingValid: true,
        workspaceId: transientWorkspace.id,
      })
    );

    await prisma.workspaces.delete({
      where: { id: transientWorkspace.id },
    });

    const listResponse = await request(app)
      .get("/api/admin/api-keys")
      .set("Authorization", fixtures.auth.admin);

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.apiKeys).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: createResponse.body.apiKey.id,
          name: "Transient workspace service",
          principalType: "workspace_service",
          workspaceId: transientWorkspace.id,
          workspace: null,
          bindingStatus: "orphaned",
          bindingValid: false,
        }),
      ])
    );
    expect(listResponse.body.apiKeys).toEqual(
      expect.not.arrayContaining([
        expect.objectContaining({
          id: createResponse.body.apiKey.id,
          secret: expect.any(String),
        }),
      ])
    );
  });

  test("invalid api-key create does not emit success audit events", async () => {
    const priorCount = await prisma.event_logs.count({
      where: { event: "api_key_created" },
    });

    const response = await request(app)
      .post("/api/admin/generate-api-key")
      .set("Authorization", fixtures.auth.admin)
      .send({
        name: "Broken workspace service",
        principalType: "workspace_service",
      });

    expect(response.status).toBe(200);
    expect(response.body.apiKey).toBeNull();
    expect(response.body.error).toContain("workspaceId");

    const afterCount = await prisma.event_logs.count({
      where: { event: "api_key_created" },
    });
    expect(afterCount).toBe(priorCount);
  });

  test("stale workspace service keys fail closed on auth lookup", async () => {
    const staleKey = await prisma.api_keys.create({
      data: {
        secret: "stale-workspace-service-key",
        createdBy: fixtures.users.admin.id,
        name: "Stale workspace service",
        principalType: "workspace_service",
        workspaceId: 999999,
        scopes: JSON.stringify([
          "workspace:api_sessions:read",
          "workspace:api_sessions:write",
        ]),
      },
    });

    const lookedUpApiKey = await ApiKey.get({ secret: staleKey.secret });
    expect(lookedUpApiKey).toBeNull();

    const response = await request(app)
      .get(`/api/v1/workspace/${fixtures.workspaces.assignedWorkspace.slug}/chats`)
      .set("Authorization", `Bearer ${staleKey.secret}`);

    expect(response.status).toBe(403);
    expect(response.text || JSON.stringify(response.body)).toContain(
      "No valid api key found"
    );
  });

  test("management API keys cannot call raw workspace chat routes", async () => {
    const chatSyncSpy = jest.spyOn(ApiChatHandler, "chatSync").mockResolvedValue({
      id: "stub-chat-id",
      type: "textResponse",
      textResponse: "stub response",
      sources: [],
      close: true,
      error: null,
    });
    const streamChatSpy = jest
      .spyOn(ApiChatHandler, "streamChat")
      .mockImplementation(async ({ response }) => {
        response.write("data: stub\n\n");
      });

    try {
      const [chatResponse, streamChatResponse] = await Promise.all([
        request(app)
          .post(`/api/v1/workspace/${fixtures.workspaces.assignedWorkspace.slug}/chat`)
          .set("Authorization", fixtures.auth.managementApiKey)
          .send({
            message: "hello from management key",
            mode: "chat",
          }),
        request(app)
          .post(
            `/api/v1/workspace/${fixtures.workspaces.assignedWorkspace.slug}/stream-chat`
          )
          .set("Authorization", fixtures.auth.managementApiKey)
          .send({
            message: "hello from management key",
            mode: "chat",
          }),
      ]);

      for (const response of [chatResponse, streamChatResponse]) {
        expect(response.status).toBe(403);
        expect(response.text || JSON.stringify(response.body)).toContain(
          "API key cannot access this route."
        );
      }

      expect(chatSyncSpy).not.toHaveBeenCalled();
      expect(streamChatSpy).not.toHaveBeenCalled();
    } finally {
      chatSyncSpy.mockRestore();
      streamChatSpy.mockRestore();
    }
  });

  test("workspace service API keys can call raw workspace chat only for their bound workspace", async () => {
    const chatSyncSpy = jest.spyOn(ApiChatHandler, "chatSync").mockResolvedValue({
      id: "workspace-service-chat",
      type: "textResponse",
      textResponse: "workspace service response",
      sources: [],
      close: true,
      error: null,
    });
    const streamChatSpy = jest
      .spyOn(ApiChatHandler, "streamChat")
      .mockImplementation(async ({ response }) => {
        response.write("data: stub\n\n");
      });

    try {
      const allowedResponse = await request(app)
        .post(`/api/v1/workspace/${fixtures.workspaces.assignedWorkspace.slug}/chat`)
        .set("Authorization", fixtures.auth.workspaceServiceApiKey)
        .send({
          message: "hello from bound workspace key",
          mode: "chat",
        });

      expect(allowedResponse.status).toBe(200);
      expect(allowedResponse.body).toEqual(
        expect.objectContaining({
          id: "workspace-service-chat",
          textResponse: "workspace service response",
        })
      );
      expect(chatSyncSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          workspace: expect.objectContaining({
            id: fixtures.workspaces.assignedWorkspace.id,
          }),
          message: "hello from bound workspace key",
          mode: "chat",
        })
      );

      chatSyncSpy.mockClear();
      streamChatSpy.mockClear();

      const [deniedHistoryResponse, deniedChatResponse, deniedStreamResponse] =
        await Promise.all([
          request(app)
            .get(
              `/api/v1/workspace/${fixtures.workspaces.unassignedWorkspace.slug}/chats`
            )
            .set("Authorization", fixtures.auth.workspaceServiceApiKey),
          request(app)
            .post(
              `/api/v1/workspace/${fixtures.workspaces.unassignedWorkspace.slug}/chat`
            )
            .set("Authorization", fixtures.auth.workspaceServiceApiKey)
            .send({
              message: "hello from wrong workspace key",
              mode: "chat",
            }),
          request(app)
            .post(
              `/api/v1/workspace/${fixtures.workspaces.unassignedWorkspace.slug}/stream-chat`
            )
            .set("Authorization", fixtures.auth.workspaceServiceApiKey)
            .send({
              message: "hello from wrong workspace key",
              mode: "chat",
            }),
        ]);

      for (const response of [
        deniedHistoryResponse,
        deniedChatResponse,
        deniedStreamResponse,
      ]) {
        expect(response.status).toBe(403);
        expect(response.text || JSON.stringify(response.body)).toContain(
          "API key cannot access this workspace."
        );
      }
      expect(chatSyncSpy).not.toHaveBeenCalled();
      expect(streamChatSpy).not.toHaveBeenCalled();
    } finally {
      chatSyncSpy.mockRestore();
      streamChatSpy.mockRestore();
    }
  });

  test("vector search enforces API-key capability and workspace binding", async () => {
    const [managementResponse, unboundWorkspaceResponse] = await Promise.all([
      request(app)
        .post(
          `/api/v1/workspace/${fixtures.workspaces.assignedWorkspace.slug}/vector-search`
        )
        .set("Authorization", fixtures.auth.managementApiKey)
        .send({
          query: "sensitive retrieval",
          topN: 1,
        }),
      request(app)
        .post(
          `/api/v1/workspace/${fixtures.workspaces.unassignedWorkspace.slug}/vector-search`
        )
        .set("Authorization", fixtures.auth.workspaceServiceApiKey)
        .send({
          query: "cross workspace retrieval",
          topN: 1,
        }),
    ]);

    expect(managementResponse.status).toBe(403);
    expect(
      managementResponse.text || JSON.stringify(managementResponse.body)
    ).toContain("API key cannot access this route.");

    expect(unboundWorkspaceResponse.status).toBe(403);
    expect(
      unboundWorkspaceResponse.text ||
        JSON.stringify(unboundWorkspaceResponse.body)
    ).toContain("API key cannot access this workspace.");
  });

  test("thread creation enforces API-key capability and workspace binding", async () => {
    const [managementResponse, unboundWorkspaceResponse] = await Promise.all([
      request(app)
        .post(`/api/v1/workspace/${fixtures.workspaces.assignedWorkspace.slug}/thread/new`)
        .set("Authorization", fixtures.auth.managementApiKey)
        .send({
          name: "Management-created thread",
        }),
      request(app)
        .post(`/api/v1/workspace/${fixtures.workspaces.unassignedWorkspace.slug}/thread/new`)
        .set("Authorization", fixtures.auth.workspaceServiceApiKey)
        .send({
          name: "Wrong workspace thread",
        }),
    ]);

    expect(managementResponse.status).toBe(403);
    expect(
      managementResponse.text || JSON.stringify(managementResponse.body)
    ).toContain("API key cannot access this route.");

    expect(unboundWorkspaceResponse.status).toBe(403);
    expect(
      unboundWorkspaceResponse.text ||
        JSON.stringify(unboundWorkspaceResponse.body)
    ).toContain("API key cannot access this workspace.");
  });

  test("thread mutations enforce workspace binding for workspace service keys", async () => {
    const threadSlug = fixtures.threads.namedThread.slug;
    const workspaceSlug = fixtures.workspaces.unassignedWorkspace.slug;

    const [updateResponse, deleteResponse] = await Promise.all([
      request(app)
        .post(`/api/v1/workspace/${workspaceSlug}/thread/${threadSlug}/update`)
        .set("Authorization", fixtures.auth.workspaceServiceApiKey)
        .send({
          name: "Cross workspace update attempt",
        }),
      request(app)
        .delete(`/api/v1/workspace/${workspaceSlug}/thread/${threadSlug}`)
        .set("Authorization", fixtures.auth.workspaceServiceApiKey),
    ]);

    for (const response of [updateResponse, deleteResponse]) {
      expect(response.status).toBe(404);
    }
  });

  test("management keys cannot read thread history metadata routes", async () => {
    const response = await request(app)
      .get(
        `/api/v1/workspace/${fixtures.workspaces.assignedWorkspace.slug}/thread/${fixtures.threads.aliceOwnedThread.slug}/chats`
      )
      .set("Authorization", fixtures.auth.managementApiKey);

    expect(response.status).toBe(403);
    expect(response.text || JSON.stringify(response.body)).toContain(
      "API key cannot access this route."
    );
  });

  test("workspace service keys cannot operate on user-owned threads in their bound workspace", async () => {
    const chatSyncSpy = jest.spyOn(ApiChatHandler, "chatSync").mockResolvedValue({
      id: "thread-chat-id",
      type: "textResponse",
      textResponse: "unexpected thread response",
      sources: [],
      close: true,
      error: null,
    });
    const streamChatSpy = jest
      .spyOn(ApiChatHandler, "streamChat")
      .mockImplementation(async ({ response }) => {
        response.write("data: unexpected\n\n");
      });

    try {
      const threadPath = `/api/v1/workspace/${fixtures.workspaces.assignedWorkspace.slug}/thread/${fixtures.threads.aliceOwnedThread.slug}`;
      const [historyResponse, updateResponse, deleteResponse, chatResponse, streamResponse] =
        await Promise.all([
          request(app)
            .get(`${threadPath}/chats`)
            .set("Authorization", fixtures.auth.workspaceServiceApiKey),
          request(app)
            .post(`${threadPath}/update`)
            .set("Authorization", fixtures.auth.workspaceServiceApiKey)
            .send({ name: "Unauthorized rename attempt" }),
          request(app)
            .delete(threadPath)
            .set("Authorization", fixtures.auth.workspaceServiceApiKey),
          request(app)
            .post(`${threadPath}/chat`)
            .set("Authorization", fixtures.auth.workspaceServiceApiKey)
            .send({
              message: "hello from workspace service",
              mode: "chat",
            }),
          request(app)
            .post(`${threadPath}/stream-chat`)
            .set("Authorization", fixtures.auth.workspaceServiceApiKey)
            .send({
              message: "hello from workspace service",
              mode: "chat",
            }),
        ]);

      for (const response of [
        historyResponse,
        updateResponse,
        deleteResponse,
        chatResponse,
        streamResponse,
      ]) {
        expect(response.status).toBe(404);
      }

      expect(chatSyncSpy).not.toHaveBeenCalled();
      expect(streamChatSpy).not.toHaveBeenCalled();
    } finally {
      chatSyncSpy.mockRestore();
      streamChatSpy.mockRestore();
    }
  });

  test("workspace service keys can still operate on service-owned threads in their bound workspace", async () => {
    const createResponse = await request(app)
      .post(`/api/v1/workspace/${fixtures.workspaces.assignedWorkspace.slug}/thread/new`)
      .set("Authorization", fixtures.auth.workspaceServiceApiKey)
      .send({
        name: "Workspace service thread",
      });

    expect(createResponse.status).toBe(200);
    expect(createResponse.body.thread).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        workspace_id: fixtures.workspaces.assignedWorkspace.id,
        user_id: null,
      })
    );

    const threadSlug = createResponse.body.thread.slug;
    const threadPath = `/api/v1/workspace/${fixtures.workspaces.assignedWorkspace.slug}/thread/${threadSlug}`;
    const chatSyncSpy = jest.spyOn(ApiChatHandler, "chatSync").mockResolvedValue({
      id: "workspace-service-thread-chat",
      type: "textResponse",
      textResponse: "workspace service thread response",
      sources: [],
      close: true,
      error: null,
    });
    const streamChatSpy = jest
      .spyOn(ApiChatHandler, "streamChat")
      .mockImplementation(async ({ response }) => {
        response.write("data: workspace service thread\n\n");
      });

    try {
      const historyResponse = await request(app)
        .get(`${threadPath}/chats`)
        .set("Authorization", fixtures.auth.workspaceServiceApiKey);
      const updateResponse = await request(app)
        .post(`${threadPath}/update`)
        .set("Authorization", fixtures.auth.workspaceServiceApiKey)
        .send({ name: "Renamed workspace service thread" });
      const chatResponse = await request(app)
        .post(`${threadPath}/chat`)
        .set("Authorization", fixtures.auth.workspaceServiceApiKey)
        .send({
          message: "hello from bound service thread",
          mode: "chat",
        });
      const streamResponse = await request(app)
        .post(`${threadPath}/stream-chat`)
        .set("Authorization", fixtures.auth.workspaceServiceApiKey)
        .send({
          message: "hello from bound service thread",
          mode: "chat",
        });
      const deleteResponse = await request(app)
        .delete(threadPath)
        .set("Authorization", fixtures.auth.workspaceServiceApiKey);

      expect(historyResponse.status).toBe(200);
      expect(Array.isArray(historyResponse.body.history)).toBe(true);
      expect(updateResponse.status).toBe(200);
      expect(updateResponse.body.thread.name).toBe("Renamed workspace service thread");
      expect(chatResponse.status).toBe(200);
      expect(chatResponse.body).toEqual(
        expect.objectContaining({
          id: "workspace-service-thread-chat",
          textResponse: "workspace service thread response",
        })
      );
      expect(streamResponse.status).toBe(200);
      expect(deleteResponse.status).toBe(200);

      expect(chatSyncSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          thread: expect.objectContaining({
            slug: threadSlug,
            user_id: null,
          }),
        })
      );
      expect(streamChatSpy).toHaveBeenCalled();
    } finally {
      chatSyncSpy.mockRestore();
      streamChatSpy.mockRestore();
    }
  });

  test("API thread and chat endpoints reject arbitrary user targeting", async () => {
    const [threadResponse, chatResponse, streamChatResponse] = await Promise.all([
      request(app)
        .post(`/api/v1/workspace/${fixtures.workspaces.assignedWorkspace.slug}/thread/new`)
        .set("Authorization", fixtures.auth.workspaceServiceApiKey)
        .send({
          userId: fixtures.users.member.id,
          name: "Unsafe delegated thread",
        }),
      request(app)
        .post(
          `/api/v1/workspace/${fixtures.workspaces.assignedWorkspace.slug}/thread/${fixtures.threads.namedThread.slug}/chat`
        )
        .set("Authorization", fixtures.auth.workspaceServiceApiKey)
        .send({
          message: "hello",
          mode: "chat",
          userId: fixtures.users.member.id,
        }),
      request(app)
        .post(
          `/api/v1/workspace/${fixtures.workspaces.assignedWorkspace.slug}/thread/${fixtures.threads.namedThread.slug}/stream-chat`
        )
        .set("Authorization", fixtures.auth.workspaceServiceApiKey)
        .send({
          message: "hello",
          mode: "chat",
          userId: fixtures.users.member.id,
        }),
    ]);

    for (const response of [threadResponse, chatResponse, streamChatResponse]) {
      expect(response.status).toBe(403);
      expect(response.text || JSON.stringify(response.body)).toContain(
        "API keys cannot target users explicitly."
      );
    }
  });
});
