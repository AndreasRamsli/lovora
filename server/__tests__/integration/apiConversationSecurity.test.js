/* eslint-env jest */
const request = require("supertest");
const { safeJsonParse } = require("../../utils/http");
const { createSecurityHarness } = require("../../test-support/securityHarness");

function expectMetadataOnly(payload, sensitiveValues = []) {
  const serialized = JSON.stringify(payload);
  expect(serialized).not.toContain('"prompt"');
  expect(serialized).not.toContain('"response"');
  expect(serialized).not.toContain('"contentString"');
  for (const value of sensitiveValues) {
    expect(serialized).not.toContain(value);
  }
}

describe("api conversation security contracts", () => {
  let harness;
  let app;
  let prisma;
  let fixtures;

  beforeAll(async () => {
    harness = await createSecurityHarness();
    app = harness.app;
    prisma = harness.prisma;
    fixtures = harness.fixtures;
  });

  afterAll(async () => {
    if (harness) await harness.cleanup();
  });

  test("API history endpoints stay metadata-only for workspace, thread, and embed chats", async () => {
    const [workspaceHistory, threadHistory, embedHistory, embedSessionHistory] =
      await Promise.all([
        request(app)
          .get(`/api/v1/workspace/${fixtures.workspaces.assignedWorkspace.slug}/chats`)
          .set("Authorization", fixtures.auth.apiKey),
        request(app)
          .get(
            `/api/v1/workspace/${fixtures.workspaces.assignedWorkspace.slug}/thread/${fixtures.threads.namedThread.slug}/chats`
          )
          .set("Authorization", fixtures.auth.apiKey),
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
      fixtures.chats.flaggedNamedThreadChat.prompt,
      "Flagged named thread response",
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
});
