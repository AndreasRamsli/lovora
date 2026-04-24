function normalizeWorkspaceId(value = null) {
  if (value === null || value === undefined || value === "") return null;

  const parsed = Number(value);
  return Number.isInteger(parsed) ? parsed : null;
}

export function buildCreateApiKeyPayload(form = {}) {
  const principalType =
    form.principalType === "workspace_service"
      ? "workspace_service"
      : "management";

  return {
    name: String(form.name || "").trim(),
    principalType,
    workspaceId:
      principalType === "workspace_service"
        ? normalizeWorkspaceId(form.workspaceId)
        : null,
  };
}

export function describeApiKeyBinding(apiKey = {}) {
  if (apiKey.principalType === "workspace_service") {
    return `Workspace service · ${apiKey.workspace?.name || "Unbound workspace"}`;
  }

  return "Management · Metadata only";
}
