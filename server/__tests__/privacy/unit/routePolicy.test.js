/* eslint-env jest */

const {
  withRoutePolicy,
  getDeclaredRoutePolicies,
} = require("../../../utils/privacy/routePolicy");
const { validApiKey } = require("../../../utils/middleware/validApiKey");
const {
  requireApiCapability,
} = require("../../../utils/middleware/requireApiCapability");

describe("route policy middleware", () => {
  test("injects api capability enforcement after api key validation", () => {
    const handler = jest.fn();
    const handlers = withRoutePolicy(
      {
        method: "GET",
        path: "/api/v1/test-route-policy",
        routeId: "test.route-policy",
        plane: "control",
        category: "test",
        responsePolicy: "metadata_only",
        principalAccess: {
          management: ["management:metadata:read"],
        },
      },
      [validApiKey],
      handler
    );

    expect(handlers).toEqual([
      expect.any(Function),
      validApiKey,
      requireApiCapability,
      handler,
    ]);
    expect(getDeclaredRoutePolicies()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          routeId: "test.route-policy",
          plane: "control",
        }),
      ])
    );
  });

  test("requires v1 route policies to include api key validation", () => {
    expect(() =>
      withRoutePolicy(
        {
          method: "GET",
          path: "/api/v1/test-missing-api-key-validation",
          routeId: "test.missing-api-key-validation",
          plane: "control",
          category: "test",
          responsePolicy: "metadata_only",
          principalAccess: {
            management: ["management:metadata:read"],
          },
        },
        [(_request, _response, next) => next()]
      )
    ).toThrow("must include validApiKey");
  });
});
