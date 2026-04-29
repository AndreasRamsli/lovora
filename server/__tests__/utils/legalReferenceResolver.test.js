const {
  dedupeCanonicalCandidates,
  rankLegalCandidates,
  resolveLegalReferences,
} = require("../../utils/legalReferenceResolver");
const { parseLegalCitationQuery } = require("../../utils/legalCitationQuery");

function fixtureStore() {
  const rows = [
    {
      documentId: "LOV-2005-06-17-90",
      canonicalTitle: "tvisteloven",
      aliases: ["tvisteloven"],
      title: "Tvisteloven",
      section: "20-3",
      subsection: "",
      versionType: "consolidated",
      canonicalSectionId: "NO:NL:LOV-2005-06-17-90:section:20-3",
      canonicalSourceId: "NO:NL:LOV-2005-06-17-90:section:20-3",
      embeddingChunkIds: ["chunk-tv-20-3"],
      embeddingChunkSources: ["link://tvisteloven#20-3"],
      text: "Medhold av betydning og tungtveiende grunner.",
    },
    {
      documentId: "LOV-2005-06-17-90",
      canonicalTitle: "tvisteloven",
      aliases: ["tvisteloven"],
      title: "Tvisteloven",
      section: "20-1",
      subsection: "",
      versionType: "consolidated",
      canonicalSectionId: "NO:NL:LOV-2005-06-17-90:section:20-1",
      canonicalSourceId: "NO:NL:LOV-2005-06-17-90:section:20-1",
      embeddingChunkIds: ["chunk-tv-20-1"],
      embeddingChunkSources: ["link://tvisteloven#20-1"],
      text: "Virkeområde for sakskostnadsreglene.",
    },
    {
      documentId: "LOV-2005-06-17-90",
      canonicalTitle: "tvisteloven",
      aliases: ["tvisteloven"],
      title: "Tvisteloven",
      section: "20-2",
      subsection: "",
      versionType: "consolidated",
      canonicalSectionId: "NO:NL:LOV-2005-06-17-90:section:20-2",
      canonicalSourceId: "NO:NL:LOV-2005-06-17-90:section:20-2",
      embeddingChunkIds: ["chunk-tv-20-2"],
      embeddingChunkSources: ["link://tvisteloven#20-2"],
      text: "Hovedregelen om sakskostnader.",
    },
    {
      documentId: "LOV-2005-06-17-90",
      canonicalTitle: "tvisteloven",
      aliases: ["tvisteloven"],
      title: "Tvisteloven",
      section: "20-4",
      subsection: "",
      versionType: "consolidated",
      canonicalSectionId: "NO:NL:LOV-2005-06-17-90:section:20-4",
      canonicalSourceId: "NO:NL:LOV-2005-06-17-90:section:20-4",
      embeddingChunkIds: ["chunk-tv-20-4"],
      embeddingChunkSources: ["link://tvisteloven#20-4"],
      text: "Unntak fra sakskostnader.",
    },
    {
      documentId: "LOV-2026-01-01-1",
      canonicalTitle: "endringslov til tvisteloven",
      aliases: ["tvisteloven"],
      title: "Endringslov til tvisteloven",
      section: "20-3",
      subsection: "",
      versionType: "amending_act",
      canonicalSectionId: "NO:NL:LOV-2026-01-01-1:section:20-3",
      canonicalSourceId: "NO:NL:LOV-2026-01-01-1:section:20-3",
      embeddingChunkIds: ["chunk-tv-20-3-amending"],
      embeddingChunkSources: ["link://tvisteloven-amending#20-3"],
      text: "Historisk endring.",
    },
    {
      documentId: "LOV-2005-06-17-67",
      canonicalTitle: "skattebetalingsloven",
      aliases: ["skattebetalingsloven", "lov 17. juni 2005 nr. 67"],
      title: "Skattebetalingsloven",
      section: "10-51",
      subsection: "ledd:4",
      subsectionLabel: "fjerde ledd",
      versionType: "consolidated",
      canonicalSectionId: "NO:NL:LOV-2005-06-17-67:section:10-51",
      canonicalSourceId: "NO:NL:LOV-2005-06-17-67:section:10-51:ledd:4",
      embeddingChunkIds: ["chunk-skatt-10-51"],
      embeddingChunkSources: ["link://skatt#10-51"],
      text: "31. mai i det tredje året etter fastsettingsåret.",
    },
    {
      documentId: "LOV-2005-06-17-67",
      canonicalTitle: "skattebetalingsloven",
      aliases: ["skattebetalingsloven", "lov 17. juni 2005 nr. 67"],
      title: "Skattebetalingsloven",
      section: "9-3",
      subsection: "",
      versionType: "consolidated",
      canonicalSectionId: "NO:NL:LOV-2005-06-17-67:section:9-3",
      canonicalSourceId: "NO:NL:LOV-2005-06-17-67:section:9-3",
      embeddingChunkIds: ["chunk-skatt-9-3-current"],
      embeddingChunkSources: ["link://skatt#9-3-current"],
      text: "Virksomhetsformue.",
    },
    {
      documentId: "LOV-2025-12-22-120",
      canonicalTitle: "endringslov til skattebetalingsloven",
      aliases: ["skattebetalingsloven"],
      title: "Endringslov til skattebetalingsloven",
      section: "9-3",
      subsection: "",
      versionType: "amending_act",
      canonicalSectionId: "NO:NL:LOV-2025-12-22-120:section:9-3",
      canonicalSourceId: "NO:NL:LOV-2025-12-22-120:section:9-3",
      embeddingChunkIds: ["chunk-skatt-9-3-amending"],
      embeddingChunkSources: ["link://skatt#9-3-amending"],
      text: "Endringslov.",
    },
    {
      documentId: "LOV-2008-06-06-37",
      canonicalTitle: "havressurslova",
      aliases: ["havressurslova"],
      title: "Havressurslova",
      section: "46",
      subsection: "",
      versionType: "consolidated",
      canonicalSectionId: "NO:NL:LOV-2008-06-06-37:section:46",
      canonicalSourceId: "NO:NL:LOV-2008-06-06-37:section:46",
      embeddingChunkIds: ["chunk-havressurs-46-current"],
      embeddingChunkSources: ["link://havressurs#46"],
      text: "Gjennomføring av kontroll.",
    },
    {
      documentId: "LOV-2008-06-06-37",
      canonicalTitle: "havressurslova",
      aliases: ["havressurslova"],
      title: "Havressurslova",
      section: "47",
      subsection: "",
      versionType: "consolidated",
      canonicalSectionId: "NO:NL:LOV-2008-06-06-37:section:47",
      canonicalSourceId: "NO:NL:LOV-2008-06-06-37:section:47",
      embeddingChunkIds: ["chunk-havressurs-47-current"],
      embeddingChunkSources: ["link://havressurs#47"],
      text: "Straff.",
    },
    {
      documentId: "LOV-2008-06-06-37",
      canonicalTitle: "havressurslova",
      aliases: ["havressurslova"],
      title: "Havressurslova",
      section: "48",
      subsection: "",
      versionType: "consolidated",
      canonicalSectionId: "NO:NL:LOV-2008-06-06-37:section:48",
      canonicalSourceId: "NO:NL:LOV-2008-06-06-37:section:48",
      embeddingChunkIds: ["chunk-havressurs-48-current"],
      embeddingChunkSources: ["link://havressurs#48"],
      text: "Inndraging.",
    },
    {
      documentId: "LOV-2008-06-06-37",
      canonicalTitle: "havressurslova",
      aliases: ["havressurslova"],
      title: "Havressurslova",
      section: "49",
      subsection: "",
      versionType: "consolidated",
      canonicalSectionId: "NO:NL:LOV-2008-06-06-37:section:49",
      canonicalSourceId: "NO:NL:LOV-2008-06-06-37:section:49",
      embeddingChunkIds: ["chunk-havressurs-49-current"],
      embeddingChunkSources: ["link://havressurs#49"],
      text: "Straffeprosess.",
    },
    {
      documentId: "LOV-2025-06-06-29",
      canonicalTitle: "endringslov til havressurslova",
      aliases: ["endringslov til havressurslova"],
      title: "Endringslov til havressurslova",
      section: "46",
      subsection: "",
      versionType: "amending_act",
      segmentType: "virtual_amending_section",
      matchReason: "amending_act_section_match",
      canonicalSectionId: "NO:NL:LOV-2025-06-06-29:amending-section:46",
      canonicalSourceId: "NO:NL:LOV-2025-06-06-29:amending-section:46",
      embeddingChunkIds: ["chunk-havressurs-amending"],
      embeddingChunkSources: ["link://havressurs-amending"],
      text: "Beslaglegge og destruere umerket fiskeredskap.",
    },
    {
      documentId: "LOV-2005-06-17-67",
      canonicalTitle: "skattebetalingsloven",
      aliases: ["skattebetalingsloven"],
      title: "Skattebetalingsloven",
      section: "20-3",
      subsection: "",
      versionType: "consolidated",
      canonicalSectionId: "NO:NL:LOV-2005-06-17-67:section:20-3",
      canonicalSourceId: "NO:NL:LOV-2005-06-17-67:section:20-3",
      embeddingChunkIds: ["chunk-skatt-20-3"],
      embeddingChunkSources: ["link://skatt#20-3"],
      text: "Skattebetalingsloven § 20-3.",
    },
  ];
  const aliasToDocumentIds = new Map();
  for (const row of rows) {
    for (const alias of row.aliases) {
      if (!aliasToDocumentIds.has(alias)) aliasToDocumentIds.set(alias, new Set());
      aliasToDocumentIds.get(alias).add(row.documentId);
    }
  }
  return { canonicalRows: rows, aliasToDocumentIds };
}

function fixtureStoreWithoutVirtualAmendingSection() {
  const store = fixtureStore();
  store.canonicalRows = store.canonicalRows.filter(
    (row) =>
      row.canonicalSourceId !== "NO:NL:LOV-2025-06-06-29:amending-section:46"
  );
  return store;
}

describe("legalReferenceResolver", () => {
  test("returns before loading artifacts when no legal reference exists", () => {
    expect(
      resolveLegalReferences({
        parsedQuery: parseLegalCitationQuery("Hva betyr sakskostnader?"),
      })
    ).toEqual([]);
  });

  test("resolves exact section by canonical id", () => {
    const results = resolveLegalReferences({
      parsedQuery: parseLegalCitationQuery("Hva sier tvisteloven § 20-3?"),
      store: fixtureStore(),
    });

    expect(results[0]).toMatchObject({
      canonicalSectionId: "NO:NL:LOV-2005-06-17-90:section:20-3",
      canonicalSourceId: "NO:NL:LOV-2005-06-17-90:section:20-3",
      retrievalReasons: ["title_alias_match", "exact_section_match"],
    });
  });

  test("resolves exact ledd before section", () => {
    const results = resolveLegalReferences({
      parsedQuery: parseLegalCitationQuery(
        "Når forfaller skattebetalingsloven § 10-51 fjerde ledd?"
      ),
      store: fixtureStore(),
    });

    expect(results[0]).toMatchObject({
      canonicalSourceId: "NO:NL:LOV-2005-06-17-67:section:10-51:ledd:4",
      embeddingChunkId: "chunk-skatt-10-51",
      retrievalReasons: ["title_alias_match", "exact_section_subsection_match"],
    });
  });

  test("resolves dated source alias to document id", () => {
    const results = resolveLegalReferences({
      parsedQuery: parseLegalCitationQuery("Hva sier lov 17. juni 2005 nr. 67 § 9-3?"),
      store: fixtureStore(),
    });

    expect(results[0].documentId).toBe("LOV-2005-06-17-67");
    expect(results[0].retrievalReasons).toContain("dated_source_alias_match");
  });

  test("does not pin ambiguous bare section references", () => {
    const results = resolveLegalReferences({
      parsedQuery: parseLegalCitationQuery("Hva sier § 20-3?"),
      store: fixtureStore(),
    });

    expect(results).toEqual([]);
  });

  test("ranks consolidated current law before amending acts", () => {
    const ranked = rankLegalCandidates([
      {
        canonicalSourceId: "amending",
        versionType: "amending_act",
        matchType: "section",
      },
      {
        canonicalSourceId: "neighbor",
        versionType: "consolidated",
        matchType: "neighbor",
      },
      {
        canonicalSourceId: "current",
        versionType: "consolidated",
        matchType: "section",
      },
    ]);

    expect(ranked.map((item) => item.canonicalSourceId)).toEqual([
      "current",
      "neighbor",
      "amending",
    ]);
  });

  test("normal law intent prefers consolidated current law", () => {
    const results = resolveLegalReferences({
      parsedQuery: parseLegalCitationQuery("Hva sier havressurslova § 46?"),
      store: fixtureStore(),
    });

    expect(results[0]).toMatchObject({
      canonicalSourceId: "NO:NL:LOV-2008-06-06-37:section:46",
      retrievalReasons: ["title_alias_match", "exact_section_match"],
    });
  });

  test("amendment law intent prefers virtual amendment section", () => {
    const results = resolveLegalReferences({
      parsedQuery: parseLegalCitationQuery(
        "Hva sier Endringslov til havressurslova § 46?"
      ),
      store: fixtureStore(),
    });

    expect(results[0]).toMatchObject({
      canonicalSourceId: "NO:NL:LOV-2025-06-06-29:amending-section:46",
      embeddingChunkId: "chunk-havressurs-amending",
      retrievalReasons: ["title_alias_match", "amending_act_section_match"],
    });
  });

  test("lov om endringer intent resolves virtual amendment section", () => {
    const results = resolveLegalReferences({
      parsedQuery: parseLegalCitationQuery(
        "Hva sier lov om endringer i havressurslova § 46?"
      ),
      store: fixtureStore(),
    });

    expect(results[0]).toMatchObject({
      canonicalSourceId: "NO:NL:LOV-2025-06-06-29:amending-section:46",
      embeddingChunkId: "chunk-havressurs-amending",
      retrievalReasons: ["title_alias_match", "amending_act_section_match"],
    });
  });

  test("keeps explicit amendment hits inside tight multi-reference limits", () => {
    const results = resolveLegalReferences({
      parsedQuery: parseLegalCitationQuery(
        "Sammenlign Endringslov til havressurslova § 46, havressurslova § 47, § 48 og § 49."
      ),
      store: fixtureStore(),
      limit: 3,
    });

    expect(results.map((item) => item.canonicalSourceId)).toEqual([
      "NO:NL:LOV-2025-06-06-29:amending-section:46",
      "NO:NL:LOV-2008-06-06-37:section:47",
      "NO:NL:LOV-2008-06-06-37:section:48",
    ]);
    expect(results[0]).toMatchObject({
      preferredVersionType: "amending",
      retrievalReasons: ["title_alias_match", "amending_act_section_match"],
    });
  });

  test("falls back to current law when amendment section anchor is unavailable", () => {
    const results = resolveLegalReferences({
      parsedQuery: parseLegalCitationQuery(
        "Hva sier Endringslov til havressurslova § 46?"
      ),
      store: fixtureStoreWithoutVirtualAmendingSection(),
    });

    expect(results[0]).toMatchObject({
      canonicalSourceId: "NO:NL:LOV-2008-06-06-37:section:46",
      retrievalReasons: ["title_alias_match", "exact_section_match"],
    });
  });

  test("does not mix stale dated source hints into later named-law references", () => {
    const results = resolveLegalReferences({
      parsedQuery: parseLegalCitationQuery(
        "Sammenlign lov 17. juni 2005 nr. 67 § 9-3 og tvisteloven § 20-3."
      ),
      store: fixtureStore(),
      limit: 5,
    });

    expect(results.map((item) => item.canonicalSourceId)).toContain(
      "NO:NL:LOV-2005-06-17-90:section:20-3"
    );
    expect(results.map((item) => item.canonicalSourceId)).not.toContain(
      "NO:NL:LOV-2005-06-17-67:section:20-3"
    );
  });

  test("adds same-doc neighbors after exact current section", () => {
    const results = resolveLegalReferences({
      parsedQuery: parseLegalCitationQuery("Hva sier tvisteloven § 20-3?"),
      store: fixtureStore(),
      limit: 4,
    });

    expect(results.map((item) => item.canonicalSourceId)).toEqual([
      "NO:NL:LOV-2005-06-17-90:section:20-3",
      "NO:NL:LOV-2005-06-17-90:section:20-2",
      "NO:NL:LOV-2005-06-17-90:section:20-4",
    ]);
    expect(results[1].retrievalReasons).toContain("same_doc_neighbor_section");
  });

  test("keeps exact multi-section hits ahead of neighbor duplicates", () => {
    const results = resolveLegalReferences({
      parsedQuery: parseLegalCitationQuery("Sammenlign tvisteloven §§ 20-2 og 20-3."),
      store: fixtureStore(),
      limit: 4,
    });

    expect(results.slice(0, 2).map((item) => item.canonicalSourceId)).toEqual([
      "NO:NL:LOV-2005-06-17-90:section:20-2",
      "NO:NL:LOV-2005-06-17-90:section:20-3",
    ]);
    expect(results[1].retrievalReasons).toContain("exact_section_match");
  });

  test("dedupes by canonical source id", () => {
    expect(
      dedupeCanonicalCandidates([
        { canonicalSourceId: "same", retrievalReasons: ["title_alias_match"] },
        { canonicalSourceId: "same", retrievalReasons: ["dated_source_alias_match"] },
      ])
    ).toEqual([
      {
        canonicalSourceId: "same",
        retrievalReasons: ["title_alias_match", "dated_source_alias_match"],
      },
    ]);
  });
});
