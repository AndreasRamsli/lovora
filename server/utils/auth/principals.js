const { safeJsonParse } = require("../http");

function uniqueRoles(role = null) {
  return role ? [String(role)] : [];
}

const DEFAULT_MANAGEMENT_SCOPES = [
  "management:metadata:read",
  "management:metadata:write",
  "management:moderation:write",
  "management:users:read",
  "management:users:write",
];

const DEFAULT_WORKSPACE_SERVICE_SCOPES = [
  "workspace:api_sessions:read",
  "workspace:api_sessions:write",
];

function parseScopes(value = null, fallback = []) {
  if (Array.isArray(value)) {
    return value.map(String);
  }

  const parsed = safeJsonParse(value, fallback);
  return Array.isArray(parsed) ? parsed.map(String) : fallback.map(String);
}

function parseStrictInteger(value = null) {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value === "number" && Number.isInteger(value)) return value;
  if (typeof value !== "string") return null;
  if (!/^-?\d+$/.test(value)) return null;

  const parsed = Number(value);
  return Number.isInteger(parsed) ? parsed : null;
}

function resolveSessionPrincipal(user = null) {
  if (!user?.id) return null;

  if (user.delegated || user.impersonatedBy) {
    return {
      kind: "delegated_user",
      userId: Number(user.id),
      delegatedScope: String(user.delegatedScope || user.scope || "read"),
      roles: [],
    };
  }

  return {
    kind: "user",
    userId: Number(user.id),
    roles: uniqueRoles(user.role),
  };
}

function resolveApiKeyPrincipal(apiKey = null) {
  if (!apiKey?.id) return null;
  const apiKeyId = parseStrictInteger(apiKey.id);
  if (apiKeyId === null) return null;

  const hasPrincipalType = apiKey.principalType !== null && apiKey.principalType !== undefined && apiKey.principalType !== "";
  const principalType = hasPrincipalType ? String(apiKey.principalType) : "management";
  if (hasPrincipalType && !["management", "workspace_service"].includes(principalType)) {
    return null;
  }

  const createdByUserId = parseStrictInteger(apiKey.createdBy);
  if (apiKey.createdBy !== null && apiKey.createdBy !== undefined && apiKey.createdBy !== "" && createdByUserId === null) {
    return null;
  }

  if (principalType === "workspace_service") {
    const workspaceId = parseStrictInteger(apiKey.workspaceId);
    if (workspaceId === null) return null;

    return {
      kind: "workspace_service",
      apiKeyId,
      createdByUserId,
      workspaceId,
      scopes: parseScopes(apiKey.scopes, DEFAULT_WORKSPACE_SERVICE_SCOPES),
    };
  }

  return {
    kind: "management",
    apiKeyId,
    createdByUserId,
    workspaceId: null,
    scopes: parseScopes(apiKey.scopes, DEFAULT_MANAGEMENT_SCOPES),
  };
}

function principalCan(principal = null, capability = "") {
  if (!principal || !capability) return false;
  if (!["management", "workspace_service"].includes(principal.kind)) return false;
  return Array.isArray(principal.scopes) && principal.scopes.includes(capability);
}

function isWorkspaceServicePrincipal(principal = null, workspaceId = null) {
  if (principal?.kind !== "workspace_service") return false;
  if (workspaceId === null || workspaceId === undefined) return true;
  return Number(principal.workspaceId) === Number(workspaceId);
}

function hasOversightRole(principal = null) {
  return (
    principal?.kind === "user" &&
    Array.isArray(principal.roles) &&
    principal.roles.some((role) => ["admin", "manager"].includes(role))
  );
}

function isContentPrincipal(principal = null) {
  if (principal?.kind === "user" || principal?.kind === "delegated_user") {
    return Number.isInteger(principal.userId);
  }

  return (
    principal?.kind === "workspace_service" &&
    Number.isInteger(Number(principal.workspaceId))
  );
}

function canReadChatContent(principal = null, resource = {}) {
  if (!principal || !resource) return false;

  const ownerUserId = resource?.ownerUserId ?? null;
  const workspaceId = resource?.workspaceId ?? null;
  const apiSessionId = resource?.apiSessionId ?? null;

  if (principal.kind === "user" || principal.kind === "delegated_user") {
    if (!ownerUserId || apiSessionId) return false;
    return Number(ownerUserId) === Number(principal.userId);
  }

  if (principal.kind === "workspace_service") {
    const scopes = Array.isArray(principal.scopes) ? principal.scopes : [];
    if (!apiSessionId || ownerUserId !== null) return false;
    if (Number(workspaceId) !== Number(principal.workspaceId)) return false;

    return scopes.includes("workspace:api_sessions:read");
  }

  return false;
}

function canReviewFlagMetadata(principal = null, flag = null) {
  if (!flag || flag.status !== "open") return false;
  return hasOversightRole(principal);
}

module.exports = {
  resolveSessionPrincipal,
  resolveApiKeyPrincipal,
  principalCan,
  isWorkspaceServicePrincipal,
  hasOversightRole,
  isContentPrincipal,
  canReadChatContent,
  canReviewFlagMetadata,
};
