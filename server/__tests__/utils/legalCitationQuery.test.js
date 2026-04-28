const {
  normalizeSectionRef,
  parseLegalCitationQuery,
} = require("../../utils/legalCitationQuery");

describe("legalCitationQuery", () => {
  test("parses exact section reference", () => {
    expect(
      parseLegalCitationQuery("Når kan man få sakskostnader etter tvisteloven § 20-3?")
    ).toEqual({
      hasLegalReference: true,
      references: [
        {
          raw: "tvisteloven § 20-3",
          documentHints: ["tvisteloven"],
          datedSourceHints: [],
          section: "20-3",
          subsections: [],
        },
      ],
    });
  });

  test("parses exact section with ledd", () => {
    expect(
      parseLegalCitationQuery(
        "Når forfaller utsatt formuesskatt etter skattebetalingsloven § 10-51 fjerde ledd?"
      )
    ).toEqual({
      hasLegalReference: true,
      references: [
        {
          raw: "skattebetalingsloven § 10-51 fjerde ledd",
          documentHints: ["skattebetalingsloven"],
          datedSourceHints: [],
          section: "10-51",
          subsections: [{ type: "ledd", number: 4, label: "fjerde ledd" }],
        },
      ],
    });
  });

  test("parses dated source alias", () => {
    expect(
      parseLegalCitationQuery("Hva sier lov 17. juni 2005 nr. 67 § 9-3?")
    ).toEqual({
      hasLegalReference: true,
      references: [
        {
          raw: "lov 17. juni 2005 nr. 67 § 9-3",
          documentHints: [],
          datedSourceHints: ["lov 17. juni 2005 nr. 67"],
          section: "9-3",
          subsections: [],
        },
      ],
    });
  });

  test("inherits document hint across multiple sections", () => {
    expect(
      parseLegalCitationQuery("Sammenlign tvisteloven § 20-2 og § 20-3.")
        .references
    ).toEqual([
      {
        raw: "tvisteloven § 20-2",
        documentHints: ["tvisteloven"],
        datedSourceHints: [],
        section: "20-2",
        subsections: [],
      },
      {
        raw: "§ 20-3",
        documentHints: ["tvisteloven"],
        datedSourceHints: [],
        section: "20-3",
        subsections: [],
      },
    ]);
  });

  test("parses bare continuation sections after plural section marker", () => {
    expect(
      parseLegalCitationQuery("Sammenlign tvisteloven §§ 20-2 og 20-3.")
        .references
    ).toEqual([
      {
        raw: "tvisteloven §§ 20-2",
        documentHints: ["tvisteloven"],
        datedSourceHints: [],
        section: "20-2",
        subsections: [],
      },
      {
        raw: "20-3",
        documentHints: ["tvisteloven"],
        datedSourceHints: [],
        section: "20-3",
        subsections: [],
      },
    ]);
  });

  test("returns no references for broad questions", () => {
    expect(parseLegalCitationQuery("Hva betyr sakskostnader?")).toEqual({
      hasLegalReference: false,
      references: [],
    });
  });

  test("normalizes section dashes", () => {
    expect(normalizeSectionRef("§ 10–51")).toBe("10-51");
  });
});
