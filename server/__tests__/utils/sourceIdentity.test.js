const {
  normalizeSourceIdentity,
  sourceIdentifier,
  sourceIdentityScore,
} = require("../../utils/sourceIdentity");

describe("sourceIdentity", () => {
  test("normalizes source identity fields", () => {
    expect(normalizeSourceIdentity({ title: "Doc", url: "https://lovdata.no" }))
      .toEqual({
        title: "Doc",
        published: null,
        chunkSource: null,
        url: "https://lovdata.no",
        location: null,
      });
  });

  test("prefers stable location and url-based identifiers", () => {
    expect(sourceIdentifier({ location: "avgjorelser-hra/hr-1.json" })).toBe(
      "location:avgjorelser-hra/hr-1.json"
    );
    expect(
      sourceIdentifier({ chunkSource: "link://https://lovdata.no/dokument/HRSTR/avgjorelse/hr-1" })
    ).toBe("chunkSource:link://https://lovdata.no/dokument/HRSTR/avgjorelse/hr-1");
    expect(sourceIdentifier({ url: "https://lovdata.no/dokument/HRSTR/avgjorelse/hr-1" })).toBe(
      "url:https://lovdata.no/dokument/HRSTR/avgjorelse/hr-1"
    );
  });

  test("scores source matches by strongest available identity", () => {
    const identity = {
      title: "HR-2024-1-A",
      published: "1/1/2024, 12:00:00 AM",
      chunkSource: "link://https://lovdata.no/dokument/HRSTR/avgjorelse/hr-2024-1-a",
      url: "https://lovdata.no/dokument/HRSTR/avgjorelse/hr-2024-1-a",
      location: "avgjorelser-hra/hr-2024-1-a.json",
    };

    expect(sourceIdentityScore(identity, { location: identity.location })).toBe(5);
    expect(sourceIdentityScore(identity, { chunkSource: identity.chunkSource })).toBe(4);
    expect(sourceIdentityScore(identity, { url: identity.url })).toBe(3);
    expect(
      sourceIdentityScore(identity, {
        title: identity.title,
        published: identity.published,
      })
    ).toBe(2);
    expect(sourceIdentityScore(identity, { title: "Other" })).toBe(0);
  });
});
