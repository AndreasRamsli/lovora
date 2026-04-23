const { User } = require("../../../models/user");
const { multiUserMode } = require("../../../utils/http");
const {
  simpleSSOEnabled,
} = require("../../../utils/middleware/simpleSSOEnabled");
const { validApiKey } = require("../../../utils/middleware/validApiKey");
const { withRoutePolicy } = require("../../../utils/privacy/routePolicy");

function apiUserManagementEndpoints(app) {
  if (!app) return;

  app.get(
    "/v1/users",
    ...withRoutePolicy(
      {
        method: "GET",
        path: "/api/v1/users",
        routeId: "api.users.list",
        plane: "control",
        category: "user_management",
        responsePolicy: "metadata_only",
        principalAccess: {
          management: ["management:users:read"],
        },
      },
      [validApiKey],
      async (request, response) => {
    /*
      #swagger.tags = ['User Management']
      #swagger.description = 'List all users'
      #swagger.responses[200] = {
        content: {
          "application/json": {
            schema: {
              type: 'object',
              example: {
                users: [
                  {
                    "id": 1,
                    "username": "john_doe",
                    "role": "admin"
                  },
                  {
                    "id": 2,
                    "username": "jane_smith",
                    "role": "default"
                  }
                ]
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
     #swagger.responses[401] = {
      description: "Instance is not in Multi-User mode. Permission denied.",
    }
      */
    try {
      if (!multiUserMode(response))
        return response
          .status(401)
          .send("Instance is not in Multi-User mode. Permission denied.");

      const users = await User.where();
      const filteredUsers = users.map((user) => ({
        id: user.id,
        username: user.username,
        role: user.role,
      }));
      response.status(200).json({ users: filteredUsers });
    } catch (e) {
      console.error(e.message, e);
      response.sendStatus(500).end();
    }
      }
    )
  );

  app.get(
    "/v1/users/:id/issue-auth-token",
    ...withRoutePolicy(
      {
        method: "GET",
        path: "/api/v1/users/:id/issue-auth-token",
        routeId: "api.users.issue-auth-token",
        plane: "control",
        category: "user_management",
        responsePolicy: "deny_credential_issuance",
        principalAccess: {},
      },
      [validApiKey, simpleSSOEnabled],
      async (_request, response) => {
      /*
      #swagger.tags = ['User Management']
      #swagger.description = 'This route is permanently disabled for API keys and always returns a denial response.'
      #swagger.parameters['id'] = {
        in: 'path',
        description: 'The ID of the user that would have been targeted by the legacy impersonation route',
        required: true,
        type: 'string'
      }
      #swagger.responses[403] = {
        description: 'API keys cannot mint login or impersonation tokens.',
        schema: {
          "$ref": "#/definitions/InvalidAPIKey"
        }
      }
      */
      response.status(403).json({
        error: "API keys cannot issue user auth tokens.",
      });
      }
    )
  );
}

module.exports = { apiUserManagementEndpoints };
