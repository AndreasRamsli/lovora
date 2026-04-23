const RESPONSE_GUARD_INSTALLED = Symbol("controlPlaneResponseGuardInstalled");

const FORBIDDEN_KEYS = new Set([
  "prompt",
  "response",
  "content",
  "contentstring",
  "rawcontent",
  "pagecontent",
  "messagetext",
  "completion",
  "transcript",
  "snippet",
  "filename",
  "threadtitle",
  "textresponse",
]);

function deepKeys(input, prefix = "") {
  if (!input || typeof input !== "object") return [];

  if (Array.isArray(input)) {
    return input.flatMap((value, index) =>
      deepKeys(value, `${prefix}[${index}]`)
    );
  }

  return Object.entries(input).flatMap(([key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    return [fullKey, ...deepKeys(value, fullKey)];
  });
}

function assertControlPlaneResponseSafe(body = {}) {
  for (const keyPath of deepKeys(body)) {
    const leaf = keyPath
      .split(".")
      .pop()
      .replace(/\[\d+\]$/, "")
      .toLowerCase();

    if (FORBIDDEN_KEYS.has(leaf)) {
      throw new Error(`Forbidden key in control-plane response: ${leaf}`);
    }
  }
}

function installControlPlaneResponseGuard(
  response,
  routePolicy = response?.locals?.routePolicy || null
) {
  if (
    !response ||
    typeof response.json !== "function" ||
    response[RESPONSE_GUARD_INSTALLED]
  ) {
    return response;
  }

  const originalJson = response.json.bind(response);
  response.json = function guardedJson(body) {
    const activePolicy = routePolicy || response.locals?.routePolicy || null;
    if (activePolicy?.plane === "control") {
      assertControlPlaneResponseSafe(body);
    }
    return originalJson(body);
  };
  response[RESPONSE_GUARD_INSTALLED] = true;

  return response;
}

module.exports = {
  FORBIDDEN_KEYS: [...FORBIDDEN_KEYS],
  assertControlPlaneResponseSafe,
  installControlPlaneResponseGuard,
};
