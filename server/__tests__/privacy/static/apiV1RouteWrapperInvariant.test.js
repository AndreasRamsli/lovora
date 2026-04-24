/* eslint-env jest */

const path = require("path");

const REQUIRED_V1_MIDDLEWARE_PREFIX = [
  "attachRoutePolicy",
  "validApiKey",
  "requireApiCapability",
];

describe("api v1 route wrapper invariant", () => {
  beforeEach(() => {
    jest.resetModules();
    process.env.STORAGE_DIR =
      process.env.STORAGE_DIR ||
      path.resolve(__dirname, "../../../storage");
  });

  test("every /api/v1 route starts with the withRoutePolicy middleware chain", () => {
    const { createApp } = require("../../../app");
    const {
      listExpressRoutes,
    } = require("../../../test-support/privacy/expressRoutes");
    const {
      routeKey,
    } = require("../../../test-support/privacy/routeInventory");

    const app = createApp({ enableWebSockets: false });
    const v1Routes = listExpressRoutes(app).filter((route) =>
      route.path.startsWith("/api/v1")
    );

    const offenders = v1Routes
      .filter((route) => {
        const actualPrefix = route.middlewareNames.slice(
          0,
          REQUIRED_V1_MIDDLEWARE_PREFIX.length
        );
        return (
          actualPrefix.length !== REQUIRED_V1_MIDDLEWARE_PREFIX.length ||
          actualPrefix.some(
            (middlewareName, index) =>
              middlewareName !== REQUIRED_V1_MIDDLEWARE_PREFIX[index]
          )
        );
      })
      .map((route) => ({
        route: routeKey(route),
        middlewareNames: route.middlewareNames,
      }))
      .sort((left, right) => left.route.localeCompare(right.route));

    expect(offenders).toEqual([]);
  });
});
