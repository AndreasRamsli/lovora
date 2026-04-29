const {
  dedupeRetrievedSources,
  retrieveWorkspaceContext,
  shouldUseWorkspaceContextRetrieval,
} = require("../../utils/chats/workspaceContextRetriever");

function resolverResult() {
  return [
    {
      canonicalSourceId: "NO:NL:LOV-2005-06-17-90:section:20-3",
      embeddingChunkId: "chunk-exact",
      title: "Tvisteloven",
      section: "20-3",
      text: "Eksakt § 20-3.",
      chunkSource: "link://exact",
      retrievalReasons: ["title_alias_match", "exact_section_match"],
    },
  ];
}

describe("workspaceContextRetriever", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("pins exact legal hits before vector fallback", async () => {
    const vectorDb = {
      performSimilaritySearch: jest.fn().mockResolvedValue({
        message: false,
        sources: [
          {
            embeddingChunkId: "chunk-vector",
            title: "Tvisteloven",
            text: "Vector § 20-5.",
            chunkSource: "link://vector",
          },
        ],
      }),
    };

    const result = await retrieveWorkspaceContext({
      query: "Hva sier tvisteloven § 20-3?",
      workspace: { slug: "lovora-alpha" },
      LLMConnector: { embedTextInput: jest.fn() },
      topN: 2,
      vectorDb,
      resolveExactSources: () => resolverResult(),
      rawHistory: [],
    });

    expect(result.sources.map((source) => source.text)).toEqual([
      "Eksakt § 20-3.",
      "Vector § 20-5.",
    ]);
    expect(result.sources[0].retrievalReasons).toContain("exact_section_match");
    expect(result.sources[1].retrievalReasons).toEqual(["vector_fallback"]);
    expect(vectorDb.performSimilaritySearch).toHaveBeenCalledWith(
      expect.objectContaining({ topN: 1 })
    );
  });

  test("uses vector fallback only when no exact legal reference resolves", async () => {
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    const vectorDb = {
      performSimilaritySearch: jest.fn().mockResolvedValue({
        message: false,
        sources: [{ text: "Bare vector.", chunkSource: "link://vector" }],
      }),
    };

    const result = await retrieveWorkspaceContext({
      query: "Hva betyr sakskostnader?",
      workspace: { slug: "lovora-alpha" },
      LLMConnector: { embedTextInput: jest.fn() },
      topN: 1,
      vectorDb,
      resolveExactSources: () => [],
      rawHistory: [],
    });

    expect(result.sources).toHaveLength(1);
    expect(result.sources[0].retrievalReasons).toEqual(["vector_fallback"]);
    expect(result.diagnostics).toMatchObject({
      legalReferenceDetected: false,
      legalReferenceCount: 0,
      exactMatchCount: 0,
      exactMatchFound: false,
      legalReferenceFallback: false,
    });
    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  test("warns when a legal reference falls back to vector search", async () => {
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    const vectorDb = {
      performSimilaritySearch: jest.fn().mockResolvedValue({
        message: false,
        sources: [
          {
            text: "Vector om tvisteloven.",
            chunkSource: "link://vector",
          },
        ],
      }),
    };

    const result = await retrieveWorkspaceContext({
      query: "Hva sier tvisteloven § 20-3?",
      workspace: { slug: "lovora-alpha" },
      LLMConnector: { embedTextInput: jest.fn() },
      topN: 1,
      vectorDb,
      resolveExactSources: () => [],
      rawHistory: [],
    });

    expect(result.diagnostics).toMatchObject({
      legalReferenceDetected: true,
      legalReferenceCount: 1,
      exactMatchCount: 0,
      exactMatchFound: false,
      legalReferenceFallback: true,
      missedSections: ["20-3"],
    });
    expect(warnSpy).toHaveBeenCalledWith(
      "[legal-retrieval-metric]",
      expect.stringContaining('"retrieval_reason":"vector_fallback"')
    );
    expect(JSON.parse(warnSpy.mock.calls[0][1])).toMatchObject({
      workspace: "lovora-alpha",
      legal_reference_detected: true,
      exact_match_found: false,
      retrieval_reason: "vector_fallback",
      sections: ["20-3"],
      missed_sections: ["20-3"],
    });
    expect(warnSpy.mock.calls[0][1]).not.toContain("Hva sier");
    warnSpy.mockRestore();
  });

  test("warns when a multi-reference query has a partial exact miss", async () => {
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    const vectorDb = {
      performSimilaritySearch: jest.fn().mockResolvedValue({
        message: false,
        sources: [
          {
            text: "Vector om § 20-4.",
            chunkSource: "link://vector",
          },
        ],
      }),
    };

    const result = await retrieveWorkspaceContext({
      query: "Sammenlign tvisteloven § 20-3 og § 20-4.",
      workspace: { slug: "lovora-alpha" },
      LLMConnector: { embedTextInput: jest.fn() },
      topN: 2,
      vectorDb,
      resolveExactSources: () => resolverResult(),
      rawHistory: [],
    });

    expect(result.diagnostics).toMatchObject({
      legalReferenceDetected: true,
      legalReferenceCount: 2,
      exactMatchCount: 1,
      exactMatchFound: false,
      legalReferenceFallback: true,
      missedSections: ["20-4"],
    });
    expect(JSON.parse(warnSpy.mock.calls[0][1])).toMatchObject({
      reference_count: 2,
      exact_match_count: 1,
      sections: ["20-3", "20-4"],
      missed_sections: ["20-4"],
    });
    warnSpy.mockRestore();
  });

  test("uses history backfill as context without exposing it as a new citation", async () => {
    const vectorDb = {
      performSimilaritySearch: jest.fn().mockResolvedValue({
        message: false,
        sources: [],
      }),
    };
    const historySource = {
      id: "history-1",
      score: 0.9,
      title: "Historikk",
      text: "Skjult historikk-kontekst.",
      chunkSource: "link://history",
    };

    const result = await retrieveWorkspaceContext({
      query: "Hva sier tvisteloven § 20-3?",
      workspace: { slug: "lovora-alpha" },
      LLMConnector: { embedTextInput: jest.fn() },
      topN: 2,
      vectorDb,
      resolveExactSources: () => resolverResult(),
      rawHistory: [{ response: JSON.stringify({ sources: [historySource] }) }],
    });

    expect(result.contextTexts).toEqual([
      "Eksakt § 20-3.",
      "Skjult historikk-kontekst.",
    ]);
    expect(result.diagnostics).toMatchObject({
      legalReferenceDetected: true,
      legalReferenceCount: 1,
      exactMatchCount: 1,
      exactMatchFound: true,
      legalReferenceFallback: false,
    });
    expect(result.sources.map((source) => source.text)).toEqual([
      "Eksakt § 20-3.",
    ]);
  });

  test("keeps exact legal hits when vector fallback fails", async () => {
    const vectorDb = {
      performSimilaritySearch: jest.fn().mockResolvedValue({
        message: "Vector unavailable",
        sources: [],
      }),
    };

    const result = await retrieveWorkspaceContext({
      query: "Hva sier tvisteloven § 20-3?",
      workspace: { slug: "lovora-alpha" },
      LLMConnector: { embedTextInput: jest.fn() },
      topN: 2,
      vectorDb,
      resolveExactSources: () => resolverResult(),
      rawHistory: [],
    });

    expect(result.message).toBe(false);
    expect(result.sources.map((source) => source.text)).toEqual(["Eksakt § 20-3."]);
    expect(result.diagnostics.vectorError).toBe("Vector unavailable");
  });

  test("can return exact legal context when vector search is disabled", async () => {
    const vectorDb = {
      performSimilaritySearch: jest.fn(),
    };

    const result = await retrieveWorkspaceContext({
      query: "Hva sier tvisteloven § 20-3?",
      workspace: { slug: "lovora-alpha" },
      LLMConnector: { embedTextInput: jest.fn() },
      topN: 2,
      vectorDb,
      vectorSearchEnabled: false,
      resolveExactSources: () => resolverResult(),
      rawHistory: [],
    });

    expect(result.contextTexts).toEqual(["Eksakt § 20-3."]);
    expect(result.sources.map((source) => source.text)).toEqual(["Eksakt § 20-3."]);
    expect(vectorDb.performSimilaritySearch).not.toHaveBeenCalled();
  });

  test("uses retrieval when either vectors or legal artifacts are available", () => {
    expect(
      shouldUseWorkspaceContextRetrieval({
        embeddingsCount: 1,
        workspaceSlug: "lovora-alpha",
        hasLegalArtifacts: () => false,
      })
    ).toBe(true);
    expect(
      shouldUseWorkspaceContextRetrieval({
        embeddingsCount: 0,
        workspaceSlug: "lovora-alpha",
        hasLegalArtifacts: () => true,
      })
    ).toBe(true);
    expect(
      shouldUseWorkspaceContextRetrieval({
        embeddingsCount: 0,
        workspaceSlug: "lovora-alpha",
        hasLegalArtifacts: () => false,
      })
    ).toBe(false);
    expect(
      shouldUseWorkspaceContextRetrieval({
        embeddingsCount: 1,
        hasVectorizedSpace: false,
        workspaceSlug: "lovora-alpha",
        hasLegalArtifacts: () => false,
      })
    ).toBe(false);
  });

  test("normalizes JSON encoded vector retrieval reasons", async () => {
    const vectorDb = {
      performSimilaritySearch: jest.fn().mockResolvedValue({
        message: false,
        sources: [
          {
            text: "Vector.",
            chunkSource: "link://vector",
            retrievalReasons: '["title_alias_match"]',
          },
        ],
      }),
    };

    const result = await retrieveWorkspaceContext({
      query: "Hva betyr sakskostnader?",
      workspace: { slug: "lovora-alpha" },
      LLMConnector: { embedTextInput: jest.fn() },
      topN: 1,
      vectorDb,
      resolveExactSources: () => [],
      rawHistory: [],
    });

    expect(result.sources[0].retrievalReasons).toEqual([
      "title_alias_match",
      "vector_fallback",
    ]);
  });

  test("dedupes exact and vector sources by canonical source id", () => {
    const sources = dedupeRetrievedSources([
      {
        canonicalSourceId: "same",
        text: "Exact",
        retrievalReasons: ["exact_section_match"],
      },
      {
        canonicalSourceId: "same",
        text: "Vector duplicate",
        retrievalReasons: ["vector_fallback"],
      },
    ]);

    expect(sources).toEqual([
      {
        canonicalSourceId: "same",
        text: "Exact",
        retrievalReasons: ["exact_section_match", "canonical_id_dedupe"],
      },
    ]);
  });
});
