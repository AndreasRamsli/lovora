/* eslint-env jest */

const request = require("supertest");
const { createSecurityHarness } = require("../../test-support/securityHarness");

jest.setTimeout(30000);

function expectForbidden(response, message = "API key cannot access this route.") {
  expect(response.status).toBe(403);
  expect(response.body).toEqual({ error: message });
}

describe("api openai authz", () => {
  let harness;
  let OpenAICompatibleChat;

  beforeAll(async () => {
    harness = await createSecurityHarness();
    ({ OpenAICompatibleChat } = require("../../utils/chats/openaiCompatible"));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(async () => {
    if (harness) await harness.cleanup();
  });

  test("management keys can access models and vector stores but are denied on chat completions", async () => {
    const { app, fixtures } = harness;
    const chatSyncSpy = jest.spyOn(OpenAICompatibleChat, "chatSync");

    const [modelsResponse, vectorStoresResponse, chatResponse] = await Promise.all([
      request(app)
        .get("/api/v1/openai/models")
        .set("Authorization", fixtures.auth.managementApiKey),
      request(app)
        .get("/api/v1/openai/vector_stores")
        .set("Authorization", fixtures.auth.managementApiKey),
      request(app)
        .post("/api/v1/openai/chat/completions")
        .set("Authorization", fixtures.auth.managementApiKey)
        .send({
          model: fixtures.workspaces.assignedWorkspace.slug,
          messages: [{ role: "user", content: "hello from management" }],
          stream: false,
        }),
    ]);

    expect(modelsResponse.status).toBe(200);
    expect(modelsResponse.body).toEqual(
      expect.objectContaining({
        object: "list",
        data: expect.arrayContaining([
          expect.objectContaining({
            id: fixtures.workspaces.assignedWorkspace.slug,
            object: "model",
          }),
        ]),
      })
    );

    expect(vectorStoresResponse.status).toBe(200);
    expect(vectorStoresResponse.body).toEqual(
      expect.objectContaining({
        data: expect.arrayContaining([
          expect.objectContaining({
            id: fixtures.workspaces.assignedWorkspace.slug,
            object: "vector_store",
          }),
        ]),
        has_more: false,
      })
    );

    expectForbidden(chatResponse);
    expect(chatSyncSpy).not.toHaveBeenCalled();
  });

  test("workspace_service keys are denied on models, vector stores, and embeddings", async () => {
    const { app, fixtures } = harness;
    const [modelsResponse, vectorStoresResponse, embeddingsResponse] =
      await Promise.all([
        request(app)
          .get("/api/v1/openai/models")
          .set("Authorization", fixtures.auth.workspaceServiceApiKey),
        request(app)
          .get("/api/v1/openai/vector_stores")
          .set("Authorization", fixtures.auth.workspaceServiceApiKey),
        request(app)
          .post("/api/v1/openai/embeddings")
          .set("Authorization", fixtures.auth.workspaceServiceApiKey)
          .send({ input: ["authz"] }),
      ]);

    expectForbidden(modelsResponse);
    expectForbidden(vectorStoresResponse);
    expectForbidden(embeddingsResponse);
  });

  test("workspace_service keys bound to the target workspace can use chat completions", async () => {
    const { app, fixtures } = harness;
    const chatResult = {
      id: "chatcmpl-task4",
      object: "chat.completion",
      created: 1710000000,
      model: fixtures.workspaces.assignedWorkspace.slug,
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: "authorized",
          },
          logprobs: null,
          finish_reason: "stop",
        },
      ],
      usage: {},
    };
    const chatSyncSpy = jest
      .spyOn(OpenAICompatibleChat, "chatSync")
      .mockResolvedValue(chatResult);

    const response = await request(app)
      .post("/api/v1/openai/chat/completions")
      .set("Authorization", fixtures.auth.workspaceServiceApiKey)
      .send({
        model: fixtures.workspaces.assignedWorkspace.slug,
        messages: [{ role: "user", content: "hello from workspace service" }],
        stream: false,
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(chatResult);
    expect(chatSyncSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        principal: expect.objectContaining({
          kind: "workspace_service",
          apiKeyId: fixtures.workspaceServiceApiKey.id,
          workspaceId: fixtures.workspaces.assignedWorkspace.id,
        }),
        workspace: expect.objectContaining({
          id: fixtures.workspaces.assignedWorkspace.id,
          slug: fixtures.workspaces.assignedWorkspace.slug,
        }),
        prompt: "hello from workspace service",
      })
    );
  });

  test("chat completions rejects malformed message payloads with a controlled 400", async () => {
    const { app, fixtures } = harness;
    const chatSyncSpy = jest.spyOn(OpenAICompatibleChat, "chatSync");
    const malformedError =
      "No user prompt found. Must be last element in message array with 'user' role.";
    const malformedPayloads = [
      { model: fixtures.workspaces.assignedWorkspace.slug },
      {
        model: fixtures.workspaces.assignedWorkspace.slug,
        messages: { role: "user", content: "not an array" },
      },
      {
        model: fixtures.workspaces.assignedWorkspace.slug,
        messages: [],
      },
      {
        model: fixtures.workspaces.assignedWorkspace.slug,
        messages: [{ role: "assistant", content: "not a user tail" }],
      },
    ];

    const responses = await Promise.all(
      malformedPayloads.map((payload) =>
        request(app)
          .post("/api/v1/openai/chat/completions")
          .set("Authorization", fixtures.auth.workspaceServiceApiKey)
          .send(payload)
      )
    );

    for (const response of responses) {
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        id: expect.any(String),
        type: "abort",
        textResponse: null,
        sources: [],
        close: true,
        error: malformedError,
      });
    }

    expect(chatSyncSpy).not.toHaveBeenCalled();
  });

  test("wrong-workspace workspace_service keys are denied on chat completions", async () => {
    const { app, fixtures } = harness;
    const chatSyncSpy = jest.spyOn(OpenAICompatibleChat, "chatSync");

    const response = await request(app)
      .post("/api/v1/openai/chat/completions")
      .set("Authorization", fixtures.auth.workspaceServiceApiKey)
      .send({
        model: fixtures.workspaces.unassignedWorkspace.slug,
        messages: [{ role: "user", content: "wrong workspace" }],
        stream: false,
      });

    expectForbidden(response, "API key cannot access this workspace.");
    expect(chatSyncSpy).not.toHaveBeenCalled();
  });

  test("denied stream requests never flush SSE success headers", async () => {
    const { app, fixtures } = harness;
    const streamChatSpy = jest.spyOn(OpenAICompatibleChat, "streamChat");

    const response = await request(app)
      .post("/api/v1/openai/chat/completions")
      .set("Authorization", fixtures.auth.managementApiKey)
      .send({
        model: fixtures.workspaces.assignedWorkspace.slug,
        messages: [{ role: "user", content: "stream denial" }],
        stream: true,
      });

    expectForbidden(response);
    expect(response.headers["content-type"] || "").not.toContain(
      "text/event-stream"
    );
    expect(response.headers["cache-control"]).toBeUndefined();
    expect(streamChatSpy).not.toHaveBeenCalled();
  });

  test("OpenAICompatibleChat.chatSync denies non-workspace-service principals before content work", async () => {
    await expect(
      OpenAICompatibleChat.chatSync({
        principal: {
          kind: "management",
          apiKeyId: 9999,
          scopes: ["management:metadata:read"],
        },
        workspace: {
          id: harness.fixtures.workspaces.assignedWorkspace.id,
          slug: harness.fixtures.workspaces.assignedWorkspace.slug,
        },
        prompt: "should fail before chat work",
      })
    ).rejects.toMatchObject({
      status: 403,
      message: "API key cannot access this route.",
    });
  });
});
