const prisma = require("../prisma");

const MODERATION_SCHEMA_MIGRATION = "20260318120000_conversation_flags_init";
const MODERATION_SCHEMA_ERROR_CODE = "conversation_metadata_unavailable";
const DATABASE_UNAVAILABLE_ERROR_CODE = "database_unavailable";
const CACHE_TTL_MS = Number(
  process.env.MODERATION_SCHEMA_CACHE_TTL_MS || 30000
);
const LOG_TTL_MS = Number(process.env.MODERATION_SCHEMA_LOG_TTL_MS || 60000);

const readinessCache = {
  expiresAt: 0,
  value: null,
  promise: null,
};

const logCache = new Map();

function buildModerationSchemaMessage() {
  return `Conversation oversight is unavailable until Prisma migration ${MODERATION_SCHEMA_MIGRATION} is applied.`;
}

function buildDatabaseUnavailableMessage() {
  return "Conversation oversight readiness check failed because the database is unavailable.";
}

function isMissingModerationSchemaError(error = null) {
  const message = String(error?.message || "");
  return (
    error?.code === "P2021" ||
    (message.includes("conversation_flags") &&
      /(no such table|does not exist|unknown table|undefined table|relation .* does not exist)/i.test(
        message
      ))
  );
}

function isDatabaseUnavailableError(error = null) {
  const message = String(error?.message || "");
  return (
    ["P1000", "P1001", "P1002", "P1008", "P1017", "P2024", "P2037"].includes(
      error?.code
    ) ||
    /(database is unavailable|database is locked|unable to open database file|connection.*refused|cannot reach database|timed out|socket hang up|connection terminated|connection lost|server has closed the connection)/i.test(
      message
    )
  );
}

function logOnce(key, level, message, metadata = {}) {
  const now = Date.now();
  const previousLogAt = logCache.get(key) || 0;
  if (previousLogAt > now - LOG_TTL_MS) return;
  logCache.set(key, now);

  const logger =
    level === "error"
      ? console.error
      : level === "warn"
        ? console.warn
        : console.log;
  logger(`[ModerationSchema] ${message}`, metadata);
}

function moderationSchemaErrorResponse() {
  return {
    success: false,
    code: MODERATION_SCHEMA_ERROR_CODE,
    error: buildModerationSchemaMessage(),
  };
}

function databaseUnavailableResponse() {
  return {
    success: false,
    code: DATABASE_UNAVAILABLE_ERROR_CODE,
    error: buildDatabaseUnavailableMessage(),
  };
}

function moderationReadinessPayload(readiness = {}) {
  return {
    success: readiness.ready,
    ready: readiness.ready,
    checks: {
      databaseConnected: readiness.databaseConnected,
      moderationSchemaAvailable: readiness.moderationSchemaAvailable,
    },
    code: readiness.code,
    error: readiness.error,
    migration: readiness.migration,
  };
}

function invalidateModerationReadinessCache() {
  readinessCache.expiresAt = 0;
  readinessCache.value = null;
  readinessCache.promise = null;
}

async function computeReadiness() {
  try {
    await prisma.$queryRawUnsafe("SELECT 1");
  } catch (error) {
    return {
      ready: false,
      databaseConnected: false,
      moderationSchemaAvailable: false,
      code: DATABASE_UNAVAILABLE_ERROR_CODE,
      error: buildDatabaseUnavailableMessage(),
      migration: MODERATION_SCHEMA_MIGRATION,
      cause: error?.message || "database unavailable",
    };
  }

  try {
    await prisma.conversation_flags.count({ where: {} });
    return {
      ready: true,
      databaseConnected: true,
      moderationSchemaAvailable: true,
      code: null,
      error: null,
      migration: MODERATION_SCHEMA_MIGRATION,
      cause: null,
    };
  } catch (error) {
    if (isMissingModerationSchemaError(error)) {
      return {
        ready: false,
        databaseConnected: true,
        moderationSchemaAvailable: false,
        code: MODERATION_SCHEMA_ERROR_CODE,
        error: buildModerationSchemaMessage(),
        migration: MODERATION_SCHEMA_MIGRATION,
        cause: error?.message || "missing moderation schema",
      };
    }

    return {
      ready: false,
      databaseConnected: true,
      moderationSchemaAvailable: false,
      code: DATABASE_UNAVAILABLE_ERROR_CODE,
      error: buildDatabaseUnavailableMessage(),
      migration: MODERATION_SCHEMA_MIGRATION,
      cause: error?.message || "unknown readiness failure",
    };
  }
}

async function moderationReadiness({ force = false } = {}) {
  const now = Date.now();
  if (!force && readinessCache.value && readinessCache.expiresAt > now) {
    return readinessCache.value;
  }

  if (!force && readinessCache.promise) {
    return readinessCache.promise;
  }

  readinessCache.promise = computeReadiness()
    .then((value) => {
      readinessCache.value = value;
      readinessCache.expiresAt = Date.now() + CACHE_TTL_MS;
      return value;
    })
    .finally(() => {
      readinessCache.promise = null;
    });

  return readinessCache.promise;
}

async function sendReadinessResponse(response, { force = false } = {}) {
  const readiness = await moderationReadiness({ force });
  response
    .status(readiness.ready ? 200 : 503)
    .json(moderationReadinessPayload(readiness));
  return readiness;
}

async function guardModerationSchema(response, context = "unknown") {
  const readiness = await moderationReadiness();
  if (readiness.ready) return { ok: true, readiness };

  if (readiness.code === MODERATION_SCHEMA_ERROR_CODE) {
    logOnce(
      `schema:${context}:${readiness.code}`,
      "error",
      "Conversation oversight request blocked because moderation schema is unavailable.",
      {
        context,
        migration: MODERATION_SCHEMA_MIGRATION,
        cause: readiness.cause,
      }
    );
    response.status(503).json(moderationSchemaErrorResponse());
    return { ok: false, readiness };
  }

  logOnce(
    `schema:${context}:${readiness.code}`,
    "error",
    "Conversation oversight request blocked because database readiness failed.",
    {
      context,
      cause: readiness.cause,
    }
  );
  response.status(503).json(databaseUnavailableResponse());
  return { ok: false, readiness };
}

function handleModerationSchemaRouteError(
  response,
  error,
  context = "unknown"
) {
  if (isMissingModerationSchemaError(error)) {
    invalidateModerationReadinessCache();
    logOnce(
      `schema:${context}:route-missing`,
      "error",
      "Conversation oversight route failed because moderation schema is unavailable.",
      {
        context,
        migration: MODERATION_SCHEMA_MIGRATION,
        cause: error?.message || "missing moderation schema",
      }
    );
    response.status(503).json(moderationSchemaErrorResponse());
    return true;
  }

  if (isDatabaseUnavailableError(error)) {
    invalidateModerationReadinessCache();
    logOnce(
      `schema:${context}:route-db`,
      "error",
      "Conversation oversight route failed because the database is unavailable.",
      {
        context,
        cause: error?.message || "database unavailable",
      }
    );
    response.status(503).json(databaseUnavailableResponse());
    return true;
  }

  return false;
}

async function logStartupReadiness() {
  const readiness = await moderationReadiness({ force: true });

  if (readiness.databaseConnected) {
    console.log("[Startup] Database connected");
  } else {
    console.error("[Startup] Database connection unavailable", {
      code: readiness.code,
      cause: readiness.cause,
    });
    return readiness;
  }

  if (readiness.moderationSchemaAvailable) {
    console.log("[Startup] Moderation schema ready");
  } else {
    console.error("[Startup] Moderation schema unavailable", {
      code: readiness.code,
      migration: readiness.migration,
      cause: readiness.cause,
    });
  }

  return readiness;
}

module.exports = {
  MODERATION_SCHEMA_ERROR_CODE,
  MODERATION_SCHEMA_MIGRATION,
  DATABASE_UNAVAILABLE_ERROR_CODE,
  moderationReadiness,
  moderationReadinessPayload,
  moderationSchemaErrorResponse,
  databaseUnavailableResponse,
  invalidateModerationReadinessCache,
  guardModerationSchema,
  handleModerationSchemaRouteError,
  isDatabaseUnavailableError,
  isMissingModerationSchemaError,
  logStartupReadiness,
  sendReadinessResponse,
};
