const { useSwagger } = require("../../swagger/utils");
const { apiAdminEndpoints } = require("./admin");
const { apiAuthEndpoints } = require("./auth");
const { apiDocumentEndpoints } = require("./document");
const { apiSystemEndpoints } = require("./system");
const { apiWorkspaceEndpoints } = require("./workspace");
const { apiWorkspaceThreadEndpoints } = require("./workspaceThread");
const { apiUserManagementEndpoints } = require("./userManagement");
const { apiOpenAICompatibleEndpoints } = require("./openai");
const { apiEmbedEndpoints } = require("./embed");

// All /api/v1 routes are strict: no exemptions remain, and each route must use
// withRoutePolicy(...). validApiKey authenticates only; route policy supplies authorization.
// How to JSDoc an endpoint
// https://www.npmjs.com/package/swagger-autogen#openapi-3x
function developerEndpoints(app, router) {
  if (!router) return;
  useSwagger(app);
  apiAuthEndpoints(router);
  apiAdminEndpoints(router);
  apiSystemEndpoints(router);
  apiWorkspaceEndpoints(router);
  apiDocumentEndpoints(router);
  apiWorkspaceThreadEndpoints(router);
  apiUserManagementEndpoints(router);
  apiOpenAICompatibleEndpoints(router);
  apiEmbedEndpoints(router);
}

module.exports = { developerEndpoints };
