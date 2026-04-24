const { v4: uuidv4 } = require("uuid");
const { Document } = require("../../../models/documents");
const { Telemetry } = require("../../../models/telemetry");
const { Workspace } = require("../../../models/workspace");
const {
  getLLMProvider,
  getEmbeddingEngineSelection,
} = require("../../../utils/helpers");
const { reqBody } = require("../../../utils/http");
const { validApiKey } = require("../../../utils/middleware/validApiKey");
const { withRoutePolicy } = require("../../../utils/privacy/routePolicy");
const { EventLogs } = require("../../../models/eventLogs");
const {
  OpenAICompatibleChat,
} = require("../../../utils/chats/openaiCompatible");
const { getModelTag } = require("../../utils");
const { extractTextContent, extractAttachments } = require("./helpers");
const {
  loadTargetWorkspaceFromModel,
  requireWorkspaceServiceAccess,
  respondAuthorizationFailure,
} = require("../middleware/authorize");

const managementMetadataReadAccess = {
  management: ["management:metadata:read"],
};

const managementMetadataWriteAccess = {
  management: ["management:metadata:write"],
};

const workspaceServiceWriteAccess = {
  workspace_service: ["workspace:api_sessions:write"],
};

function invalidChatCompletionRequest(response) {
  return response.status(400).json({
    id: uuidv4(),
    type: "abort",
    textResponse: null,
    sources: [],
    close: true,
    error:
      "No user prompt found. Must be last element in message array with 'user' role.",
  });
}

function apiOpenAICompatibleEndpoints(app) {
  if (!app) return;

  app.get(
    "/v1/openai/models",
    ...withRoutePolicy(
      {
        method: "GET",
        path: "/api/v1/openai/models",
        routeId: "api.openai.models",
        plane: "control",
        category: "openai_compat",
        responsePolicy: "metadata_only",
        principalAccess: managementMetadataReadAccess,
      },
      [validApiKey],
      async (_, response) => {
        /*
        #swagger.tags = ['OpenAI Compatible Endpoints']
        #swagger.description = 'Get all available "models" which are workspaces you can use for chatting.'
        #swagger.responses[200] = {
          content: {
            "application/json": {
              "schema": {
                "type": "object",
                "example": {
                  "object": "list",
                  "data": [
                    {
                      "id": "model-id-0",
                      "object": "model",
                      "created": 1686935002,
                      "owned_by": "organization-owner"
                    },
                    {
                      "id": "model-id-1",
                      "object": "model",
                      "created": 1686935002,
                      "owned_by": "organization-owner"
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
        */
        try {
          const data = [];
          const workspaces = await Workspace.where();
          for (const workspace of workspaces) {
            const provider =
              workspace?.chatProvider ?? process.env.LLM_PROVIDER;
            let providerModel = workspace?.chatModel ?? "unknown";
            try {
              const LLMProvider = getLLMProvider({
                provider,
                model: workspace?.chatModel,
              });
              providerModel = LLMProvider.model || providerModel;
            } catch {}
            data.push({
              id: workspace.slug,
              object: "model",
              created: Math.floor(Number(new Date(workspace.createdAt)) / 1000),
              owned_by: `${provider}-${providerModel}`,
            });
          }
          return response.status(200).json({
            object: "list",
            data,
          });
        } catch (e) {
          console.error(e.message, e);
          response.sendStatus(500).end();
        }
      }
    )
  );

  app.post(
    "/v1/openai/chat/completions",
    ...withRoutePolicy(
      {
        method: "POST",
        path: "/api/v1/openai/chat/completions",
        routeId: "api.openai.chat-completions",
        plane: "content",
        category: "openai_compat",
        responsePolicy: "raw_chat_content",
        principalAccess: workspaceServiceWriteAccess,
      },
      [
        validApiKey,
        loadTargetWorkspaceFromModel,
        requireWorkspaceServiceAccess("workspace:api_sessions:write"),
      ],
      async (request, response) => {
        /*
        #swagger.tags = ['OpenAI Compatible Endpoints']
        #swagger.description = 'Execute a chat with a workspace with OpenAI compatibility. Supports streaming as well. Model must be a workspace slug from /models.'
        #swagger.requestBody = {
            description: 'Send a prompt to the workspace with full use of documents as if sending a chat in AnythingLLM. Only supports some values of OpenAI API. See example below.',
            required: true,
            content: {
              "application/json": {
                example: {
                  messages: [
                  {"role":"system", content: "You are a helpful assistant"},
                  {"role":"user", content: "What is AnythingLLM?"},
                  {"role":"assistant", content: "AnythingLLM is...."},
                  {"role":"user", content: "Follow up question..."}
                  ],
                  model: "sample-workspace",
                  stream: true,
                  temperature: 0.7
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
          const {
            messages = [],
            temperature,
            stream = false,
          } = reqBody(request);
          const workspace = response.locals.targetWorkspace;
          if (!Array.isArray(messages) || messages.length === 0) {
            return invalidChatCompletionRequest(response);
          }

          const sanitizedMessages = [...messages];
          const userMessage = sanitizedMessages.pop();
          if (!userMessage || userMessage.role !== "user") {
            return invalidChatCompletionRequest(response);
          }

          const systemPrompt =
            sanitizedMessages.find((chat) => chat?.role === "system")
              ?.content ?? null;
          const history =
            sanitizedMessages.filter((chat) => chat?.role !== "system") ?? [];

          if (!stream) {
            const chatResult = await OpenAICompatibleChat.chatSync({
              principal: response.locals.principal,
              workspace,
              systemPrompt,
              history,
              prompt: extractTextContent(userMessage.content),
              attachments: extractAttachments(userMessage.content),
              temperature: Number(temperature),
            });

            await Telemetry.sendTelemetry("sent_chat", {
              LLMSelection:
                workspace.chatProvider ?? process.env.LLM_PROVIDER ?? "openai",
              Embedder: process.env.EMBEDDING_ENGINE || "inherit",
              VectorDbSelection: process.env.VECTOR_DB || "lancedb",
              TTSSelection: process.env.TTS_PROVIDER || "native",
            });
            await EventLogs.logEvent("api_sent_chat", {
              workspaceName: workspace?.name,
              chatModel: workspace?.chatModel || "System Default",
            });
            return response.status(200).json(chatResult);
          }

          response.setHeader("Cache-Control", "no-cache");
          response.setHeader("Content-Type", "text/event-stream");
          response.setHeader("Access-Control-Allow-Origin", "*");
          response.setHeader("Connection", "keep-alive");
          response.flushHeaders();

          await OpenAICompatibleChat.streamChat({
            principal: response.locals.principal,
            workspace,
            systemPrompt,
            history,
            prompt: extractTextContent(userMessage.content),
            attachments: extractAttachments(userMessage.content),
            temperature: Number(temperature),
            response,
          });
          await Telemetry.sendTelemetry("sent_chat", {
            LLMSelection: process.env.LLM_PROVIDER || "openai",
            Embedder: process.env.EMBEDDING_ENGINE || "inherit",
            VectorDbSelection: process.env.VECTOR_DB || "lancedb",
            TTSSelection: process.env.TTS_PROVIDER || "native",
            LLMModel: getModelTag(),
          });
          await EventLogs.logEvent("api_sent_chat", {
            workspaceName: workspace?.name,
            chatModel: workspace?.chatModel || "System Default",
          });
          response.end();
        } catch (e) {
          if (Number.isInteger(e?.status)) {
            return respondAuthorizationFailure(response, e);
          }

          console.error(e.message, e);
          response.status(500).end();
        }
      }
    )
  );

  app.post(
    "/v1/openai/embeddings",
    ...withRoutePolicy(
      {
        method: "POST",
        path: "/api/v1/openai/embeddings",
        routeId: "api.openai.embeddings",
        plane: "control",
        category: "openai_compat",
        responsePolicy: "metadata_only",
        principalAccess: managementMetadataWriteAccess,
      },
      [validApiKey],
      async (request, response) => {
        /*
        #swagger.tags = ['OpenAI Compatible Endpoints']
        #swagger.description = 'Get the embeddings of any arbitrary text string. This will use the embedder provider set in the system. Please ensure the token length of each string fits within the context of your embedder model.'
        #swagger.requestBody = {
            description: 'The input string(s) to be embedded. If the text is too long for the embedder model context, it will fail to embed. The vector and associated chunk metadata will be returned in the array order provided',
            required: true,
            content: {
              "application/json": {
                example: {
                  input: [
                  "This is my first string to embed",
                  "This is my second string to embed",
                  ],
                  model: null,
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
          // Support input or "inputs" (for backwards compatibility) as an array of strings or a single string
          // TODO: "inputs" key support will eventually be fully removed.
          let input = body?.input || body?.inputs || [];
          // if input is not an array, make it an array and force to string content
          if (!Array.isArray(input)) input = [String(input)];

          if (Array.isArray(input)) {
            if (input.length === 0)
              throw new Error("Input array cannot be empty.");
            const validArray = input.every((text) => typeof text === "string");
            if (!validArray)
              throw new Error("All inputs to be embedded must be strings.");
          }

          const Embedder = getEmbeddingEngineSelection();
          const embeddings = await Embedder.embedChunks(input);
          const data = [];
          embeddings.forEach((embedding, index) => {
            data.push({
              object: "embedding",
              embedding,
              index,
            });
          });

          return response.status(200).json({
            object: "list",
            data,
            model: Embedder.model,
          });
        } catch (e) {
          console.error(e.message, e);
          response.status(500).end();
        }
      }
    )
  );

  app.get(
    "/v1/openai/vector_stores",
    ...withRoutePolicy(
      {
        method: "GET",
        path: "/api/v1/openai/vector_stores",
        routeId: "api.openai.vector-stores",
        plane: "control",
        category: "openai_compat",
        responsePolicy: "metadata_only",
        principalAccess: managementMetadataReadAccess,
      },
      [validApiKey],
      async (request, response) => {
        /*
        #swagger.tags = ['OpenAI Compatible Endpoints']
        #swagger.description = 'List all the vector database collections connected to AnythingLLM. These are essentially workspaces but return their unique vector db identifier - this is the same as the workspace slug.'
        #swagger.responses[200] = {
          content: {
            "application/json": {
              "schema": {
                "type": "object",
                "example": {
                  "data": [
                    {
                      "id": "slug-here",
                      "object": "vector_store",
                      "name": "My workspace",
                      "file_counts": {
                        "total": 3
                      },
                      "provider": "LanceDB"
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
        */
        try {
          // We dump all in the first response and despite saying there is
          // not more data the library still checks with a query param so if
          // we detect one - respond with nothing.
          if (Object.keys(request?.query ?? {}).length !== 0) {
            return response.status(200).json({
              data: [],
              has_more: false,
            });
          }

          const data = [];
          const VectorDBProvider = process.env.VECTOR_DB || "lancedb";
          const workspaces = await Workspace.where();

          for (const workspace of workspaces) {
            data.push({
              id: workspace.slug,
              object: "vector_store",
              name: workspace.name,
              file_counts: {
                total: await Document.count({
                  workspaceId: Number(workspace.id),
                }),
              },
              provider: VectorDBProvider,
            });
          }
          return response.status(200).json({
            first_id: [...data].splice(0)?.[0]?.id,
            last_id: [...data].splice(-1)?.[0]?.id ?? data.splice(1)?.[0]?.id,
            data,
            has_more: false,
          });
        } catch (e) {
          console.error(e.message, e);
          response.status(500).end();
        }
      }
    )
  );
}

module.exports = { apiOpenAICompatibleEndpoints };
