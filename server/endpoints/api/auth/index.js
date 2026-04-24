const { validApiKey } = require("../../../utils/middleware/validApiKey");
const { withRoutePolicy } = require("../../../utils/privacy/routePolicy");

const authProbeAccess = {
  management: [],
  workspace_service: [],
};

function apiAuthEndpoints(app) {
  if (!app) return;

  app.get(
    "/v1/auth",
    ...withRoutePolicy(
      {
        method: "GET",
        path: "/api/v1/auth",
        routeId: "api.auth.probe",
        plane: "control",
        category: "authentication",
        responsePolicy: "metadata_only",
        principalAccess: authProbeAccess,
      },
      [validApiKey],
      (_, response) => {
        /*
        #swagger.tags = ['Authentication']
        #swagger.description = 'Verify the attached Authentication header contains a valid API token.'
        #swagger.responses[200] = {
          description: 'Valid auth token was found.',
          content: {
            "application/json": {
              schema: {
                type: 'object',
                example: {
                  authenticated: true,
                }
              }
            }
          }
        }
        #swagger.responses[403] = {
          schema: {
            "$ref": "#/definitions/InvalidAPIKey"
          }
        }
        */
        response.status(200).json({ authenticated: true });
      }
    )
  );
}

module.exports = { apiAuthEndpoints };
