/* eslint-env jest */
const mockEmbedDocuments = jest.fn();
const mockEmbedQuery = jest.fn();
const mockVoyageEmbeddings = jest.fn();

jest.mock("@langchain/community/embeddings/voyage", () => ({
  VoyageEmbeddings: mockVoyageEmbeddings,
}), { virtual: true });

describe("VoyageAiEmbedder", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();

    process.env.VOYAGEAI_API_KEY = "test-voyage-key";
    process.env.EMBEDDING_MODEL_PREF = "voyage-law-2";

    mockVoyageEmbeddings.mockImplementation((config) => ({
      config,
      embedDocuments: (...args) => mockEmbedDocuments(config, ...args),
      embedQuery: (...args) => mockEmbedQuery(config, ...args),
    }));
  });

  afterEach(() => {
    delete process.env.VOYAGEAI_API_KEY;
    delete process.env.EMBEDDING_MODEL_PREF;
  });

  test("uses document input type for stored chunk embeddings", async () => {
    mockEmbedDocuments.mockResolvedValue([[0.1, 0.2]]);

    const {
      VoyageAiEmbedder,
    } = require("../../../../../server/utils/EmbeddingEngines/voyageAi");
    const embedder = new VoyageAiEmbedder();

    await embedder.embedChunks(["section text"]);

    expect(mockEmbedDocuments).toHaveBeenCalledWith(
      expect.objectContaining({
        inputType: "document",
        modelName: "voyage-law-2",
      }),
      ["section text"]
    );
  });

  test("uses query input type for search embeddings", async () => {
    mockEmbedQuery.mockResolvedValue([0.3, 0.4]);

    const {
      VoyageAiEmbedder,
    } = require("../../../../../server/utils/EmbeddingEngines/voyageAi");
    const embedder = new VoyageAiEmbedder();

    await embedder.embedTextInput("find the relevant statute");

    expect(mockEmbedQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        inputType: "query",
        modelName: "voyage-law-2",
      }),
      "find the relevant statute"
    );
  });
});
