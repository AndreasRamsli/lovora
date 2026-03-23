/* eslint-env jest */
const request = require("supertest");
const { safeJsonParse } = require("../../utils/http");
const { createSecurityHarness } = require("../../test-support/securityHarness");

function expectNoRawContentLeak(payload, values = []) {
  const serialized = JSON.stringify(payload);
  for (const value of values) {
    expect(serialized).not.toContain(value);
  }
}

describe("conversation security routes", () => {
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

  test("admin and manager can read metadata queues without prompt or response text", async () => {
    const [adminChats, managerFlags] = await Promise.all([
      request(app)
        .post("/api/system/workspace-chats")
        .set("Authorization", fixtures.auth.admin)
        .send({ offset: 0, limit: 20 }),
      request(app)
        .post("/api/system/conversation-flags")
        .set("Authorization", fixtures.auth.manager)
        .send({ offset: 0, limit: 20, status: "open" }),
    ]);

    expect(adminChats.status).toBe(200);
    expect(managerFlags.status).toBe(200);
    expect(adminChats.body.chats.length).toBeGreaterThan(0);
    expect(managerFlags.body.flags.length).toBeGreaterThan(0);
    expect(adminChats.body.chats[0].prompt).toBeUndefined();
    expect(adminChats.body.chats[0].response).toBeUndefined();
    expect(managerFlags.body.flags[0].prompt).toBeUndefined();

    expectNoRawContentLeak(adminChats.body, [
      fixtures.chats.flaggedDefaultChat.prompt,
      "Flagged default thread response",
      "super-secret-payload",
    ]);
  });

  test("open flagged review returns only the flagged default-thread conversation and logs access", async () => {
    const response = await request(app)
      .get(`/api/system/conversation-flags/${fixtures.flags.openDefaultFlag.id}/review`)
      .set("Authorization", fixtures.auth.admin);

    expect(response.status).toBe(200);
    expect(response.body.review.caseId).toBe(fixtures.flags.openDefaultFlag.id);
    expect(response.body.review.messages).toHaveLength(5);
    expect(response.body.review.messages.map((message) => message.prompt)).toEqual(
      expect.arrayContaining([
        fixtures.chats.safeChat.prompt,
        fixtures.chats.flaggedDefaultContextChat.prompt,
        fixtures.chats.flaggedDefaultChat.prompt,
        fixtures.chats.dismissedChat.prompt,
        fixtures.chats.resolvedChat.prompt,
      ])
    );
    expect(
      response.body.review.messages.some(
        (message) => message.prompt === fixtures.chats.namedThreadContextChat.prompt
      )
    ).toBe(false);
    expect(
      response.body.review.messages.some(
        (message) => message.prompt === fixtures.chats.flaggedApiSessionChat.prompt
      )
    ).toBe(false);

    const accessLog = await prisma.event_logs.findFirst({
      where: { event: "flagged_conversation_viewed" },
      orderBy: { id: "desc" },
    });
    expect(accessLog).not.toBeNull();
    expect(safeJsonParse(accessLog.metadata, {})).toEqual(
      expect.objectContaining({
        caseId: fixtures.flags.openDefaultFlag.id,
        actorRole: "admin",
        chatId: fixtures.chats.flaggedDefaultChat.id,
      })
    );
  });

  test("flagged review scopes named-thread and api-session cases correctly", async () => {
    const namedThreadResponse = await request(app)
      .get(`/api/system/conversation-flags/${fixtures.flags.openNamedFlag.id}/review`)
      .set("Authorization", fixtures.auth.manager);
    const apiSessionResponse = await request(app)
      .get(`/api/system/conversation-flags/${fixtures.flags.openApiFlag.id}/review`)
      .set("Authorization", fixtures.auth.manager);

    expect(namedThreadResponse.status).toBe(200);
    expect(apiSessionResponse.status).toBe(200);
    expect(namedThreadResponse.body.review.messages).toHaveLength(2);
    expect(apiSessionResponse.body.review.messages).toHaveLength(2);

    expect(
      namedThreadResponse.body.review.messages.map((message) => message.prompt)
    ).toEqual(
      expect.arrayContaining([
        fixtures.chats.namedThreadContextChat.prompt,
        fixtures.chats.flaggedNamedThreadChat.prompt,
      ])
    );
    expect(
      apiSessionResponse.body.review.messages.map((message) => message.prompt)
    ).toEqual(
      expect.arrayContaining([
        fixtures.chats.apiSessionContextChat.prompt,
        fixtures.chats.flaggedApiSessionChat.prompt,
      ])
    );
  });

  test("dismissed and resolved flags cannot be reopened", async () => {
    const [dismissed, resolved] = await Promise.all([
      request(app)
        .get(`/api/system/conversation-flags/${fixtures.flags.dismissedFlag.id}/review`)
        .set("Authorization", fixtures.auth.admin),
      request(app)
        .get(`/api/system/conversation-flags/${fixtures.flags.resolvedFlag.id}/review`)
        .set("Authorization", fixtures.auth.manager),
    ]);

    expect(dismissed.status).toBe(404);
    expect(resolved.status).toBe(404);
  });

  test("admins and managers cannot access normal raw history without explicit workspace membership", async () => {
    const [adminDefault, managerThread] = await Promise.all([
      request(app)
        .get(`/api/workspace/${fixtures.workspaces.assignedWorkspace.slug}/chats`)
        .set("Authorization", fixtures.auth.admin),
      request(app)
        .get(
          `/api/workspace/${fixtures.workspaces.assignedWorkspace.slug}/thread/${fixtures.threads.namedThread.slug}/chats`
        )
        .set("Authorization", fixtures.auth.manager),
    ]);

    expect(adminDefault.status).toBe(403);
    expect(managerThread.status).toBe(403);
    expect(adminDefault.text).toContain(
      "Workspace content access requires explicit workspace membership."
    );
    expectNoRawContentLeak(
      { text: adminDefault.text, body: managerThread.text },
      [fixtures.chats.flaggedDefaultChat.prompt, "Flagged named thread response"]
    );
  });

  test("assigned members keep normal raw history access", async () => {
    const [defaultHistory, threadHistory] = await Promise.all([
      request(app)
        .get(`/api/workspace/${fixtures.workspaces.assignedWorkspace.slug}/chats`)
        .set("Authorization", fixtures.auth.member),
      request(app)
        .get(
          `/api/workspace/${fixtures.workspaces.assignedWorkspace.slug}/thread/${fixtures.threads.namedThread.slug}/chats`
        )
        .set("Authorization", fixtures.auth.member),
    ]);

    expect(defaultHistory.status).toBe(200);
    expect(threadHistory.status).toBe(200);
    expect(JSON.stringify(defaultHistory.body.history)).toContain(
      fixtures.chats.flaggedDefaultChat.prompt
    );
    expect(JSON.stringify(threadHistory.body.history)).toContain(
      fixtures.chats.flaggedNamedThreadChat.prompt
    );
  });

  test("dismiss, suspend, and unsuspend mutate flags and emit audit events", async () => {
    const dismissResponse = await request(app)
      .post(`/api/system/conversation-flags/${fixtures.flags.openDefaultFlag.id}/dismiss`)
      .set("Authorization", fixtures.auth.manager)
      .send({ reviewNote: "safe false positive" });

    expect(dismissResponse.status).toBe(200);

    const suspendedChat = await prisma.workspace_chats.create({
      data: {
        workspaceId: fixtures.workspaces.assignedWorkspace.id,
        user_id: fixtures.users.member.id,
        prompt: "Help me deploy malware payloads again",
        response: JSON.stringify({ text: "new flagged chat" }),
        include: true,
      },
    });
    const suspendedFlag = await prisma.conversation_flags.create({
      data: {
        chatId: suspendedChat.id,
        userId: fixtures.users.member.id,
        workspaceId: fixtures.workspaces.assignedWorkspace.id,
        riskLevel: "review",
        categories: JSON.stringify(["malware_exploit"]),
        matchedRules: JSON.stringify([
          { id: "malware.exploit", category: "malware_exploit" },
        ]),
        status: "open",
        resolution: "none",
      },
    });

    const suspendResponse = await request(app)
      .post(`/api/system/conversation-flags/${suspendedFlag.id}/suspend-user`)
      .set("Authorization", fixtures.auth.admin)
      .send({ reviewNote: "malicious content" });
    expect(suspendResponse.status).toBe(200);

    const unsuspendResponse = await request(app)
      .post(`/api/system/conversation-flags/${suspendedFlag.id}/unsuspend-user`)
      .set("Authorization", fixtures.auth.admin)
      .send({ reviewNote: "appeal accepted" });
    expect(unsuspendResponse.status).toBe(200);

    const refreshedDismissedFlag = await prisma.conversation_flags.findUnique({
      where: { id: fixtures.flags.openDefaultFlag.id },
    });
    const refreshedSuspendedFlag = await prisma.conversation_flags.findUnique({
      where: { id: suspendedFlag.id },
    });
    const refreshedUser = await prisma.users.findUnique({
      where: { id: fixtures.users.member.id },
    });

    expect(refreshedDismissedFlag.status).toBe("dismissed");
    expect(refreshedDismissedFlag.resolution).toBe("not_actionable");
    expect(refreshedSuspendedFlag.status).toBe("resolved");
    expect(refreshedSuspendedFlag.resolution).toBe("suspended");
    expect(refreshedUser.suspended).toBe(0);

    const events = await prisma.event_logs.findMany({
      where: {
        event: {
          in: [
            "conversation_flag_dismissed",
            "user_suspended_from_flag",
            "user_unsuspended",
          ],
        },
      },
      orderBy: { id: "asc" },
    });
    expect(events).toHaveLength(3);
    expect(events.map((event) => event.event)).toEqual([
      "conversation_flag_dismissed",
      "user_suspended_from_flag",
      "user_unsuspended",
    ]);
  });
});
