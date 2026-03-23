const { v4: uuidv4 } = require("uuid");

function normalizeSourceIdentity(sourceIdentity = {}) {
  return {
    title: sourceIdentity?.title || null,
    published: sourceIdentity?.published || null,
    chunkSource: sourceIdentity?.chunkSource || null,
    url: sourceIdentity?.url || null,
    location: sourceIdentity?.location || null,
  };
}

function sourceIdentityScore(sourceIdentity = {}, candidate = {}) {
  const identity = normalizeSourceIdentity(sourceIdentity);
  const metadata = normalizeSourceIdentity(candidate);

  if (identity.location && metadata.location === identity.location) return 5;
  if (identity.chunkSource && metadata.chunkSource === identity.chunkSource)
    return 4;
  if (identity.url && metadata.url === identity.url) return 3;
  if (
    identity.title &&
    identity.published &&
    metadata.title === identity.title &&
    metadata.published === identity.published
  )
    return 2;
  return 0;
}

function sourceIdentifier(sourceDocument = {}) {
  const identity = normalizeSourceIdentity(sourceDocument);
  if (identity.location) return `location:${identity.location}`;
  if (identity.chunkSource) return `chunkSource:${identity.chunkSource}`;
  if (identity.url) return `url:${identity.url}`;
  if (identity.title && identity.published) {
    return `title:${identity.title}-timestamp:${identity.published}`;
  }
  return uuidv4();
}

module.exports = {
  normalizeSourceIdentity,
  sourceIdentityScore,
  sourceIdentifier,
};
