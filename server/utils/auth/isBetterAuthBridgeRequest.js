const BETTER_AUTH_BRIDGE_PATH_PREFIX = "/api/auth/bridge/";

function isBetterAuthBridgeRequest(request = {}) {
  return [request.originalUrl, request.url, request.path].some((candidate) =>
    String(candidate || "").startsWith(BETTER_AUTH_BRIDGE_PATH_PREFIX)
  );
}

module.exports = isBetterAuthBridgeRequest;
module.exports.BETTER_AUTH_BRIDGE_PATH_PREFIX = BETTER_AUTH_BRIDGE_PATH_PREFIX;
module.exports.isBetterAuthBridgeRequest = isBetterAuthBridgeRequest;
