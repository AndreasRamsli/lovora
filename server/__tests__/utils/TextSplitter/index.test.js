const { TextSplitter } = require("../../../utils/TextSplitter");
const _ = require("lodash");

describe("TextSplitter", () => {
  test("should split long text into n sized chunks", async () => {
    const text = "This is a test text to be split into chunks".repeat(2);
    const textSplitter = new TextSplitter({
      chunkSize: 20,
      chunkOverlap: 0,
    });
    const chunks = await textSplitter.splitText(text);
    expect(chunks.length).toEqual(5);
  });

  test("applies chunk overlap of 20 characters on invalid chunkOverlap", async () => {
    const text = "This is a test text to be split into chunks".repeat(2);
    const textSplitter = new TextSplitter({
      chunkSize: 30,
    });
    const chunks = await textSplitter.splitText(text);
    expect(chunks.length).toEqual(6);
  });

  test("does not allow chunkOverlap to be greater than chunkSize", async () => {
    expect(() => {
      new TextSplitter({
        chunkSize: 20,
        chunkOverlap: 21,
      });
    }).toThrow();
  });

  test("applies specific metadata to stringifyHeader to each chunk", async () => {
    const metadata = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      url: "https://example.com",
      title: "Example",
      docAuthor: "John Doe",
      published: "2021-01-01",
      chunkSource: "link://https://example.com",
      description: "This is a test text to be split into chunks",
    };
    const chunkHeaderMeta = TextSplitter.buildHeaderMeta(metadata);
    expect(chunkHeaderMeta).toEqual({
      sourceDocument: metadata.title,
      source: metadata.url,
      published: metadata.published,
    });
  });

  test("applies a valid chunkPrefix to each chunk", async () => {
    const text = "This is a test text to be split into chunks".repeat(2);
    let textSplitter = new TextSplitter({
      chunkSize: 20,
      chunkOverlap: 0,
      chunkPrefix: "testing: ",
    });
    let chunks = await textSplitter.splitText(text);
    expect(chunks.length).toEqual(5);
    expect(chunks.every(chunk => chunk.startsWith("testing: "))).toBe(true);

    textSplitter = new TextSplitter({
      chunkSize: 20,
      chunkOverlap: 0,
      chunkPrefix: "testing2: ",
    });
    chunks = await textSplitter.splitText(text);
    expect(chunks.length).toEqual(5);
    expect(chunks.every(chunk => chunk.startsWith("testing2: "))).toBe(true);

    textSplitter = new TextSplitter({
      chunkSize: 20,
      chunkOverlap: 0,
      chunkPrefix: undefined,
    });
    chunks = await textSplitter.splitText(text);
    expect(chunks.length).toEqual(5);
    expect(chunks.every(chunk => !chunk.startsWith(": "))).toBe(true);

    textSplitter = new TextSplitter({
      chunkSize: 20,
      chunkOverlap: 0,
      chunkPrefix: "",
    });
    chunks = await textSplitter.splitText(text);
    expect(chunks.length).toEqual(5);
    expect(chunks.every(chunk => !chunk.startsWith(": "))).toBe(true);

    // Applied chunkPrefix with chunkHeaderMeta
    textSplitter = new TextSplitter({
      chunkSize: 20,
      chunkOverlap: 0,
      chunkHeaderMeta: TextSplitter.buildHeaderMeta({
        title: "Example",
        url: "https://example.com",
        published: "2021-01-01",
      }),
      chunkPrefix: "testing3: ",
    });
    chunks = await textSplitter.splitText(text);
    expect(chunks.length).toEqual(5);
    expect(chunks.every(chunk => chunk.startsWith("testing3: <document_metadata>"))).toBe(true);
  });

  test("uses legal paragraph splitting for Lovdata documents", async () => {
    const text = [
      "HR-2024-1-A",
      "",
      "Kilde: https://lovdata.no/dokument/HRSTR/avgjorelse/hr-2024-1-a",
      "Korpus: HRA",
      "",
      "(1) Første avsnitt er kort.",
      "",
      "(2) Andre avsnitt er også kort.",
      "",
      "(3) Tredje avsnitt er kort nok til å stå samlet.",
    ].join("\n");

    const textSplitter = new TextSplitter({
      chunkSize: 140,
      chunkOverlap: 0,
      documentMetadata: {
        docSource: "Lovdata",
        chunkSource: "link://https://lovdata.no/dokument/HRSTR/avgjorelse/hr-2024-1-a",
      },
    });
    const chunks = await textSplitter.splitText(text);

    expect(chunks.length).toBeGreaterThan(1);
    expect(chunks[0]).toContain("(1) Første avsnitt er kort.");
    expect(chunks[1]).toContain("(1) Første avsnitt er kort.");
    expect(chunks[1]).toContain("(2) Andre avsnitt er også kort.");
  });

  test("splits long Lovdata paragraphs on sentence boundaries first", async () => {
    const textSplitter = new TextSplitter({
      chunkSize: 90,
      chunkOverlap: 0,
      documentMetadata: {
        corpus: "HRA",
      },
    });

    const chunks = await textSplitter.splitText(
      "Tittel\n\nDette er første setning. Dette er andre setning. Dette er tredje setning som også er ganske lang. Dette er fjerde setning."
    );

    expect(chunks.length).toBeGreaterThan(1);
    expect(chunks[0].endsWith(".")).toBe(true);
    expect(chunks.every((chunk) => chunk.length <= 90)).toBe(true);
  });
});
