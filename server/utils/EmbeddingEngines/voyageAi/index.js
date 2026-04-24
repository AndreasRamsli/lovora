class VoyageAiEmbedder {
  constructor() {
    if (!process.env.VOYAGEAI_API_KEY)
      throw new Error("No Voyage AI API key was set.");

    this.model = process.env.EMBEDDING_MODEL_PREF || "voyage-3-lite";
    this.apiKey = process.env.VOYAGEAI_API_KEY;
    this.endpoint = "https://api.voyageai.com/v1/embeddings";
    // Voyage AI caps embedding batches at 128 inputs and recommends using
    // larger batches to avoid RPM limits.
    this.batchSize = 128;
    this.embeddingMaxChunkLength = this.#getMaxEmbeddingLength();
  }

  // https://docs.voyageai.com/docs/embeddings
  #getMaxEmbeddingLength() {
    switch (this.model) {
      case "voyage-finance-2":
      case "voyage-multilingual-2":
      case "voyage-3":
      case "voyage-3-lite":
      case "voyage-3-large":
      case "voyage-code-3":
        return 32_000;
      case "voyage-large-2-instruct":
      case "voyage-law-2":
      case "voyage-code-2":
      case "voyage-large-2":
        return 16_000;
      case "voyage-2":
        return 4_000;
      default:
        return 4_000;
    }
  }

  async embedTextInput(textInput) {
    const result = await this.#embed(
      Array.isArray(textInput) ? textInput : [textInput],
      "query"
    );

    // If given an array return the native Array[Array] format since that should be the outcome.
    // But if given a single string, we need to flatten it so that we have a 1D array.
    return (Array.isArray(textInput) ? result : result.flat?.() ?? result) || [];
  }

  async embedChunks(textChunks = []) {
    try {
      return await this.#embed(textChunks, "document");
    } catch (error) {
      console.error("Voyage AI Failed to embed:", error);
      throw error;
    }
  }

  async #embed(textInputs = [], inputType = "document") {
    if (!Array.isArray(textInputs) || textInputs.length === 0) return [];

    const embeddings = [];
    for (let index = 0; index < textInputs.length; index += this.batchSize) {
      const batch = textInputs.slice(index, index + this.batchSize);
      embeddings.push(...(await this.#embedBatch(batch, inputType)));
    }
    return embeddings;
  }

  async #embedBatch(textInputs = [], inputType = "document") {
    const response = await fetch(this.endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: textInputs,
        model: this.model,
        input_type: inputType,
      }),
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = payload?.detail || payload?.message || response.statusText;
      const message = String(error);
      if (response.status === 429 || message.toLowerCase().includes("rate limit"))
        throw new Error("Voyage AI failed to embed: Rate limit reached");
      throw new Error(`Voyage AI failed to embed: ${message}`);
    }

    return (payload?.data || [])
      .sort((a, b) => (a.index ?? 0) - (b.index ?? 0))
      .map((item) => item.embedding);
  }
}

module.exports = {
  VoyageAiEmbedder,
};
