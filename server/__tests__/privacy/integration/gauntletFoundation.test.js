/* eslint-env jest */
const request = require("supertest");
const {
  createSecurityHarness,
} = require("../../../test-support/securityHarness");
const {
  assertNoForbiddenCanaries,
  assertResponseContainsAllowedCanaries,
} = require("../../../test-support/privacy/scanner");
const {
  assertMetadataTablesDoNotContainCanaries,
} = require("../../../test-support/privacy/dbScanner");

jest.setTimeout(30000);

describe("privacy gauntlet fixture foundation", () => {
  test("multiple harnesses isolate prisma clients and backing databases", async () => {
    const firstHarness = await createSecurityHarness();
    const secondHarness = await createSecurityHarness();

    try {
      expect(firstHarness.dbPath).not.toBe(secondHarness.dbPath);

      await firstHarness.prisma.event_logs.create({
        data: {
          event: "fixture_isolation_probe",
          metadata: JSON.stringify({ probe: "first" }),
          occurredAt: new Date(),
        },
      });

      const secondHarnessCount = await secondHarness.prisma.event_logs.count({
        where: { event: "fixture_isolation_probe" },
      });

      expect(secondHarnessCount).toBe(0);
    } finally {
      await firstHarness.cleanup();
      await secondHarness.cleanup();
    }
  });

  test("fixture foundation supports content, metadata, and persistence privacy scans", async () => {
    const harness = await createSecurityHarness({ captureLogs: true });

    try {
      const { app, prisma, fixtures, actors } = harness;

      expect(fixtures.users).toEqual(
        expect.objectContaining({
          alice: expect.objectContaining({ username: "alice-user" }),
          bob: expect.objectContaining({ username: "bob-user" }),
          charlie: expect.objectContaining({ username: "charlie-user" }),
          admin: expect.objectContaining({ username: "admin-user" }),
          manager: expect.objectContaining({ username: "manager-user" }),
          suspended: expect.objectContaining({ username: "suspended-user" }),
          deleted: expect.objectContaining({ deleted: true }),
        })
      );
      expect(fixtures.workspaces).toEqual(
        expect.objectContaining({
          workspaceLegalAlpha: expect.objectContaining({
            slug: "workspace-legal-alpha",
          }),
          workspaceLegalBeta: expect.objectContaining({
            slug: "workspace-legal-beta",
          }),
        })
      );
      expect(fixtures.delegatedTokens).toEqual(
        expect.objectContaining({
          alice: expect.stringMatching(/^Bearer /),
          bob: expect.stringMatching(/^Bearer /),
          charlie: expect.stringMatching(/^Bearer /),
        })
      );
      expect(fixtures.legacyResidue).toEqual(
        expect.objectContaining({
          status: "stub",
          metadataResidueTables: ["conversation_flags", "event_logs"],
        })
      );
      expect(actors.charlieUser).toBeDefined();
      expect(actors.managerUser).toBeDefined();
      expect(actors.suspendedUser).toBeDefined();
      expect(actors.deletedUser).toBeDefined();
      expect(actors.delegatedAliceUser).toBeDefined();
      expect(actors.delegatedCharlieUser).toBeDefined();

      const workspaceChatsResponse = await request(app)
        .get(`/api/workspace/${fixtures.workspaces.workspaceLegalAlpha.slug}/chats`)
        .set(actors.aliceUser.headers);

      expect(workspaceChatsResponse.status).toBe(200);
      assertResponseContainsAllowedCanaries({
        actor: actors.aliceUser,
        response: workspaceChatsResponse,
        expectedCanaries: [
          fixtures.canaries.alicePrompt,
          fixtures.canaries.aliceResponse,
        ],
      });
      expect(JSON.stringify(workspaceChatsResponse.body)).not.toContain(
        fixtures.canaries.charliePrompt
      );

      const threadChatsResponse = await request(app)
        .get(
          `/api/workspace/${fixtures.workspaces.workspaceLegalAlpha.slug}/thread/${fixtures.threads.aliceOwnedThread.slug}/chats`
        )
        .set(actors.aliceUser.headers);

      expect(threadChatsResponse.status).toBe(200);
      expect(fixtures.threads.aliceOwnedThread.name).toBe(
        fixtures.canaries.threadTitle
      );
      assertResponseContainsAllowedCanaries({
        actor: actors.aliceUser,
        response: threadChatsResponse,
        expectedCanaries: [
          fixtures.canaries.aliceThreadPrompt,
          fixtures.canaries.aliceThreadResponse,
        ],
      });

      const charlieWorkspaceChatsResponse = await request(app)
        .get(`/api/workspace/${fixtures.workspaces.workspaceLegalAlpha.slug}/chats`)
        .set(actors.charlieUser.headers);
      expect(charlieWorkspaceChatsResponse.status).toBe(200);
      assertResponseContainsAllowedCanaries({
        actor: actors.charlieUser,
        response: charlieWorkspaceChatsResponse,
        expectedCanaries: [
          fixtures.canaries.charliePrompt,
          fixtures.canaries.charlieResponse,
        ],
      });
      expect(JSON.stringify(charlieWorkspaceChatsResponse.body)).not.toContain(
        fixtures.canaries.alicePrompt
      );

      const delegatedAliceResponse = await request(app)
        .get(`/api/workspace/${fixtures.workspaces.workspaceLegalAlpha.slug}/chats`)
        .set(actors.delegatedAliceUser.headers);
      expect(delegatedAliceResponse.status).toBe(200);
      assertResponseContainsAllowedCanaries({
        actor: actors.delegatedAliceUser,
        response: delegatedAliceResponse,
        expectedCanaries: [
          fixtures.canaries.alicePrompt,
          fixtures.canaries.aliceResponse,
        ],
      });

      const conversationFlagsResponse = await request(app)
        .post("/api/system/conversation-flags")
        .set(actors.adminUser.headers)
        .send({ offset: 0, limit: 20, status: "open" });

      expect(conversationFlagsResponse.status).toBe(200);
      assertNoForbiddenCanaries({
        actor: actors.adminUser,
        response: conversationFlagsResponse,
        canaries: fixtures.canaries,
      });

      const managerFlagsResponse = await request(app)
        .post("/api/system/conversation-flags")
        .set(actors.managerUser.headers)
        .send({ offset: 0, limit: 20, status: "open" });
      expect(managerFlagsResponse.status).toBe(200);
      assertNoForbiddenCanaries({
        actor: actors.managerUser,
        response: managerFlagsResponse,
        canaries: fixtures.canaries,
      });

      const suspendedResponse = await request(app)
        .get(`/api/workspace/${fixtures.workspaces.workspaceLegalAlpha.slug}/chats`)
        .set(actors.suspendedUser.headers);
      expect(suspendedResponse.status).toBe(401);
      assertNoForbiddenCanaries({
        actor: actors.suspendedUser,
        response: suspendedResponse,
        canaries: fixtures.canaries,
      });

      const deletedResponse = await request(app)
        .get(`/api/workspace/${fixtures.workspaces.workspaceLegalAlpha.slug}/chats`)
        .set(actors.deletedUser.headers);
      expect(deletedResponse.status).toBe(401);
      assertNoForbiddenCanaries({
        actor: actors.deletedUser,
        response: deletedResponse,
        canaries: fixtures.canaries,
      });

      expect(harness.logCollector).toBeDefined();
      expect(
        harness.logCollector.entries.some((entry) =>
          entry.message.includes("fixture-foundation-log")
        )
      ).toBe(false);
      console.warn("fixture-foundation-log");
      expect(
        harness.logCollector.entries.some((entry) =>
          entry.message.includes("fixture-foundation-log")
        )
      ).toBe(true);

      await assertMetadataTablesDoNotContainCanaries({
        prisma,
        canaries: fixtures.canaries,
        tables: ["conversation_flags", "event_logs"],
      });
    } finally {
      await harness.cleanup();
    }
  });
});
