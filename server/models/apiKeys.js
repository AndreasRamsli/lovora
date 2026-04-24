const prisma = require("../utils/prisma");
const { safeJsonParse } = require("../utils/http");

const DEFAULT_SCOPES = {
  management: [
    "management:metadata:read",
    "management:metadata:write",
    "management:moderation:write",
    "management:users:read",
    "management:users:write",
  ],
  workspace_service: [
    "workspace:api_sessions:read",
    "workspace:api_sessions:write",
  ],
};

const VALID_PRINCIPAL_TYPES = Object.keys(DEFAULT_SCOPES);

function parseScopes(value = null, principalType = "management") {
  const fallback = DEFAULT_SCOPES[principalType] || DEFAULT_SCOPES.management;
  if (Array.isArray(value)) return value.map(String);

  const parsed = safeJsonParse(value, fallback);
  return Array.isArray(parsed) ? parsed.map(String) : [...fallback];
}

function normalizePrincipalType(value = null) {
  const principalType = String(value || "management");
  return VALID_PRINCIPAL_TYPES.includes(principalType) ? principalType : null;
}

function normalizeInteger(value = null) {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isInteger(parsed) ? parsed : null;
}

function resolveBindingState(principalType = "management", workspace = null) {
  if (principalType === "workspace_service") {
    const bindingValid = workspace !== null;
    return {
      bindingStatus: bindingValid ? "active" : "orphaned",
      bindingValid,
    };
  }

  return {
    bindingStatus: "active",
    bindingValid: true,
  };
}

async function hydrateApiKeys(apiKeys = [], { includeUsers = false } = {}) {
  if (apiKeys.length === 0) return [];

  const workspaceIds = [
    ...new Set(
      apiKeys
        .map((apiKey) => normalizeInteger(apiKey.workspaceId))
        .filter((workspaceId) => workspaceId !== null)
    ),
  ];
  const userIds = includeUsers
    ? [
        ...new Set(
          apiKeys
            .map((apiKey) => normalizeInteger(apiKey.createdBy))
            .filter((userId) => userId !== null)
        ),
      ]
    : [];

  const [workspaces, users] = await Promise.all([
    workspaceIds.length
      ? prisma.workspaces.findMany({
          where: { id: { in: workspaceIds } },
          select: { id: true, name: true, slug: true },
        })
      : [],
    userIds.length
      ? prisma.users.findMany({
          where: { id: { in: userIds } },
          select: { id: true, username: true, role: true },
        })
      : [],
  ]);

  const workspaceMap = new Map(
    workspaces.map((workspace) => [workspace.id, workspace])
  );
  const userMap = new Map(users.map((user) => [user.id, user]));

  return apiKeys.map((apiKey) => {
    const principalType =
      normalizePrincipalType(apiKey.principalType) || "management";
    const workspaceId = normalizeInteger(apiKey.workspaceId);
    const createdByUserId = normalizeInteger(apiKey.createdBy);
    const workspace =
      workspaceId !== null ? workspaceMap.get(workspaceId) || null : null;
    const bindingState = resolveBindingState(principalType, workspace);

    return {
      ...apiKey,
      principalType,
      workspaceId,
      scopes: parseScopes(apiKey.scopes, principalType),
      workspace,
      ...bindingState,
      ...(includeUsers
        ? {
            createdBy:
              createdByUserId !== null
                ? userMap.get(createdByUserId) || null
                : null,
          }
        : {}),
    };
  });
}

function sanitizeApiKeyForList(apiKey = null) {
  if (!apiKey) return apiKey;
  const { secret: _secret, ...sanitizedApiKey } = apiKey;
  return sanitizedApiKey;
}

const ApiKey = {
  tablename: "api_keys",
  writable: [],

  makeSecret: () => {
    const uuidAPIKey = require("uuid-apikey");
    return uuidAPIKey.create().apiKey;
  },

  create: async function (createdByUserId = null, attributes = {}) {
    try {
      if (
        createdByUserId !== null &&
        typeof createdByUserId === "object" &&
        !Array.isArray(createdByUserId)
      ) {
        attributes = createdByUserId;
        createdByUserId = null;
      }

      const principalType = normalizePrincipalType(attributes?.principalType);
      if (!principalType) {
        return { apiKey: null, error: "Invalid api key principal type." };
      }

      const workspaceId =
        principalType === "workspace_service"
          ? normalizeInteger(attributes?.workspaceId)
          : null;
      if (principalType === "workspace_service" && workspaceId === null) {
        return {
          apiKey: null,
          error: "Workspace service keys require a valid workspaceId.",
        };
      }

      const workspace =
        workspaceId !== null
          ? await prisma.workspaces.findUnique({
              where: { id: workspaceId },
              select: { id: true, name: true, slug: true },
            })
          : null;
      if (workspaceId !== null && !workspace) {
        return { apiKey: null, error: "Workspace not found for api key." };
      }

      const apiKey = await prisma.api_keys.create({
        data: {
          secret: this.makeSecret(),
          createdBy: normalizeInteger(createdByUserId),
          name: attributes?.name ? String(attributes.name) : null,
          principalType,
          workspaceId,
          scopes: JSON.stringify(DEFAULT_SCOPES[principalType]),
        },
      });

      const [hydratedApiKey] = await hydrateApiKeys([apiKey], {
        includeUsers: true,
      });
      if (workspace) hydratedApiKey.workspace = workspace;
      return { apiKey: hydratedApiKey, error: null };
    } catch (error) {
      console.error("FAILED TO CREATE API KEY.", error.message);
      return { apiKey: null, error: error.message };
    }
  },

  get: async function (clause = {}) {
    try {
      const apiKey = await prisma.api_keys.findFirst({ where: clause });
      if (!apiKey) return null;
      const [hydratedApiKey] = await hydrateApiKeys([apiKey]);
      if (
        hydratedApiKey?.principalType === "workspace_service" &&
        !hydratedApiKey.workspace
      ) {
        return null;
      }
      return hydratedApiKey || null;
    } catch (error) {
      console.error("FAILED TO GET API KEY.", error.message);
      return null;
    }
  },

  count: async function (clause = {}) {
    try {
      const count = await prisma.api_keys.count({ where: clause });
      return count;
    } catch (error) {
      console.error("FAILED TO COUNT API KEYS.", error.message);
      return 0;
    }
  },

  delete: async function (clause = {}) {
    try {
      await prisma.api_keys.deleteMany({ where: clause });
      return true;
    } catch (error) {
      console.error("FAILED TO DELETE API KEY.", error.message);
      return false;
    }
  },

  where: async function (clause = {}, limit) {
    try {
      const apiKeys = await prisma.api_keys.findMany({
        where: clause,
        take: limit,
      });
      return (await hydrateApiKeys(apiKeys)).map(sanitizeApiKeyForList);
    } catch (error) {
      console.error("FAILED TO GET API KEYS.", error.message);
      return [];
    }
  },

  whereWithUser: async function (clause = {}, limit) {
    try {
      const apiKeys = await prisma.api_keys.findMany({
        where: clause,
        take: limit,
      });
      return (await hydrateApiKeys(apiKeys, { includeUsers: true })).map(
        sanitizeApiKeyForList
      );
    } catch (error) {
      console.error("FAILED TO GET API KEYS WITH USER.", error.message);
      return [];
    }
  },
};

module.exports = { ApiKey };
