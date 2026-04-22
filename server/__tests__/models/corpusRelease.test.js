/* eslint-env jest */
const mockPrisma = {
  corpus_releases: {
    create: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    count: jest.fn(),
  },
};

jest.mock("../../utils/prisma", () => mockPrisma);

const { CorpusRelease } = require("../../models/corpusRelease");

describe("CorpusRelease", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("create normalizes counts and serializes evaluation summary", async () => {
    mockPrisma.corpus_releases.create.mockResolvedValue({
      id: 4,
      releaseId: "legal-no-2026-04-22",
      version: "2026-04-22",
      workspaceSlug: "lovora-alpha",
      sourceDatasetVersion: "lovdata-export-2026-04-22",
      manifestVersion: "lovora.legal-corpus.record/v1",
      manifestPath: "/tmp/legal/_manifest.jsonl",
      manifestChecksum: "a".repeat(64),
      manifestRecordCount: 120,
      documentCount: 35,
      sectionCount: 120,
      embeddingModel: "text-embedding-3-large",
      chunkSize: 1400,
      chunkOverlap: 120,
      status: "active",
      evaluationSummary: JSON.stringify({ precisionAt5: 0.92 }),
      uploadedAt: new Date("2026-04-22T11:50:00Z"),
      activatedAt: new Date("2026-04-22T12:00:00Z"),
      createdAt: new Date("2026-04-22T11:30:00Z"),
      lastUpdatedAt: new Date("2026-04-22T12:00:00Z"),
    });

    const release = await CorpusRelease.create({
      releaseId: "legal-no-2026-04-22",
      version: "2026-04-22",
      workspaceSlug: "lovora-alpha",
      sourceDatasetVersion: "lovdata-export-2026-04-22",
      manifestVersion: "lovora.legal-corpus.record/v1",
      manifestPath: "/tmp/legal/_manifest.jsonl",
      manifestChecksum: "a".repeat(64),
      manifestRecordCount: "120",
      documentCount: "35",
      sectionCount: "120",
      embeddingModel: "text-embedding-3-large",
      chunkSize: "1400",
      chunkOverlap: "120",
      status: "active",
      evaluationSummary: { precisionAt5: 0.92 },
      uploadedAt: "2026-04-22T11:50:00Z",
      activatedAt: "2026-04-22T12:00:00Z",
    });

    expect(mockPrisma.corpus_releases.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        manifestRecordCount: 120,
        documentCount: 35,
        sectionCount: 120,
        chunkSize: 1400,
        chunkOverlap: 120,
        evaluationSummary: JSON.stringify({ precisionAt5: 0.92 }),
      }),
    });
    expect(release).toEqual(
      expect.objectContaining({
        releaseId: "legal-no-2026-04-22",
        evaluationSummary: { precisionAt5: 0.92 },
      })
    );
  });

  test("getCurrent scopes to active workspace release and parses summary", async () => {
    mockPrisma.corpus_releases.findFirst.mockResolvedValue({
      id: 7,
      releaseId: "legal-no-2026-04-22",
      workspaceSlug: "lovora-alpha",
      status: "active",
      evaluationSummary: JSON.stringify({ recallAt10: 0.88 }),
    });

    const release = await CorpusRelease.getCurrent("lovora-alpha");

    expect(mockPrisma.corpus_releases.findFirst).toHaveBeenCalledWith({
      where: {
        workspaceSlug: "lovora-alpha",
        status: "active",
      },
      orderBy: [{ activatedAt: "desc" }, { lastUpdatedAt: "desc" }],
    });
    expect(release).toEqual(
      expect.objectContaining({
        releaseId: "legal-no-2026-04-22",
        evaluationSummary: { recallAt10: 0.88 },
      })
    );
  });

  test("getCurrent preserves plain-text evaluation summaries", async () => {
    mockPrisma.corpus_releases.findFirst.mockResolvedValue({
      id: 9,
      releaseId: "legal-no-2026-04-24",
      workspaceSlug: "lovora-alpha",
      status: "active",
      evaluationSummary: "manual spot check only",
    });

    const release = await CorpusRelease.getCurrent("lovora-alpha");

    expect(release).toEqual(
      expect.objectContaining({
        evaluationSummary: "manual spot check only",
      })
    );
  });

  test("list scopes by workspace and returns parsed summaries newest first", async () => {
    mockPrisma.corpus_releases.findMany.mockResolvedValue([
      {
        id: 8,
        releaseId: "legal-no-2026-04-23",
        workspaceSlug: "lovora-alpha",
        status: "uploaded",
        evaluationSummary: JSON.stringify({ recallAt10: 0.91 }),
      },
      {
        id: 7,
        releaseId: "legal-no-2026-04-22",
        workspaceSlug: "lovora-alpha",
        status: "active",
        evaluationSummary: null,
      },
    ]);

    const releases = await CorpusRelease.list(
      { workspaceSlug: "lovora-alpha" },
      10
    );

    expect(mockPrisma.corpus_releases.findMany).toHaveBeenCalledWith({
      where: { workspaceSlug: "lovora-alpha" },
      take: 10,
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    });
    expect(releases).toEqual([
      expect.objectContaining({
        releaseId: "legal-no-2026-04-23",
        evaluationSummary: { recallAt10: 0.91 },
      }),
      expect.objectContaining({
        releaseId: "legal-no-2026-04-22",
        evaluationSummary: null,
      }),
    ]);
  });

  test("update normalizes numeric fields and can clear evaluation summary", async () => {
    mockPrisma.corpus_releases.update.mockResolvedValue({
      id: 7,
      releaseId: "legal-no-2026-04-22",
      status: "archived",
      documentCount: 42,
      chunkOverlap: 0,
      evaluationSummary: null,
    });

    const release = await CorpusRelease.update(7, {
      status: "archived",
      documentCount: "42",
      chunkOverlap: "0",
      evaluationSummary: null,
    });

    expect(mockPrisma.corpus_releases.update).toHaveBeenCalledWith({
      where: { id: 7 },
      data: {
        status: "archived",
        documentCount: 42,
        chunkOverlap: 0,
        evaluationSummary: null,
      },
    });
    expect(release).toEqual(
      expect.objectContaining({
        status: "archived",
        documentCount: 42,
        evaluationSummary: null,
      })
    );
  });

  test("update marks active releases with an activation timestamp when missing", async () => {
    const frozenNow = new Date("2026-04-22T13:00:00.000Z");
    jest.useFakeTimers().setSystemTime(frozenNow);
    mockPrisma.corpus_releases.update.mockResolvedValue({
      id: 11,
      releaseId: "legal-no-2026-04-27",
      status: "active",
      activatedAt: frozenNow,
    });

    await CorpusRelease.update(11, {
      status: "active",
    });

    expect(mockPrisma.corpus_releases.update).toHaveBeenCalledWith({
      where: { id: 11 },
      data: {
        status: "active",
        activatedAt: frozenNow,
      },
    });
  });

  test("create marks active releases with an activation timestamp when missing", async () => {
    const frozenNow = new Date("2026-04-22T12:34:56.000Z");
    jest.useFakeTimers().setSystemTime(frozenNow);
    mockPrisma.corpus_releases.create.mockResolvedValue({
      id: 10,
      releaseId: "legal-no-2026-04-25",
      workspaceSlug: "lovora-alpha",
      status: "active",
      activatedAt: frozenNow,
    });

    await CorpusRelease.create({
      releaseId: "legal-no-2026-04-25",
      version: "2026-04-25",
      workspaceSlug: "lovora-alpha",
      sourceDatasetVersion: "lovdata-export-2026-04-25",
      manifestVersion: "lovora.legal-corpus.record/v1",
      manifestChecksum: "b".repeat(64),
      documentCount: 1,
      sectionCount: 1,
      embeddingModel: "text-embedding-3-large",
      chunkSize: 1400,
      chunkOverlap: 120,
      status: "active",
    });

    expect(mockPrisma.corpus_releases.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        status: "active",
        activatedAt: frozenNow,
      }),
    });
  });

  test("create propagates Prisma write failures", async () => {
    mockPrisma.corpus_releases.create.mockRejectedValue(
      new Error("db write failed")
    );

    await expect(
      CorpusRelease.create({
        releaseId: "legal-no-2026-04-26",
        version: "2026-04-26",
        workspaceSlug: "lovora-alpha",
        sourceDatasetVersion: "lovdata-export-2026-04-26",
        manifestVersion: "lovora.legal-corpus.record/v1",
        manifestChecksum: "c".repeat(64),
        documentCount: 1,
        sectionCount: 1,
        embeddingModel: "text-embedding-3-large",
        chunkSize: 1400,
        chunkOverlap: 120,
      })
    ).rejects.toThrow("db write failed");
  });

  test("list propagates Prisma read failures", async () => {
    mockPrisma.corpus_releases.findMany.mockRejectedValue(
      new Error("db read failed")
    );

    await expect(CorpusRelease.list({ workspaceSlug: "lovora-alpha" })).rejects.toThrow(
      "db read failed"
    );
  });
});
