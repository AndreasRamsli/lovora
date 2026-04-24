/* eslint-env jest */

const fs = require("fs");
const path = require("path");
const request = require("supertest");
const { createSecurityHarness } = require("../../test-support/securityHarness");

jest.setTimeout(30000);

function expectForbidden(response) {
  expect(response.status).toBe(403);
  expect(response.body).toEqual({
    error: "API key cannot access this route.",
  });
}

describe("api document authz", () => {
  let harness;

  beforeAll(async () => {
    harness = await createSecurityHarness();
  });

  afterAll(async () => {
    if (harness) await harness.cleanup();
  });

  test("workspace_service keys are rejected across the migrated document family", async () => {
    const { app, fixtures } = harness;
    const authHeader = fixtures.auth.workspaceServiceApiKey;
    const responses = await Promise.all([
      request(app).post("/api/v1/document/upload").set("Authorization", authHeader),
      request(app)
        .post("/api/v1/document/upload/folder-authz-test")
        .set("Authorization", authHeader),
      request(app)
        .post("/api/v1/document/upload-link")
        .set("Authorization", authHeader)
        .send({ link: "https://example.com" }),
      request(app)
        .post("/api/v1/document/raw-text")
        .set("Authorization", authHeader)
        .send({
          textContent: "authz check",
          metadata: { title: "authz check" },
        }),
      request(app).get("/api/v1/documents").set("Authorization", authHeader),
      request(app)
        .get("/api/v1/documents/folder/custom-documents")
        .set("Authorization", authHeader),
      request(app)
        .get("/api/v1/document/accepted-file-types")
        .set("Authorization", authHeader),
      request(app)
        .get("/api/v1/document/metadata-schema")
        .set("Authorization", authHeader),
      request(app)
        .get("/api/v1/document/unknown-doc.json")
        .set("Authorization", authHeader),
      request(app)
        .post("/api/v1/document/create-folder")
        .set("Authorization", authHeader)
        .send({ name: "workspace-service-denied-folder" }),
      request(app)
        .delete("/api/v1/document/remove-folder")
        .set("Authorization", authHeader)
        .send({ name: "workspace-service-denied-folder" }),
      request(app)
        .post("/api/v1/document/move-files")
        .set("Authorization", authHeader)
        .send({
          files: [{ from: "custom-documents/a.json", to: "custom-documents/b.json" }],
        }),
    ]);

    for (const response of responses) {
      expectForbidden(response);
    }
  });

  test("management keys can still reach representative document read and write routes", async () => {
    const { app, fixtures } = harness;
    const folderName = `doc-authz-${Date.now()}-write`;
    const folderPath = path.join(process.env.STORAGE_DIR, "documents", folderName);

    try {
      const [readResponse, writeResponse] = await Promise.all([
        request(app)
          .get("/api/v1/document/metadata-schema")
          .set("Authorization", fixtures.auth.managementApiKey),
        request(app)
          .post("/api/v1/document/create-folder")
          .set("Authorization", fixtures.auth.managementApiKey)
          .send({ name: folderName }),
      ]);

      expect(readResponse.status).toBe(200);
      expect(readResponse.body).toEqual({
        schema: {
          url: "string | nullable",
          title: "string",
          docAuthor: "string | nullable",
          description: "string | nullable",
          docSource: "string | nullable",
          chunkSource: "string | nullable",
          published: "epoch timestamp in ms | nullable",
        },
      });

      expect(writeResponse.status).toBe(200);
      expect(writeResponse.body).toEqual({ success: true, message: null });
      expect(fs.existsSync(folderPath)).toBe(true);
    } finally {
      fs.rmSync(folderPath, { recursive: true, force: true });
    }
  });

  test("management document ingest responses strip raw page content from metadata-only payloads", async () => {
    const { app, fixtures } = harness;
    const { CollectorApi } = require("../../utils/collectorApi");
    const canary = "LOVORA_CANARY_DOCUMENT_PAGE_CONTENT";
    const onlineSpy = jest
      .spyOn(CollectorApi.prototype, "online")
      .mockResolvedValue(true);
    const processRawTextSpy = jest
      .spyOn(CollectorApi.prototype, "processRawText")
      .mockResolvedValue({
        success: true,
        reason: null,
        documents: [
          {
            id: "raw-doc-1",
            url: "file://management-canary.txt",
            title: "management-canary.txt",
            docAuthor: "integration-test",
            description: "metadata-only regression coverage",
            docSource: "integration-test",
            chunkSource: "management-canary.txt",
            published: "2026-04-23T10:00:00.000Z",
            wordCount: 4,
            pageContent: canary,
            token_count_estimate: 4,
            location: "custom-documents/raw-management-canary.json",
          },
        ],
      });

    try {
      const response = await request(app)
        .post("/api/v1/document/raw-text")
        .set("Authorization", fixtures.auth.managementApiKey)
        .send({
          textContent: "management canary text",
          metadata: {
            title: "Management Canary",
          },
        });

      expect(response.status).toBe(200);
      expect(response.body.documents).toHaveLength(1);
      expect(response.body.documents[0]).not.toHaveProperty("pageContent");
      expect(JSON.stringify(response.body)).not.toContain(canary);
    } finally {
      processRawTextSpy.mockRestore();
      onlineSpy.mockRestore();
    }
  });

  test("management keys reach GET /api/v1/document/accepted-file-types without doc route shadowing", async () => {
    const { app, fixtures } = harness;
    const { CollectorApi } = require("../../utils/collectorApi");
    const acceptedTypes = {
      "application/x-task3-test": [".task3"],
      "text/plain": [".txt"],
    };
    const acceptedFileTypesSpy = jest
      .spyOn(CollectorApi.prototype, "acceptedFileTypes")
      .mockResolvedValue(acceptedTypes);

    try {
      const response = await request(app)
        .get("/api/v1/document/accepted-file-types")
        .set("Authorization", fixtures.auth.managementApiKey);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ types: acceptedTypes });
      expect(acceptedFileTypesSpy).toHaveBeenCalledTimes(1);
    } finally {
      acceptedFileTypesSpy.mockRestore();
    }
  });

  test("management keys can fetch GET /api/v1/document/:docName for a stored JSON document", async () => {
    const { app, fixtures } = harness;
    const folderName = `task3-doc-${Date.now()}`;
    const docName = `stored-doc-${Date.now()}.json`;
    const documentDir = path.join(process.env.STORAGE_DIR, "documents", folderName);
    const documentPath = path.join(documentDir, docName);
    const documentPayload = {
      id: "task3-doc-id",
      url: "file://task3-source.txt",
      title: "Task 3 Stored Document",
      docAuthor: "Task 3",
      description: "Route-order positive path coverage",
      docSource: "integration-test",
      chunkSource: "task3-source.txt",
      published: 1710000000000,
      wordCount: 12,
      token_count_estimate: 16,
      cached: false,
    };

    fs.mkdirSync(documentDir, { recursive: true });
    fs.writeFileSync(documentPath, JSON.stringify(documentPayload), "utf8");

    try {
      const response = await request(app)
        .get(`/api/v1/document/${docName}`)
        .set("Authorization", fixtures.auth.managementApiKey);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        document: expect.objectContaining(documentPayload),
      });
    } finally {
      fs.rmSync(documentDir, { recursive: true, force: true });
    }
  });

  test("reduced-scope management keys enforce read vs write intent on document routes", async () => {
    const { app, fixtures, prisma } = harness;
    const folderName = `doc-authz-${Date.now()}-scoped`;
    const folderPath = path.join(process.env.STORAGE_DIR, "documents", folderName);

    try {
      await prisma.api_keys.update({
        where: { id: fixtures.managementApiKey.id },
        data: {
          scopes: JSON.stringify(["management:metadata:read"]),
        },
      });

      const [readAllowed, writeDenied] = await Promise.all([
        request(app)
          .get("/api/v1/document/metadata-schema")
          .set("Authorization", fixtures.auth.managementApiKey),
        request(app)
          .post("/api/v1/document/create-folder")
          .set("Authorization", fixtures.auth.managementApiKey)
          .send({ name: folderName }),
      ]);

      expect(readAllowed.status).toBe(200);
      expectForbidden(writeDenied);
      expect(fs.existsSync(folderPath)).toBe(false);

      await prisma.api_keys.update({
        where: { id: fixtures.managementApiKey.id },
        data: {
          scopes: JSON.stringify(["management:metadata:write"]),
        },
      });

      const [readDenied, writeAllowed] = await Promise.all([
        request(app)
          .get("/api/v1/document/metadata-schema")
          .set("Authorization", fixtures.auth.managementApiKey),
        request(app)
          .post("/api/v1/document/create-folder")
          .set("Authorization", fixtures.auth.managementApiKey)
          .send({ name: folderName }),
      ]);

      expectForbidden(readDenied);
      expect(writeAllowed.status).toBe(200);
      expect(writeAllowed.body).toEqual({ success: true, message: null });
      expect(fs.existsSync(folderPath)).toBe(true);
    } finally {
      fs.rmSync(folderPath, { recursive: true, force: true });
      await prisma.api_keys.update({
        where: { id: fixtures.managementApiKey.id },
        data: { scopes: null },
      });
    }
  });
});
