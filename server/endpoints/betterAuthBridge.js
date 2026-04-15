const { makeJWT } = require("../utils/http");
const { User } = require("../models/user");
const {
  getBetterAuthSessionFromRequest,
  mapBetterAuthSessionToLegacyUser,
} = require("../utils/auth/betterAuthSession");

async function resolveLegacyUserFromBetterAuthRequest(request) {
  const session = await getBetterAuthSessionFromRequest(request);
  if (!session?.user) return null;
  return await mapBetterAuthSessionToLegacyUser(session);
}

function setNoStore(response) {
  response.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  response.set("Pragma", "no-cache");
  response.set("Expires", "0");
  response.set("Surrogate-Control", "no-store");
}

function betterAuthBridgeEndpoints(app) {
  if (!app) return;

  app.get("/auth/bridge/session", async (request, response) => {
    try {
      setNoStore(response);
      const legacyUser = await resolveLegacyUserFromBetterAuthRequest(request);
      if (!legacyUser) {
        return response.status(401).json({
          valid: false,
          user: null,
          message: "No Better Auth session found.",
        });
      }

      return response.status(200).json({
        valid: true,
        user: User.filterFields(legacyUser),
        message: null,
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        valid: false,
        user: null,
        message: error.message,
      });
    }
  });

  app.post("/auth/bridge/exchange", async (request, response) => {
    try {
      setNoStore(response);
      const legacyUser = await resolveLegacyUserFromBetterAuthRequest(request);
      if (!legacyUser) {
        return response.status(401).json({
          valid: false,
          user: null,
          token: null,
          message: "No Better Auth session found.",
        });
      }

      const token = makeJWT(
        {
          id: legacyUser.id,
          username: legacyUser.username,
        },
        process.env.JWT_EXPIRY || "30d"
      );

      return response.status(200).json({
        valid: true,
        user: User.filterFields(legacyUser),
        token,
        message: null,
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({
        valid: false,
        user: null,
        token: null,
        message: error.message,
      });
    }
  });
}

module.exports = { betterAuthBridgeEndpoints, resolveLegacyUserFromBetterAuthRequest };
