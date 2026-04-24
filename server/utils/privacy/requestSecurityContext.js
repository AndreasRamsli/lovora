const REQUEST_SECURITY_CONTEXT = Symbol("requestSecurityContext");

function isValidPlane(plane = null) {
  return plane === "control" || plane === "content";
}

function isValidRequestId(requestId = null) {
  return requestId === null || typeof requestId === "string";
}

function isValidRouteId(routeId = null) {
  return typeof routeId === "string" && routeId.trim().length > 0;
}

function invalidRequestContextError() {
  const error = new Error("Explicit request security context required.");
  error.status = 403;
  return error;
}

function createRequestSecurityContext({
  requestId = null,
  routeId = "unknown.route",
  plane = "control",
  principal = null,
} = {}) {
  if (
    !isValidRequestId(requestId) ||
    !isValidRouteId(routeId) ||
    !isValidPlane(plane)
  ) {
    throw invalidRequestContextError();
  }

  return Object.freeze({
    [REQUEST_SECURITY_CONTEXT]: true,
    requestId,
    routeId,
    plane,
    principal,
  });
}

function isRequestSecurityContext(value = null) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;

  return (
    value[REQUEST_SECURITY_CONTEXT] === true &&
    isValidRequestId(value.requestId) &&
    isValidRouteId(value.routeId) &&
    isValidPlane(value.plane) &&
    Object.prototype.hasOwnProperty.call(value, "principal")
  );
}

function assertRequestSecurityContext(ctx = null) {
  if (!isRequestSecurityContext(ctx)) {
    throw invalidRequestContextError();
  }

  return ctx;
}

function assertContentPlane(ctx = null) {
  assertRequestSecurityContext(ctx);

  if (ctx.plane !== "content") {
    const error = new Error(
      "Control-plane route attempted to access chat content."
    );
    error.status = 403;
    throw error;
  }
}

module.exports = {
  createRequestSecurityContext,
  isRequestSecurityContext,
  assertRequestSecurityContext,
  assertContentPlane,
};
