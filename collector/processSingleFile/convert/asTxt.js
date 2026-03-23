const { v4 } = require("uuid");
const fs = require("fs");
const { tokenizeString } = require("../../utils/tokenizer");
const {
  createdDate,
  trashFile,
  writeToServerDocuments,
} = require("../../utils/files");
const { default: slugify } = require("slugify");

function resolveUrl(fullFilePath = "", metadata = {}) {
  if (typeof metadata?.url === "string" && metadata.url.trim().length > 0) {
    return metadata.url.trim();
  }
  return "file://" + fullFilePath;
}

function resolvePublished(fullFilePath = "", metadata = {}) {
  const published = metadata?.published;
  if (published === null || published === undefined || published === "") {
    return createdDate(fullFilePath);
  }

  const timestamp = Number(published);
  if (!Number.isNaN(timestamp)) return new Date(timestamp).toLocaleString();
  return String(published);
}

function additionalMetadata(metadata = {}) {
  const reserved = new Set([
    "url",
    "title",
    "docAuthor",
    "description",
    "docSource",
    "chunkSource",
    "published",
  ]);
  return Object.fromEntries(
    Object.entries(metadata).filter(([key, value]) => {
      if (reserved.has(key)) return false;
      return ["string", "number", "boolean"].includes(typeof value);
    })
  );
}

async function asTxt({
  fullFilePath = "",
  filename = "",
  options = {},
  metadata = {},
}) {
  let content = "";
  try {
    content = fs.readFileSync(fullFilePath, "utf8");
  } catch (err) {
    console.error("Could not read file!", err);
  }

  if (!content?.length) {
    console.error(`Resulting text content was empty for ${filename}.`);
    trashFile(fullFilePath);
    return {
      success: false,
      reason: `No text content found in ${filename}.`,
      documents: [],
    };
  }

  console.log(`-- Working ${filename} --`);
  const data = {
    id: v4(),
    url: resolveUrl(fullFilePath, metadata),
    title: metadata.title || filename,
    docAuthor: metadata.docAuthor || "Unknown",
    description: metadata.description || "Unknown",
    docSource: metadata.docSource || "a text file uploaded by the user.",
    chunkSource: metadata.chunkSource || "",
    published: resolvePublished(fullFilePath, metadata),
    wordCount: content.split(" ").length,
    pageContent: content,
    token_count_estimate: tokenizeString(content),
    ...additionalMetadata(metadata),
  };

  const document = writeToServerDocuments({
    data,
    filename: `${slugify(filename)}-${data.id}`,
    options: { parseOnly: options.parseOnly },
  });
  trashFile(fullFilePath);
  console.log(`[SUCCESS]: ${filename} converted & ready for embedding.\n`);
  return { success: true, reason: null, documents: [document] };
}

module.exports = asTxt;
