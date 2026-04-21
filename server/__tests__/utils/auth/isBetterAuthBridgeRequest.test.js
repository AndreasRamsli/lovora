/* eslint-env jest */

const {
  BETTER_AUTH_BRIDGE_PATH_PREFIX,
  isBetterAuthBridgeRequest,
} = require("../../../utils/auth/isBetterAuthBridgeRequest");

describe("isBetterAuthBridgeRequest", () => {
  test("accepts bridge requests when originalUrl keeps the /api prefix", () => {
    expect(
      isBetterAuthBridgeRequest({
        originalUrl: "/api/auth/bridge/legacy-login",
        path: "/legacy-login",
      })
    ).toBe(true);
  });

  test("accepts bridge requests when Express strips the mount path from request.path", () => {
    expect(
      isBetterAuthBridgeRequest({
        originalUrl: "/api/auth/bridge/session",
        path: "/session",
        url: "/session",
      })
    ).toBe(true);
  });

  test("rejects non-bridge Better Auth routes", () => {
    expect(
      isBetterAuthBridgeRequest({
        originalUrl: "/api/auth/sign-in/email",
        path: "/sign-in/email",
      })
    ).toBe(false);
  });

  test("exports the expected prefix constant", () => {
    expect(BETTER_AUTH_BRIDGE_PATH_PREFIX).toBe("/api/auth/bridge/");
  });
});
