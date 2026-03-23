/**
 * @typedef {object} DocumentMetadata
 * @property {string} id - eg; "123e4567-e89b-12d3-a456-426614174000"
 * @property {string} url - eg; "file://example.com/index.html"
 * @property {string} title - eg; "example.com/index.html"
 * @property {string} docAuthor - eg; "no author found"
 * @property {string} description - eg; "No description found."
 * @property {string} docSource - eg; "URL link uploaded by the user."
 * @property {string} chunkSource - eg; link://https://example.com
 * @property {string} published - ISO 8601 date string
 * @property {number} wordCount - Number of words in the document
 * @property {string} pageContent - The raw text content of the document
 * @property {number} token_count_estimate - Number of tokens in the document
 */

function isNullOrNaN(value) {
  if (value === null) return true;
  return isNaN(value);
}

class TextSplitter {
  #splitter;

  /**
   * Creates a new TextSplitter instance.
   * @param {Object} config
   * @param {string} [config.chunkPrefix = ""] - Prefix to be added to the start of each chunk.
   * @param {number} [config.chunkSize = 1000] - The size of each chunk.
   * @param {number} [config.chunkOverlap = 20] - The overlap between chunks.
   * @param {Object} [config.chunkHeaderMeta = null] - Metadata to be added to the start of each chunk - will come after the prefix.
   */
  constructor(config = {}) {
    this.config = config;
    this.#splitter = this.#setSplitter(config);
  }

  log(text, ...args) {
    console.log(`\x1b[35m[TextSplitter]\x1b[0m ${text}`, ...args);
  }

  /**
   *  Does a quick check to determine the text chunk length limit.
   * Embedder models have hard-set limits that cannot be exceeded, just like an LLM context
   * so here we want to allow override of the default 1000, but up to the models maximum, which is
   * sometimes user defined.
   */
  static determineMaxChunkSize(preferred = null, embedderLimit = 1000) {
    const prefValue = isNullOrNaN(preferred)
      ? Number(embedderLimit)
      : Number(preferred);
    const limit = Number(embedderLimit);
    if (prefValue > limit)
      console.log(
        `\x1b[43m[WARN]\x1b[0m Text splitter chunk length of ${prefValue} exceeds embedder model max of ${embedderLimit}. Will use ${embedderLimit}.`
      );
    return prefValue > limit ? limit : prefValue;
  }

  static determineLegalChunkSize(embedderLimit = 1500) {
    const limit = Number(embedderLimit);
    if (isNullOrNaN(limit)) return 1500;
    return Math.min(1500, limit);
  }

  static determineChunkSize(metadata = {}, preferred = null, embedderLimit = 1000) {
    return this.shouldUseLegalParagraphMode(metadata)
      ? this.determineLegalChunkSize(embedderLimit)
      : this.determineMaxChunkSize(preferred, embedderLimit);
  }

  /**
   *  Creates a string of metadata to be prepended to each chunk.
   * @param {DocumentMetadata} metadata - Metadata to be prepended to each chunk.
   * @returns {{[key: ('title' | 'published' | 'source')]: string}} Object of metadata that will be prepended to each chunk.
   */
  static buildHeaderMeta(metadata = {}) {
    if (!metadata || Object.keys(metadata).length === 0) return null;
    const PLUCK_MAP = {
      title: {
        as: "sourceDocument",
        pluck: (metadata) => {
          return metadata?.title || null;
        },
      },
      published: {
        as: "published",
        pluck: (metadata) => {
          return metadata?.published || null;
        },
      },
      corpus: {
        as: "corpus",
        pluck: (metadata) => {
          return metadata?.corpus || null;
        },
      },
      court: {
        as: "court",
        pluck: (metadata) => {
          return metadata?.court || null;
        },
      },
      documentType: {
        as: "documentType",
        pluck: (metadata) => {
          return metadata?.documentType || null;
        },
      },
      chunkSource: {
        as: "source",
        pluck: (metadata) => {
          const validPrefixes = ["link://", "youtube://"];
          // If the chunkSource is a link or youtube link, we can add the URL
          // as its source in the metadata so the LLM can use it for context.
          // eg prompt: Where did you get this information? -> answer: "from https://example.com"
          if (
            !metadata?.chunkSource || // Exists
            !metadata?.chunkSource.length || // Is not empty
            typeof metadata.chunkSource !== "string" || // Is a string
            !validPrefixes.some(
              (prefix) => metadata.chunkSource.startsWith(prefix) // Has a valid prefix we respect
            )
          )
            return null;

          // We know a prefix is present, so we can split on it and return the rest.
          // If nothing is found, return null and it will not be added to the metadata.
          let source = null;
          for (const prefix of validPrefixes) {
            source = metadata.chunkSource.split(prefix)?.[1] || null;
            if (source) break;
          }

          return source;
        },
      },
    };

    const pluckedData = {};
    Object.entries(PLUCK_MAP).forEach(([key, value]) => {
      if (!(key in metadata)) return; // Skip if the metadata key is not present.
      const pluckedValue = value.pluck(metadata);
      if (!pluckedValue) return; // Skip if the plucked value is null/empty.
      pluckedData[value.as] = pluckedValue;
    });

    return pluckedData;
  }

  /**
   * Apply the chunk prefix to the text if it is present.
   * @param {string} text - The text to apply the prefix to.
   * @returns {string} The text with the embedder model prefix applied.
   */
  #applyPrefix(text = "") {
    if (!this.config.chunkPrefix) return text;
    return `${this.config.chunkPrefix}${text}`;
  }

  /**
   * Creates a string of metadata to be prepended to each chunk.
   * Will additionally prepend a prefix to the text if it was provided (requirement for some embedders).
   * @returns {string} The text with the embedder model prefix applied.
   */
  stringifyHeader() {
    let content = "";
    if (!this.config.chunkHeaderMeta) return this.#applyPrefix(content);
    Object.entries(this.config.chunkHeaderMeta).map(([key, value]) => {
      if (!key || !value) return;
      content += `${key}: ${value}\n`;
    });

    if (!content) return this.#applyPrefix(content);
    return this.#applyPrefix(
      `<document_metadata>\n${content}</document_metadata>\n\n`
    );
  }

  /**
   * Sets the splitter to use a defined config passes to other subclasses.
   * @param {Object} config
   * @param {string} [config.chunkPrefix = ""] - Prefix to be added to the start of each chunk.
   * @param {number} [config.chunkSize = 1000] - The size of each chunk.
   * @param {number} [config.chunkOverlap = 20] - The overlap between chunks.
   */
  #setSplitter(config = {}) {
    if (TextSplitter.shouldUseLegalParagraphMode(config?.documentMetadata)) {
      return new LegalParagraphSplitter({
        chunkSize: isNaN(config?.chunkSize) ? 1_500 : Number(config?.chunkSize),
        chunkHeader: this.stringifyHeader(),
      });
    }

    return new RecursiveSplitter({
      chunkSize: isNaN(config?.chunkSize) ? 1_000 : Number(config?.chunkSize),
      chunkOverlap: isNaN(config?.chunkOverlap)
        ? 20
        : Number(config?.chunkOverlap),
      chunkHeader: this.stringifyHeader(),
    });
  }

  static shouldUseLegalParagraphMode(metadata = {}) {
    const url = String(metadata?.url || "");
    const chunkSource = String(metadata?.chunkSource || "");
    const docSource = String(metadata?.docSource || "");
    const corpus = String(metadata?.corpus || "").toUpperCase();

    return (
      docSource === "Lovdata" ||
      url.includes("lovdata.no/") ||
      chunkSource.includes("lovdata.no/") ||
      ["HRA", "EMDN", "LRA", "TRA", "JSR"].includes(corpus)
    );
  }

  async splitText(documentText) {
    return this.#splitter._splitText(documentText);
  }
}

// Wrapper for Langchain default RecursiveCharacterTextSplitter class.
class RecursiveSplitter {
  constructor({ chunkSize, chunkOverlap, chunkHeader = null }) {
    const {
      RecursiveCharacterTextSplitter,
    } = require("@langchain/textsplitters");
    this.log(`Will split with`, {
      chunkSize,
      chunkOverlap,
      chunkHeader: chunkHeader ? `${chunkHeader?.slice(0, 50)}...` : null,
    });
    this.chunkHeader = chunkHeader;
    this.engine = new RecursiveCharacterTextSplitter({
      chunkSize,
      chunkOverlap,
    });
  }

  log(text, ...args) {
    console.log(`\x1b[35m[RecursiveSplitter]\x1b[0m ${text}`, ...args);
  }

  async _splitText(documentText) {
    if (!this.chunkHeader) return this.engine.splitText(documentText);
    const strings = await this.engine.splitText(documentText);
    const documents = await this.engine.createDocuments(strings, [], {
      chunkHeader: this.chunkHeader,
    });
    return documents
      .filter((doc) => !!doc.pageContent)
      .map((doc) => doc.pageContent);
  }
}

class LegalParagraphSplitter {
  constructor({ chunkSize, chunkHeader = null }) {
    this.chunkSize = chunkSize;
    this.chunkHeader = chunkHeader;
    this.log(`Will split legal text with`, {
      chunkSize,
      chunkHeader: chunkHeader ? `${chunkHeader?.slice(0, 50)}...` : null,
    });
  }

  log(text, ...args) {
    console.log(`\x1b[35m[LegalParagraphSplitter]\x1b[0m ${text}`, ...args);
  }

  applyHeader(text = "") {
    if (!this.chunkHeader) return text;
    return `${this.chunkHeader}${text}`;
  }

  splitIntoParagraphs(documentText = "") {
    return documentText
      .replace(/\r\n/g, "\n")
      .split(/\n{2,}/)
      .map((block) => block.trim())
      .filter(Boolean);
  }

  splitBySentence(paragraph = "") {
    const sentenceSplit = paragraph
      .split(/(?<=[.!?])\s+(?=[A-ZÆØÅ0-9(«"'])/u)
      .map((item) => item.trim())
      .filter(Boolean);
    if (sentenceSplit.length <= 1) return [paragraph];

    const chunks = [];
    let current = "";

    for (const sentence of sentenceSplit) {
      const candidate = current ? `${current} ${sentence}` : sentence;
      if (candidate.length <= this.chunkSize) {
        current = candidate;
        continue;
      }

      if (current) chunks.push(current);
      if (sentence.length <= this.chunkSize) {
        current = sentence;
        continue;
      }

      const hardSplit = this.hardSplit(sentence);
      chunks.push(...hardSplit.slice(0, -1));
      current = hardSplit[hardSplit.length - 1];
    }

    if (current) chunks.push(current);
    return chunks;
  }

  hardSplit(text = "") {
    const words = text.split(/\s+/).filter(Boolean);
    if (words.length === 0) return [];

    const chunks = [];
    let current = "";
    for (const word of words) {
      const candidate = current ? `${current} ${word}` : word;
      if (candidate.length <= this.chunkSize) {
        current = candidate;
        continue;
      }

      if (current) chunks.push(current);
      if (word.length <= this.chunkSize) {
        current = word;
        continue;
      }

      for (let start = 0; start < word.length; start += this.chunkSize) {
        const slice = word.slice(start, start + this.chunkSize);
        if (slice.length === this.chunkSize) chunks.push(slice);
        else current = slice;
      }
    }

    if (current) chunks.push(current);
    return chunks;
  }

  normalizeParagraphs(documentText = "") {
    return this.splitIntoParagraphs(documentText).flatMap((paragraph) => {
      if (paragraph.length <= this.chunkSize) return [paragraph];

      const sentenceChunks = this.splitBySentence(paragraph);
      if (sentenceChunks.every((chunk) => chunk.length <= this.chunkSize)) {
        return sentenceChunks;
      }

      return this.hardSplit(paragraph);
    });
  }

  extractPreamble(paragraphs = []) {
    if (paragraphs.length < 2) return { preamble: "", bodyParagraphs: paragraphs };
    const [titleBlock, metadataBlock, ...bodyParagraphs] = paragraphs;
    const looksLikeTitle = !titleBlock.includes(":");
    const looksLikeMetadata = /^Kilde:\s+/m.test(metadataBlock);
    if (!looksLikeTitle || !looksLikeMetadata) {
      return { preamble: "", bodyParagraphs: paragraphs };
    }

    return {
      preamble: `${titleBlock}\n\n${metadataBlock}`.trim(),
      bodyParagraphs,
    };
  }

  async _splitText(documentText) {
    const paragraphs = this.normalizeParagraphs(documentText);
    if (paragraphs.length === 0) return [];

    const { preamble, bodyParagraphs } = this.extractPreamble(paragraphs);
    const normalizedParagraphs = bodyParagraphs.length ? bodyParagraphs : paragraphs;
    const firstChunkLimit =
      preamble && preamble.length + 2 < this.chunkSize
        ? this.chunkSize - (preamble.length + 2)
        : this.chunkSize;

    const chunks = [];
    let current = [];

    for (const paragraph of normalizedParagraphs) {
      const currentText = current.join("\n\n");
      const nextText = currentText ? `${currentText}\n\n${paragraph}` : paragraph;
      const activeLimit =
        preamble && chunks.length === 0 ? firstChunkLimit : this.chunkSize;

      if (!current.length || nextText.length <= activeLimit) {
        current.push(paragraph);
        continue;
      }

      chunks.push(current.join("\n\n"));
      const overlap = current[current.length - 1];
      current =
        overlap && `${overlap}\n\n${paragraph}`.length <= this.chunkSize
          ? [overlap, paragraph]
          : [paragraph];
    }

    if (current.length) chunks.push(current.join("\n\n"));
    return chunks.map((chunk, index) => {
      const withPreamble =
        index === 0 && preamble ? `${preamble}\n\n${chunk}` : chunk;
      return this.applyHeader(withPreamble);
    });
  }
}

module.exports.TextSplitter = TextSplitter;
