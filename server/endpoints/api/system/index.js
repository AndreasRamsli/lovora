const { SystemSettings } = require("../../../models/systemSettings");
const { purgeDocument } = require("../../../utils/files/purgeDocument");
const { getVectorDbClass } = require("../../../utils/helpers");
const { dumpENV, updateENV } = require("../../../utils/helpers/updateENV");
const { reqBody } = require("../../../utils/http");
const { validApiKey } = require("../../../utils/middleware/validApiKey");
const { withRoutePolicy } = require("../../../utils/privacy/routePolicy");

const managementMetadataReadAccess = {
  management: ["management:metadata:read"],
};

const managementMetadataWriteAccess = {
  management: ["management:metadata:write"],
};

function apiSystemEndpoints(app) {
  if (!app) return;

  app.get(
    "/v1/system/env-dump",
    ...withRoutePolicy(
      {
        method: "GET",
        path: "/api/v1/system/env-dump",
        routeId: "api.system.env-dump",
        plane: "control",
        category: "system_settings",
        responsePolicy: "metadata_only",
        principalAccess: managementMetadataWriteAccess,
      },
      [validApiKey],
      async (_, response) => {
        /*
   #swagger.tags = ['System Settings']
   #swagger.description = 'Dump all settings to file storage'
   #swagger.responses[403] = {
     schema: {
       "$ref": "#/definitions/InvalidAPIKey"
     }
   }
   */
        try {
          if (process.env.NODE_ENV !== "production")
            return response.sendStatus(200).end();
          dumpENV();
          response.sendStatus(200).end();
        } catch (e) {
          console.error(e.message, e);
          response.sendStatus(500).end();
        }
      }
    )
  );

  app.get(
    "/v1/system",
    ...withRoutePolicy(
      {
        method: "GET",
        path: "/api/v1/system",
        routeId: "api.system.settings.read",
        plane: "control",
        category: "system_settings",
        responsePolicy: "metadata_only",
        principalAccess: {
          management: ["management:metadata:read"],
        },
      },
      [validApiKey],
      async (_, response) => {
        /*
    #swagger.tags = ['System Settings']
    #swagger.description = 'Get all current system settings that are defined.'
    #swagger.responses[200] = {
      content: {
        "application/json": {
          schema: {
            type: 'object',
            example: {
             "settings": {
                "VectorDB": "pinecone",
                "PineConeKey": true,
                "PineConeIndex": "my-pinecone-index",
                "LLMProvider": "azure",
                "[KEY_NAME]": "KEY_VALUE",
              }
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
        try {
          const settings = await SystemSettings.currentSettings();
          response.status(200).json({ settings });
        } catch (e) {
          console.error(e.message, e);
          response.sendStatus(500).end();
        }
      }
    )
  );

  app.get(
    "/v1/system/vector-count",
    ...withRoutePolicy(
      {
        method: "GET",
        path: "/api/v1/system/vector-count",
        routeId: "api.system.vector-count",
        plane: "control",
        category: "system_settings",
        responsePolicy: "metadata_only",
        principalAccess: managementMetadataReadAccess,
      },
      [validApiKey],
      async (_, response) => {
        /*
        #swagger.tags = ['System Settings']
        #swagger.description = 'Number of all vectors in connected vector database'
        #swagger.responses[200] = {
          content: {
            "application/json": {
              schema: {
                type: 'object',
                example: {
                 "vectorCount": 5450
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
        try {
          const VectorDb = getVectorDbClass();
          const vectorCount = await VectorDb.totalVectors();
          response.status(200).json({ vectorCount });
        } catch (e) {
          console.error(e.message, e);
          response.sendStatus(500).end();
        }
      }
    )
  );

  app.post(
    "/v1/system/update-env",
    ...withRoutePolicy(
      {
        method: "POST",
        path: "/api/v1/system/update-env",
        routeId: "api.system.settings.update-env",
        plane: "control",
        category: "system_settings",
        responsePolicy: "metadata_only",
        principalAccess: managementMetadataWriteAccess,
      },
      [validApiKey],
      async (request, response) => {
        /*
      #swagger.tags = ['System Settings']
      #swagger.description = 'Update a system setting or preference.'
      #swagger.requestBody = {
        description: 'Key pair object that matches a valid setting and value. Get keys from GET /v1/system or refer to codebase.',
        required: true,
        content: {
          "application/json": {
            example: {
              VectorDB: "lancedb",
              AnotherKey: "updatedValue"
            }
          }
        }
      }
      #swagger.responses[200] = {
        content: {
          "application/json": {
            schema: {
              type: 'object',
              example: {
                newValues: {"[ENV_KEY]": 'Value'},
                error: 'error goes here, otherwise null'
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
        try {
          const body = reqBody(request);
          const { newValues, error } = await updateENV(body);
          response.status(200).json({ newValues, error });
        } catch (e) {
          console.error(e.message, e);
          response.sendStatus(500).end();
        }
      }
    )
  );

  app.get(
    "/v1/system/export-chats",
    ...withRoutePolicy(
      {
        method: "GET",
        path: "/api/v1/system/export-chats",
        routeId: "api.system.export-chats",
        plane: "control",
        category: "moderation",
        responsePolicy: "deny_raw_content",
        principalAccess: {
          management: [
            "management:metadata:read",
            "management:moderation:write",
          ],
        },
      },
      [validApiKey],
      async (_, response) => {
        response
          .status(403)
          .json({ success: false, error: "Raw chat export is disabled." });
      }
    )
  );
  app.delete(
    "/v1/system/remove-documents",
    ...withRoutePolicy(
      {
        method: "DELETE",
        path: "/api/v1/system/remove-documents",
        routeId: "api.system.settings.remove-documents",
        plane: "control",
        category: "system_settings",
        responsePolicy: "metadata_only",
        principalAccess: managementMetadataWriteAccess,
      },
      [validApiKey],
      async (request, response) => {
        /*
      #swagger.tags = ['System Settings']
      #swagger.description = 'Permanently remove documents from the system.'
      #swagger.requestBody = {
        description: 'Array of document names to be removed permanently.',
        required: true,
        content: {
          "application/json": {
            schema: {
              type: 'object',
              properties: {
                names: {
                  type: 'array',
                  items: {
                    type: 'string'
                  },
                  example: [
                    "custom-documents/file.txt-fc4beeeb-e436-454d-8bb4-e5b8979cb48f.json"
                  ]
                }
              }
            }
          }
        }
      }
      #swagger.responses[200] = {
        description: 'Documents removed successfully.',
        content: {
          "application/json": {
            schema: {
              type: 'object',
              example: {
                success: true,
                message: 'Documents removed successfully'
              }
            }
          }
        }
      }
      #swagger.responses[403] = {
        description: 'Forbidden',
        schema: {
          "$ref": "#/definitions/InvalidAPIKey"
        }
      }
      #swagger.responses[500] = {
        description: 'Internal Server Error'
      }
      */
        try {
          const { names } = reqBody(request);
          for await (const name of names) await purgeDocument(name);
          response
            .status(200)
            .json({ success: true, message: "Documents removed successfully" })
            .end();
        } catch (e) {
          console.error(e.message, e);
          response.sendStatus(500).end();
        }
      }
    )
  );
}

module.exports = { apiSystemEndpoints };
