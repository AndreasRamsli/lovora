function normalizePath(path = "") {
  if (!path) return "/";
  const normalized = String(path).replace(/\/+/g, "/");
  if (normalized.length > 1 && normalized.endsWith("/")) {
    return normalized.slice(0, -1);
  }
  return normalized;
}

function joinPaths(basePath = "", routePath = "") {
  if (!basePath) return normalizePath(routePath);
  if (!routePath) return normalizePath(basePath);
  return normalizePath(`${basePath}${routePath}`);
}

function mountPathFromLayer(layer) {
  if (!layer?.regexp || layer.regexp.fast_slash) return "";

  return normalizePath(
    layer.regexp.source
      .replace("\\/?(?=\\/|$)", "")
      .replace("(?=\\/|$)", "")
      .replace(/^\^/, "")
      .replace(/\$$/, "")
      .replace(/\\\//g, "/")
  );
}

function routeMiddlewareNames(routeLayer) {
  return (routeLayer?.route?.stack || []).map(
    (handlerLayer) =>
      handlerLayer?.handle?.name || handlerLayer?.name || "<anonymous>"
  );
}

function collectRoutes(stack = [], prefix = "") {
  return stack.flatMap((layer) => {
    if (layer.route?.path) {
      const routePaths = Array.isArray(layer.route.path)
        ? layer.route.path
        : [layer.route.path];
      const methods = Object.keys(layer.route.methods || {})
        .filter((method) => layer.route.methods[method])
        .map((method) => method.toUpperCase());
      const middlewareNames = routeMiddlewareNames(layer);

      return routePaths.flatMap((routePath) =>
        methods.map((method) => ({
          method,
          path: joinPaths(prefix, routePath),
          middlewareNames,
        }))
      );
    }

    if (layer.name === "router" && layer.handle?.stack) {
      return collectRoutes(
        layer.handle.stack,
        joinPaths(prefix, mountPathFromLayer(layer))
      );
    }

    return [];
  });
}

function listExpressRoutes(appOrRouter) {
  const stack = appOrRouter?._router?.stack || appOrRouter?.stack || [];
  return collectRoutes(stack);
}

module.exports = {
  listExpressRoutes,
};
