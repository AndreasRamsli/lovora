const prisma = require("../utils/prisma");

const INTEGER_FIELDS = [
  "manifestRecordCount",
  "documentCount",
  "sectionCount",
  "chunkSize",
  "chunkOverlap",
];

const DATE_FIELDS = ["uploadedAt", "activatedAt"];

function normalizeInteger(value, fallback = null) {
  if (value === null || value === undefined || value === "") return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
}

function normalizeDate(value) {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function serializeEvaluationSummary(value) {
  if (value === undefined) return undefined;
  if (value === null) return null;
  if (typeof value === "string") return value;

  try {
    return JSON.stringify(value);
  } catch {
    return null;
  }
}

function parseEvaluationSummary(value) {
  if (!value) return null;
  if (typeof value !== "string") return value;

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function normalizePayload(payload = {}) {
  const data = { ...payload };

  for (const field of INTEGER_FIELDS) {
    if (Object.prototype.hasOwnProperty.call(data, field)) {
      data[field] = normalizeInteger(data[field]);
    }
  }

  for (const field of DATE_FIELDS) {
    if (Object.prototype.hasOwnProperty.call(data, field)) {
      data[field] = normalizeDate(data[field]);
    }
  }

  if (Object.prototype.hasOwnProperty.call(data, "evaluationSummary")) {
    data.evaluationSummary = serializeEvaluationSummary(data.evaluationSummary);
  }

  if (data.status === "active" && !data.activatedAt) {
    data.activatedAt = new Date();
  }

  return data;
}

function hydrateRelease(release = null) {
  if (!release) return null;
  return {
    ...release,
    evaluationSummary: parseEvaluationSummary(release.evaluationSummary),
  };
}

const CorpusRelease = {
  statuses: {
    pending: "pending",
    uploaded: "uploaded",
    active: "active",
    archived: "archived",
    failed: "failed",
  },

  create: async function (data = {}) {
    const release = await prisma.corpus_releases.create({
      data: normalizePayload(data),
    });
    return hydrateRelease(release);
  },

  get: async function (clause = {}) {
    const release = await prisma.corpus_releases.findFirst({
      where: clause,
    });
    return hydrateRelease(release);
  },

  getCurrent: async function (workspaceSlug = "") {
    if (!workspaceSlug) return null;
    const release = await prisma.corpus_releases.findFirst({
      where: {
        workspaceSlug: String(workspaceSlug),
        status: this.statuses.active,
      },
      orderBy: [{ activatedAt: "desc" }, { lastUpdatedAt: "desc" }],
    });
    return hydrateRelease(release);
  },

  list: async function (clause = {}, limit = 25, orderBy = null) {
    const releases = await prisma.corpus_releases.findMany({
      where: clause,
      ...(limit !== null ? { take: Number(limit) } : {}),
      ...(orderBy !== null
        ? { orderBy }
        : { orderBy: [{ createdAt: "desc" }, { id: "desc" }] }),
    });
    return releases.map(hydrateRelease);
  },

  update: async function (id = null, data = {}) {
    if (!id) return null;
    const release = await prisma.corpus_releases.update({
      where: { id: Number(id) },
      data: normalizePayload(data),
    });
    return hydrateRelease(release);
  },
};

module.exports = { CorpusRelease };
