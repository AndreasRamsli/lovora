const { createRequestSecurityContext } = require("./requestSecurityContext");
const {
  installControlPlaneResponseGuard,
} = require("./controlPlaneResponseGuard");
const { validApiKey } = require("../middleware/validApiKey");
const { requireApiCapability } = require("../middleware/requireApiCapability");

const declaredPolicies = new Map();

function flattenHandlers(handlers = []) {
  return handlers.flatMap((handler) => {
    if (Array.isArray(handler)) {
      return flattenHandlers(handler);
    }
    return handler ? [handler] : [];
  });
}

function normalizePrincipalAccess(principalAccess = null) {
  if (principalAccess === null || principalAccess === undefined) return null;
  if (typeof principalAccess !== "object" || Array.isArray(principalAccess)) {
    throw new Error("Invalid route policy principal access declaration.");
  }

  return Object.freeze(
    Object.fromEntries(
      Object.entries(principalAccess).map(([kind, capabilities]) => {
        if (!Array.isArray(capabilities)) {
          throw new Error("Invalid route policy principal access declaration.");
        }

        return [String(kind), Object.freeze(capabilities.map(String))];
      })
    )
  );
}

function normalizePolicy(policy = {}) {
  const normalized = {
    method: String(policy.method || "").toUpperCase(),
    path: String(policy.path || ""),
    routeId: String(policy.routeId || ""),
    plane: String(policy.plane || ""),
    category: String(policy.category || ""),
    responsePolicy: String(policy.responsePolicy || ""),
    principalAccess: normalizePrincipalAccess(policy.principalAccess),
  };

  if (
    !normalized.method ||
    !normalized.path ||
    !normalized.routeId ||
    !["control", "content"].includes(normalized.plane) ||
    !normalized.category ||
    !normalized.responsePolicy
  ) {
    throw new Error("Invalid route policy declaration.");
  }

  return Object.freeze(normalized);
}

function policyKey(policy = {}) {
  return `${policy.method} ${policy.path}`;
}

function declarePolicy(policy = {}) {
  const normalized = normalizePolicy(policy);
  const key = policyKey(normalized);
  const existingPolicy = declaredPolicies.get(key);

  if (existingPolicy) {
    const hasConflict =
      existingPolicy.method !== normalized.method ||
      existingPolicy.path !== normalized.path ||
      existingPolicy.routeId !== normalized.routeId ||
      existingPolicy.plane !== normalized.plane ||
      existingPolicy.category !== normalized.category ||
      existingPolicy.responsePolicy !== normalized.responsePolicy ||
      JSON.stringify(existingPolicy.principalAccess) !==
        JSON.stringify(normalized.principalAccess);

    if (hasConflict) {
      throw new Error(`Conflicting route policy declaration for ${key}.`);
    }

    return existingPolicy;
  }

  declaredPolicies.set(key, normalized);
  return normalized;
}

function withRoutePolicy(policy, ...handlers) {
  const declaredPolicy = declarePolicy(policy);
  const flattenedHandlers = flattenHandlers(handlers);
  const isV1Route = String(declaredPolicy.path || "").startsWith("/api/v1");

  if (isV1Route && !flattenedHandlers.includes(validApiKey)) {
    throw new Error(
      `Route policy ${declaredPolicy.routeId} must include validApiKey in its handler chain.`
    );
  }

  const policyAwareHandlers = flattenedHandlers.flatMap((handler) => {
    if (handler === validApiKey) {
      return [handler, requireApiCapability];
    }

    return handler ? [handler] : [];
  });

  return [
    function attachRoutePolicy(request, response, next) {
      response.locals.routePolicy = declaredPolicy;
      response.locals.createRouteSecurityContext = () =>
        createRequestSecurityContext({
          requestId: request.header("X-Request-Id") || null,
          routeId: declaredPolicy.routeId,
          plane: declaredPolicy.plane,
          principal: response.locals.principal || null,
        });
      installControlPlaneResponseGuard(response, declaredPolicy);
      next();
    },
    ...policyAwareHandlers,
  ];
}

function getDeclaredRoutePolicies() {
  return [...declaredPolicies.values()];
}

module.exports = {
  withRoutePolicy,
  getDeclaredRoutePolicies,
};
