const { principalCan } = require("./principals");

function createAuthorizationError(status = 403, message = "Forbidden") {
  const error = new Error(message);
  error.status = status;
  return error;
}

function threadWorkspaceId(thread = null) {
  if (!thread) return null;
  return thread.workspace_id ?? thread.workspaceId ?? null;
}

function threadUserId(thread = null) {
  if (!thread) return null;
  return thread.user_id ?? thread.userId ?? null;
}

function threadApiSessionId(thread = null) {
  if (!thread) return null;
  return thread.api_session_id ?? thread.apiSessionId ?? null;
}

function isWorkspaceServiceThread(thread = null) {
  return threadUserId(thread) === null;
}

function assertWorkspaceServiceAccess(
  principal = null,
  workspace = null,
  capability = "workspace:api_sessions:write"
) {
  if (principal?.kind !== "workspace_service") {
    throw createAuthorizationError(403, "API key cannot access this route.");
  }

  if (!principalCan(principal, capability)) {
    throw createAuthorizationError(403, "API key cannot access this route.");
  }

  if (
    !workspace?.id ||
    Number(principal.workspaceId) !== Number(workspace.id)
  ) {
    throw createAuthorizationError(
      403,
      "API key cannot access this workspace."
    );
  }

  return true;
}

function assertWorkspaceServiceThreadAccess(
  principal = null,
  workspace = null,
  thread = null,
  capability = "workspace:api_sessions:write"
) {
  assertWorkspaceServiceAccess(principal, workspace, capability);

  if (!thread?.id) {
    throw createAuthorizationError(404, "Thread not found.");
  }

  if (Number(threadWorkspaceId(thread)) !== Number(workspace.id)) {
    throw createAuthorizationError(404, "Thread not found.");
  }

  if (!isWorkspaceServiceThread(thread)) {
    throw createAuthorizationError(404, "Thread not found.");
  }

  if (String(threadApiSessionId(thread) || "") !== String(principal.apiKeyId)) {
    throw createAuthorizationError(404, "Thread not found.");
  }

  return true;
}

function resolveAuthorizedApiSessionId(
  principal = null,
  requestedSessionId = null
) {
  if (principal?.kind !== "workspace_service") {
    return requestedSessionId ? String(requestedSessionId) : null;
  }

  if (!principal?.apiKeyId) {
    throw createAuthorizationError(403, "API key cannot access this route.");
  }

  return String(principal.apiKeyId);
}

module.exports = {
  createAuthorizationError,
  isWorkspaceServiceThread,
  assertWorkspaceServiceAccess,
  assertWorkspaceServiceThreadAccess,
  resolveAuthorizedApiSessionId,
};
