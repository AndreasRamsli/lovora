/* global jest */
const request = require("supertest");
const { createSecurityHarness } = require("../../test-support/securityHarness");

describe("conversation metadata readiness", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("health endpoints report readiness when moderation schema is available", async () => {
    const harness = await createSecurityHarness();

    try {
      const [apiResponse, compatibilityResponse] = await Promise.all([
        request(harness.app).get("/api/health"),
        request(harness.app).get("/v1/api/health"),
      ]);

      for (const response of [apiResponse, compatibilityResponse]) {
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
          expect.objectContaining({
            ready: true,
            success: true,
            checks: {
              databaseConnected: true,
              moderationSchemaAvailable: true,
            },
            code: null,
            error: null,
          })
        );
      }
    } finally {
      await harness.cleanup();
    }
  });

  test("oversight endpoints fail explicitly when moderation schema is unavailable", async () => {
    const harness = await createSecurityHarness({
      includeConversationFlagsSchema: false,
    });

    try {
      const [healthResponse, compatibilityResponse, chatsResponse, flagsResponse, adminResponse] =
        await Promise.all([
        request(harness.app).get("/api/health"),
        request(harness.app).get("/v1/api/health"),
        request(harness.app)
          .post("/api/system/workspace-chats")
          .set("Authorization", harness.fixtures.auth.admin)
          .send({ offset: 0, limit: 20 }),
        request(harness.app)
          .post("/api/system/conversation-flags")
          .set("Authorization", harness.fixtures.auth.manager)
          .send({ offset: 0, limit: 20, status: "open" }),
        request(harness.app)
          .post("/api/v1/admin/workspace-chats")
          .set("Authorization", harness.fixtures.auth.apiKey)
          .send({ offset: 0 }),
      ]);

      for (const response of [healthResponse, compatibilityResponse]) {
        expect(response.status).toBe(503);
        expect(response.body).toEqual(
          expect.objectContaining({
            ready: false,
            success: false,
            checks: {
              databaseConnected: true,
              moderationSchemaAvailable: false,
            },
            code: "conversation_metadata_unavailable",
          })
        );
      }

      for (const response of [chatsResponse, flagsResponse, adminResponse]) {
        expect(response.status).toBe(503);
        expect(response.body).toEqual(
          expect.objectContaining({
            success: false,
            code: "conversation_metadata_unavailable",
            error: expect.stringContaining("Conversation oversight is unavailable"),
          })
        );
      }
    } finally {
      await harness.cleanup();
    }
  });

  test("database outages return structured 503 responses even after a healthy cached readiness check", async () => {
    const harness = await createSecurityHarness();

    try {
      const { ConversationFlags } = require("../../models/conversationFlags");
      const healthyResponse = await request(harness.app).get("/api/health");
      expect(healthyResponse.status).toBe(200);

      const databaseFailure = Object.assign(
        new Error("Cannot reach database server."),
        { code: "P1001" }
      );
      jest
        .spyOn(ConversationFlags, "listMetadata")
        .mockRejectedValueOnce(databaseFailure);
      jest
        .spyOn(harness.prisma, "$queryRawUnsafe")
        .mockRejectedValue(databaseFailure);

      const chatsResponse = await request(harness.app)
        .post("/api/system/workspace-chats")
        .set("Authorization", harness.fixtures.auth.admin)
        .send({ offset: 0, limit: 20 });

      expect(chatsResponse.status).toBe(503);
      expect(chatsResponse.body).toEqual(
        expect.objectContaining({
          success: false,
          code: "database_unavailable",
          error: expect.stringContaining("database is unavailable"),
        })
      );

      const healthResponse = await request(harness.app).get("/api/health");
      expect(healthResponse.status).toBe(503);
      expect(healthResponse.body).toEqual(
        expect.objectContaining({
          ready: false,
          success: false,
          code: "database_unavailable",
          checks: {
            databaseConnected: false,
            moderationSchemaAvailable: false,
          },
        })
      );
    } finally {
      await harness.cleanup();
    }
  });

  test("non-flagged chats still render as safe metadata when schema is healthy", async () => {
    const harness = await createSecurityHarness();

    try {
      const response = await request(harness.app)
        .post("/api/system/workspace-chats")
        .set("Authorization", harness.fixtures.auth.admin)
        .send({ offset: 0, limit: 20 });

      expect(response.status).toBe(200);
      const safeChat = response.body.chats.find(
        (chat) => chat.chatId === harness.fixtures.chats.safeChat.id
      );

      expect(safeChat).toEqual(
        expect.objectContaining({
          riskLevel: "safe",
          categories: [],
          attachmentCount: 1,
          userSuspended: false,
        })
      );
    } finally {
      await harness.cleanup();
    }
  });
});
