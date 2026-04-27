const {
  buildConfigs,
  computeMetrics,
  deriveLovdataId,
  normalizeRemoteResult,
  rankOfFirstMatch,
  isRetryableStatus,
} = require("../../utils/legalRemoteEval");
const {
  parseArgs: parseRemoteEvalArgs,
  runEvaluation,
} = require("../../../scripts/remote-vector-eval.cjs");
const {
  rankOfFirstMatch: rankOfFirstLocalEvalMatch,
} = require("../../../scripts/evaluate-retrieval.cjs");

describe("legalRemoteEval", () => {
  test("buildConfigs creates stable config IDs", () => {
    expect(
      buildConfigs({
        modes: ["default"],
        topNs: [4],
        thresholds: [0.2],
      })
    ).toEqual([
      {
        id: "default-top4-thr0_2",
        rerank: false,
        topN: 4,
        similarityThreshold: 0.2,
      },
    ]);
  });

  test("deriveLovdataId normalizes canonical statute URLs", () => {
    expect(
      deriveLovdataId({
        url: "https://lovdata.no/dokument/NL/lov/1687-04-15-0#section-0001",
      })
    ).toBe("nl-16870415-000");
    expect(
      deriveLovdataId({
        url: "https://lovdata.no/dokument/NL/LOV-1687-04-15-0",
      })
    ).toBe("nl-16870415-000");
    expect(
      deriveLovdataId({
        url: "https://lovdata.no/dokument/SF/FOR-1905-11-15-2",
      })
    ).toBe("sf-19051115-0002");
    expect(
      deriveLovdataId({
        url: "https://lovdata.no/dokument/SF/forskrift/1905-12-30-1",
      })
    ).toBe("sf-19051230-0001");
  });

  test("rankOfFirstMatch finds expected Lovdata ID", () => {
    const rank = rankOfFirstMatch(
      [
        { metadata: { url: "https://lovdata.no/dokument/SF/forskrift/1905-12-30-1" } },
        { metadata: { url: "https://lovdata.no/dokument/NL/lov/1687-04-15-0" } },
      ],
      { lovdataId: "nl-16870415-000", corpus: "NL" }
    );
    expect(rank).toBe(2);
  });

  test("rankOfFirstMatch matches live SF Lovdata metadata URLs", () => {
    const rank = rankOfFirstMatch(
      [
        { metadata: { url: "https://lovdata.no/dokument/NL/LOV-1687-04-15-0" } },
        { metadata: { url: "https://lovdata.no/dokument/SF/FOR-1905-11-15-2" } },
      ],
      { lovdataId: "sf-19051115-0002", corpus: "SF" }
    );
    expect(rank).toBe(2);
  });

  test("rankOfFirstMatch matches canonical source ids and reason codes", () => {
    const rank = rankOfFirstMatch(
      [
        {
          text: "31. mai i det tredje året etter fastsettingsåret.",
          metadata: {
            canonicalSourceId: "wrong",
            retrievalReasons: ["vector_fallback"],
          },
        },
        {
          text: "31. mai i det tredje året etter fastsettingsåret.",
          metadata: {
            canonicalSourceId:
              "NO:NL:LOV-2005-06-17-67:section:10-51:ledd:4",
            canonicalSectionId: "NO:NL:LOV-2005-06-17-67:section:10-51",
            embeddingChunkId: "NO:EMBED:NL:nl-20050617-067:bundle:27",
            retrievalReasons:
              '["title_alias_match","exact_section_subsection_match"]',
          },
        },
      ],
      {
        canonicalSourceId: "NO:NL:LOV-2005-06-17-67:section:10-51:ledd:4",
        canonicalSectionId: "NO:NL:LOV-2005-06-17-67:section:10-51",
        embeddingChunkId: "NO:EMBED:NL:nl-20050617-067:bundle:27",
        retrievalReason: "exact_section_subsection_match",
        textIncludes: "31. mai",
      }
    );
    expect(rank).toBe(2);
  });

  test("rankOfFirstMatch matches direct ingest LTI metadata", () => {
    const rank = rankOfFirstMatch(
      [
        {
          metadata: {
            url: "https://lovdata.no/dokument/LTI/lov/2025-12-22-127",
            lovdataId: "nl-20251222-127",
            corpus: "NL",
          },
        },
      ],
      {
        lovdataId: "nl-20251222-127",
        corpus: "NL",
        urlIncludes: "/dokument/LTI/lov/2025-12-22-127",
      }
    );
    expect(rank).toBe(1);
  });

  test("rankOfFirstMatch derives corpus from LTI metadata and accepts chunkSource URLs", () => {
    const rank = rankOfFirstMatch(
      [
        {
          metadata: {
            chunkSource:
              "link://https://lovdata.no/dokument/LTI/forskrift/2025-10-29-2134#bundled-document-part-1",
            corpus: "LTI",
          },
        },
      ],
      {
        lovdataId: "sf-20251029-2134",
        corpus: "SF",
        urlIncludes: "/dokument/LTI/forskrift/2025-10-29-2134",
      }
    );
    expect(rank).toBe(1);
  });

  test("rankOfFirstMatch rejects matching documents when expected text is absent", () => {
    const rank = rankOfFirstMatch(
      [
        {
          text: "Lov om endringer i husleieloven uten den reparerte paragrafteksten.",
          metadata: {
            url: "https://lovdata.no/dokument/LTI/lov/2025-12-22-127",
            lovdataId: "nl-20251222-127",
            corpus: "NL",
          },
        },
      ],
      {
        lovdataId: "nl-20251222-127",
        corpus: "NL",
        textIncludes: "Husleietvistutvalget behandler tvister etter loven her",
      }
    );
    expect(rank).toBeNull();
  });

  test("local retrieval eval matches LTI statute text expectations", () => {
    const statuteRank = rankOfFirstLocalEvalMatch(
      [
        {
          text: "Husleietvistutvalget behandler tvister etter loven her.",
          url: "https://lovdata.no/dokument/LTI/lov/2025-12-22-127",
        },
      ],
      {
        lovdataId: "nl-20251222-127",
        corpus: "NL",
        textIncludes: "Husleietvistutvalget behandler tvister etter loven her",
      }
    );
    expect(statuteRank).toBe(1);

    const regulationRank = rankOfFirstLocalEvalMatch(
      [
        {
          chunkSource:
            "link://https://lovdata.no/dokument/LTI/forskrift/2025-10-29-2134#bundled-document-part-1",
          corpus: "LTI",
        },
      ],
      {
        lovdataId: "sf-20251029-2134",
        corpus: "SF",
      }
    );
    expect(regulationRank).toBe(1);
  });

  test("computeMetrics reports hit rates and mrr", () => {
    expect(
      computeMetrics(
        [
          { rank: 1 },
          { rank: 3 },
          { rank: null },
        ],
        4
      )
    ).toEqual({
      total: 3,
      hitAt1: 0.3333,
      hitAt3: 0.6667,
      hitAt4: 0.6667,
      mrr: 0.4444,
    });
  });

  test("isRetryableStatus covers transient HTTP failures", () => {
    expect(isRetryableStatus(429)).toBe(true);
    expect(isRetryableStatus(503)).toBe(true);
    expect(isRetryableStatus(403)).toBe(false);
  });

  test("remote eval parseArgs supports split keys and legacy fallback key", () => {
    const originalEnv = {
      ANYTHINGLLM_API_KEY: process.env.ANYTHINGLLM_API_KEY,
      ANYTHINGLLM_MANAGEMENT_API_KEY: process.env.ANYTHINGLLM_MANAGEMENT_API_KEY,
      ANYTHINGLLM_SEARCH_API_KEY: process.env.ANYTHINGLLM_SEARCH_API_KEY,
    };

    delete process.env.ANYTHINGLLM_API_KEY;
    delete process.env.ANYTHINGLLM_MANAGEMENT_API_KEY;
    delete process.env.ANYTHINGLLM_SEARCH_API_KEY;

    try {
      const splitArgs = parseRemoteEvalArgs([
        "--workspace",
        "legal",
        "--management-api-key",
        "management-key",
        "--search-api-key",
        "search-key",
      ]);

      expect(splitArgs.managementApiKey).toBe("management-key");
      expect(splitArgs.searchApiKey).toBe("search-key");

      const fallbackArgs = parseRemoteEvalArgs(["--workspace", "legal", "--api-key", "legacy-key"]);
      expect(fallbackArgs.managementApiKey).toBe("legacy-key");
      expect(fallbackArgs.searchApiKey).toBe("legacy-key");
    } finally {
      for (const [key, value] of Object.entries(originalEnv)) {
        if (value === undefined) delete process.env[key];
        else process.env[key] = value;
      }
    }
  });

  test("runEvaluation restores the original vectorSearchMode after vector search failure", async () => {
    const updateWorkspaceMode = jest.fn().mockResolvedValue();
    const vectorSearchError = new Error("vector search denied");

    await expect(
      runEvaluation(
        {
          workspace: "legal",
          benchmark: "/tmp/benchmark.json",
          modes: ["rerank"],
          topNs: [4],
          thresholds: [0.2],
          reportJson: "/tmp/report.json",
          reportMd: "/tmp/report.md",
        },
        {
          loadBenchmark: jest.fn().mockReturnValue([
            {
              id: "case-1",
              query: "kan en mindreårig inngå avtale",
              expect: { lovdataId: "nl-16870415-000", corpus: "NL" },
            },
          ]),
          getWorkspace: jest.fn().mockResolvedValue({ vectorSearchMode: "default" }),
          updateWorkspaceMode,
          vectorSearch: jest.fn().mockRejectedValue(vectorSearchError),
          writeReports: jest.fn(),
          logger: { log: jest.fn(), error: jest.fn() },
        }
      )
    ).rejects.toThrow("vector search denied");

    expect(updateWorkspaceMode).toHaveBeenNthCalledWith(1, expect.any(Object), "rerank");
    expect(updateWorkspaceMode).toHaveBeenNthCalledWith(2, expect.any(Object), "default");
  });
});
