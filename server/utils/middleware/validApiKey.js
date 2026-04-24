const { ApiKey } = require("../../models/apiKeys");
const { SystemSettings } = require("../../models/systemSettings");
const { resolveApiKeyPrincipal } = require("../auth/principals");

async function validApiKey(request, response, next) {
  const multiUserMode = await SystemSettings.isMultiUserMode();
  response.locals.multiUserMode = multiUserMode;

  const auth = request.header("Authorization");
  const bearerKey = auth ? auth.split(" ")[1] : null;
  if (!bearerKey) {
    response.status(403).json({
      error: "No valid api key found.",
    });
    return;
  }

  const apiKey = await ApiKey.get({ secret: bearerKey });
  if (!apiKey) {
    response.status(403).json({
      error: "No valid api key found.",
    });
    return;
  }

  const principal = resolveApiKeyPrincipal(apiKey);
  if (!principal) {
    response.status(403).json({
      error: "No valid api key found.",
    });
    return;
  }

  response.locals.apiKey = apiKey;
  response.locals.principal = principal;
  next();
}

module.exports = {
  validApiKey,
};
