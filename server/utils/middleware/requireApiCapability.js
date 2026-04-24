const { principalCan } = require("../auth/principals");

function deny(response, message = "API key cannot access this route.") {
  return response.status(403).json({ error: message });
}

function capabilityDenyMessage(routePolicy = {}) {
  if (routePolicy?.responsePolicy === "deny_credential_issuance") {
    return "API keys cannot issue user auth tokens.";
  }

  return "API key cannot access this route.";
}

function requireApiCapability(_request, response, next) {
  const routePolicy = response?.locals?.routePolicy || null;
  const apiKey = response?.locals?.apiKey || null;
  const principal = response?.locals?.principal || null;

  if (!apiKey || !routePolicy?.principalAccess) {
    next();
    return;
  }

  const requiredCapabilities =
    routePolicy.principalAccess[principal?.kind] || null;
  if (!requiredCapabilities) {
    deny(response, capabilityDenyMessage(routePolicy));
    return;
  }

  const missingCapability = requiredCapabilities.find(
    (capability) => !principalCan(principal, capability)
  );

  if (missingCapability) {
    deny(response, capabilityDenyMessage(routePolicy));
    return;
  }

  next();
}

module.exports = {
  requireApiCapability,
};
