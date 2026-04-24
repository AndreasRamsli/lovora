/* eslint-env jest */

const request = require("supertest");
const { createSecurityHarness } = require("../../test-support/securityHarness");

jest.setTimeout(30000);

function expectForbidden(response) {
  expect(response.status).toBe(403);
  expect(response.body).toEqual({
    error: "API key cannot access this route.",
  });
}

describe("api embed authz", () => {
  let harness;

  beforeAll(async () => {
    harness = await createSecurityHarness();
  });

  afterAll(async () => {
    if (harness) await harness.cleanup();
  });

  test("workspace_service keys are rejected across the migrated embed family", async () => {
    const { app, fixtures } = harness;
    const authHeader = fixtures.auth.workspaceServiceApiKey;
    const embedUuid = fixtures.embed.embedConfig.uuid;
    const responses = await Promise.all([
      request(app).get("/api/v1/embed").set("Authorization", authHeader),
      request(app)
        .get(`/api/v1/embed/${embedUuid}/chats`)
        .set("Authorization", authHeader),
      request(app)
        .get(`/api/v1/embed/${embedUuid}/chats/embed-session-1`)
        .set("Authorization", authHeader),
      request(app)
        .post("/api/v1/embed/new")
        .set("Authorization", authHeader)
        .send({
          workspace_slug: fixtures.workspaces.workspaceLegalAlpha.slug,
          chat_mode: "chat",
        }),
      request(app)
        .post(`/api/v1/embed/${embedUuid}`)
        .set("Authorization", authHeader)
        .send({ enabled: false }),
      request(app)
        .delete(`/api/v1/embed/${embedUuid}`)
        .set("Authorization", authHeader),
    ]);

    for (const response of responses) {
      expectForbidden(response);
    }
  });

  test("management keys can still reach representative embed read and write routes", async () => {
    const { app, fixtures } = harness;
    const createResponse = await request(app)
      .post("/api/v1/embed/new")
      .set("Authorization", fixtures.auth.managementApiKey)
      .send({
        workspace_slug: fixtures.workspaces.workspaceLegalAlpha.slug,
        chat_mode: "chat",
      });

    expect(createResponse.status).toBe(200);
    expect(createResponse.body).toEqual({
      embed: expect.objectContaining({
        uuid: expect.any(String),
        enabled: true,
      }),
      error: null,
    });

    const createdEmbedUuid = createResponse.body.embed.uuid;

    try {
      const [listResponse, readResponse, sessionReadResponse, updateResponse] =
        await Promise.all([
          request(app)
            .get("/api/v1/embed")
            .set("Authorization", fixtures.auth.managementApiKey),
          request(app)
            .get(`/api/v1/embed/${fixtures.embed.embedConfig.uuid}/chats`)
            .set("Authorization", fixtures.auth.managementApiKey),
          request(app)
            .get(
              `/api/v1/embed/${fixtures.embed.embedConfig.uuid}/chats/embed-session-1`
            )
            .set("Authorization", fixtures.auth.managementApiKey),
          request(app)
            .post(`/api/v1/embed/${createdEmbedUuid}`)
            .set("Authorization", fixtures.auth.managementApiKey)
            .send({ enabled: false }),
        ]);

      expect(listResponse.status).toBe(200);
      expect(listResponse.body).toEqual({
        embeds: expect.arrayContaining([
          expect.objectContaining({
            uuid: fixtures.embed.embedConfig.uuid,
          }),
          expect.objectContaining({
            uuid: createdEmbedUuid,
          }),
        ]),
      });

      expect(readResponse.status).toBe(200);
      expect(Array.isArray(readResponse.body.chats)).toBe(true);
      expect(readResponse.body.chats[0]).toEqual(
        expect.objectContaining({
          sessionId: expect.any(String),
        })
      );

      expect(sessionReadResponse.status).toBe(200);
      expect(sessionReadResponse.body).toEqual({
        chats: expect.arrayContaining([
          expect.objectContaining({
            sessionId: "embed-session-1",
          }),
        ]),
      });

      expect(updateResponse.status).toBe(200);
      expect(updateResponse.body).toEqual({ success: true, error: null });

      const deleteResponse = await request(app)
        .delete(`/api/v1/embed/${createdEmbedUuid}`)
        .set("Authorization", fixtures.auth.managementApiKey);

      expect(deleteResponse.status).toBe(200);
      expect(deleteResponse.body).toEqual({ success: true, error: null });

      const deletedEmbedReadResponse = await request(app)
        .post(`/api/v1/embed/${createdEmbedUuid}`)
        .set("Authorization", fixtures.auth.managementApiKey)
        .send({ enabled: true });

      expect(deletedEmbedReadResponse.status).toBe(404);
      expect(deletedEmbedReadResponse.body).toEqual({
        error: "Embed not found",
      });
    } finally {
      await request(app)
        .delete(`/api/v1/embed/${createdEmbedUuid}`)
        .set("Authorization", fixtures.auth.managementApiKey);
    }
  });

  test("reduced-scope management keys enforce read vs write intent on embed routes", async () => {
    const { app, fixtures, prisma } = harness;
    const createPayload = {
      workspace_slug: fixtures.workspaces.workspaceLegalAlpha.slug,
      chat_mode: "chat",
    };

    try {
      await prisma.api_keys.update({
        where: { id: fixtures.managementApiKey.id },
        data: {
          scopes: JSON.stringify(["management:metadata:read"]),
        },
      });

      const [readAllowed, writeDenied] = await Promise.all([
        request(app)
          .get(`/api/v1/embed/${fixtures.embed.embedConfig.uuid}/chats`)
          .set("Authorization", fixtures.auth.managementApiKey),
        request(app)
          .post("/api/v1/embed/new")
          .set("Authorization", fixtures.auth.managementApiKey)
          .send(createPayload),
      ]);

      expect(readAllowed.status).toBe(200);
      expectForbidden(writeDenied);

      await prisma.api_keys.update({
        where: { id: fixtures.managementApiKey.id },
        data: {
          scopes: JSON.stringify(["management:metadata:write"]),
        },
      });

      const [readDenied, writeAllowed] = await Promise.all([
        request(app)
          .get(`/api/v1/embed/${fixtures.embed.embedConfig.uuid}/chats`)
          .set("Authorization", fixtures.auth.managementApiKey),
        request(app)
          .post("/api/v1/embed/new")
          .set("Authorization", fixtures.auth.managementApiKey)
          .send(createPayload),
      ]);

      expectForbidden(readDenied);
      expect(writeAllowed.status).toBe(200);
      expect(writeAllowed.body).toEqual({
        embed: expect.objectContaining({
          uuid: expect.any(String),
          enabled: true,
        }),
        error: null,
      });

      await request(app)
        .delete(`/api/v1/embed/${writeAllowed.body.embed.uuid}`)
        .set("Authorization", fixtures.auth.managementApiKey);
    } finally {
      await prisma.api_keys.update({
        where: { id: fixtures.managementApiKey.id },
        data: { scopes: null },
      });
    }
  });
});
