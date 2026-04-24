function routeKey(route = {}) {
  return `${route.method} ${route.path}`;
}

const PRIVACY_ROUTE_PREFIXES = [
  "/api/admin",
  "/api/system",
  "/api/workspace",
  "/api/document",
  "/api/v1",
];

const ROUTE_POLICY_EXEMPTIONS = new Set([
  // Session/bootstrap and account-recovery flows are outside the current privacy-managed route-policy surface.
  "GET /api/system/check-token",
  "GET /api/system/refresh-user",
  "POST /api/system/recover-account",
  "POST /api/system/reset-password",
  "POST /api/system/update-password",
  "POST /api/system/enable-multi-user",
  "GET /api/system/multi-user-mode",
  "POST /api/system/user",

  // System file-management, branding, and configuration helper routes are not part of the current privacy-managed surface.
  "GET /api/system/system-vectors",
  "DELETE /api/system/remove-document",
  "DELETE /api/system/remove-documents",
  "DELETE /api/system/remove-folder",
  "GET /api/system/local-files",
  "GET /api/system/document-processing-status",
  "GET /api/system/accepted-document-types",
  "POST /api/system/update-env",
  "GET /api/system/logo",
  "GET /api/system/footer-data",
  "GET /api/system/support-email",
  "GET /api/system/custom-app-name",
  "GET /api/system/pfp/:id",
  "POST /api/system/upload-pfp",
  "GET /api/system/default-system-prompt",
  "POST /api/system/default-system-prompt",
  "DELETE /api/system/remove-pfp",
  "POST /api/system/upload-logo",
  "GET /api/system/is-default-logo",
  "GET /api/system/remove-logo",
  "POST /api/system/custom-models",
  "POST /api/system/event-logs",
  "DELETE /api/system/event-logs",
  "GET /api/system/slash-command-presets",
  "POST /api/system/slash-command-presets",
  "POST /api/system/slash-command-presets/:slashCommandId",
  "DELETE /api/system/slash-command-presets/:slashCommandId",
  "GET /api/system/prompt-variables",
  "POST /api/system/prompt-variables",
  "PUT /api/system/prompt-variables/:id",
  "DELETE /api/system/prompt-variables/:id",
  "POST /api/system/validate-sql-connection",

  // Workspace ingestion, media, and parsing helpers are outside the current privacy-managed review boundary.
  "POST /api/workspace/:slug/upload",
  "POST /api/workspace/:slug/upload-link",
  "POST /api/workspace/:slug/update-embeddings",
  "DELETE /api/workspace/:slug/reset-vector-db",
  "GET /api/workspace/:slug/suggested-messages",
  "POST /api/workspace/:slug/suggested-messages",
  "POST /api/workspace/:slug/update-pin",
  "GET /api/workspace/:slug/tts/:chatId",
  "GET /api/workspace/:slug/pfp",
  "POST /api/workspace/:slug/upload-pfp",
  "DELETE /api/workspace/:slug/remove-pfp",
  "POST /api/workspace/:slug/upload-and-embed",
  "DELETE /api/workspace/:slug/remove-and-unembed",
  "POST /api/workspace/search",
  "GET /api/workspace/:slug/parsed-files",
  "DELETE /api/workspace/:slug/delete-parsed-files",
  "POST /api/workspace/:slug/embed-parsed-file/:fileId",
  "POST /api/workspace/:slug/citation-source",
  "POST /api/workspace/:slug/parse",
  "POST /api/workspace/:slug/update-watch-status",
]);

function requiresPrivacyPolicy(route = {}) {
  return PRIVACY_ROUTE_PREFIXES.some((prefix) => route.path.startsWith(prefix));
}

function isPolicyExempt(route = {}) {
  return ROUTE_POLICY_EXEMPTIONS.has(routeKey(route));
}

module.exports = {
  routeKey,
  requiresPrivacyPolicy,
  isPolicyExempt,
  ROUTE_POLICY_EXEMPTIONS: [...ROUTE_POLICY_EXEMPTIONS],
};
