const {
  buildVirtualAmendingRows,
  extractAmendingSectionAnchors,
} = require("../../utils/legalAmendingAnchors");

describe("legalAmendingAnchors", () => {
  test("extracts section anchors from full-document amending text", () => {
    expect(
      extractAmendingSectionAnchors(
        "I lov 6. juni 2008 nr. 37 skal § 46 lyde:\n§ 46. Gjennomføring av kontroll\nFiskeridirektoratet kan beslaglegge redskap."
      )
    ).toEqual(["46"]);
  });

  test.each([
    ["Dette følger av jf. § 3-2 og etter § 19-8.", []],
    ["Overtredelse straffes etter § 212.", []],
  ])("ignores ordinary cross-references in %s", (text, expected) => {
    expect(extractAmendingSectionAnchors(text)).toEqual(expected);
  });

  test("extracts anchors from explicit amendment operations", () => {
    expect(extractAmendingSectionAnchors("Ny § 9-3 skal lyde:")).toEqual([
      "9-3",
    ]);
  });

  test.each([
    ["§ 4 d første punktum skal lyde:", ["4d"]],
    ["Ny § 8 a skal lyde:", ["8a"]],
    ["§ 2-1 a skal lyde:", ["2-1a"]],
  ])("normalizes spaced letter suffixes in %s", (text, expected) => {
    expect(extractAmendingSectionAnchors(text)).toEqual(expected);
  });

  test("builds virtual rows pointing back to the same embedding chunk", () => {
    const rows = buildVirtualAmendingRows({
      documentId: "LOV-2025-06-06-29",
      lovdataId: "nl-20250606-029",
      jurisdiction: "NO",
      corpus: "NL",
      canonicalTitle: "endringslov til havressurslova",
      title: "Lov om endringer i havressurslova",
      aliases: ["endringslov til havressurslova"],
      versionType: "amending_act",
      segmentType: "bundled_document",
      section: "full-document",
      canonicalSourceId: "NO:NL:LOV-2025-06-06-29:section:full-document",
      embeddingChunkIds: ["NO:EMBED:NL:nl-20250606-029:bundle:1"],
      embeddingChunkSources: ["link://amending#bundle"],
      text:
        "I lov 6. juni 2008 nr. 37 skal § 46 lyde:\n" +
        "§ 46. Gjennomføring av kontroll\n" +
        "Fiskeridirektoratet kan beslaglegge redskap.",
    });

    expect(rows).toEqual([
      expect.objectContaining({
        documentId: "LOV-2025-06-06-29",
        section: "46",
        versionType: "amending_act",
        matchReason: "amending_act_section_match",
        canonicalSectionId: "NO:NL:LOV-2025-06-06-29:amending-section:46",
        canonicalSourceId: "NO:NL:LOV-2025-06-06-29:amending-section:46",
        embeddingChunkIds: ["NO:EMBED:NL:nl-20250606-029:bundle:1"],
      }),
    ]);
  });
});
