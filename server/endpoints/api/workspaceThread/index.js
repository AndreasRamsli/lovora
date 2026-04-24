const { v4: uuidv4 } = require("uuid");
const { WorkspaceThread } = require("../../../models/workspaceThread");
const { ConversationFlags } = require("../../../models/conversationFlags");
const { validApiKey } = require("../../../utils/middleware/validApiKey");
const { reqBody, multiUserMode } = require("../../../utils/http");
const { VALID_CHAT_MODE } = require("../../../utils/chats/stream");
const { Telemetry } = require("../../../models/telemetry");
const { EventLogs } = require("../../../models/eventLogs");
const { writeResponseChunk } = require("../../../utils/helpers/chat/responses");
const { ApiChatHandler } = require("../../../utils/chats/apiChatHandler");
const { getModelTag } = require("../../utils");
const { withRoutePolicy } = require("../../../utils/privacy/routePolicy");
const {
  loadTargetWorkspace,
  loadTargetThread,
  requireWorkspaceServiceAccess,
  requireWorkspaceServiceThreadAccess,
} = require("../middleware/authorize");

function denyUserTargeting(response) {
  response.status(403).json({
    error: "API keys cannot target users explicitly.",
  });
}

function hasExplicitUserTarget(userId) {
  return ![null, undefined, ""].includes(userId);
}

function rejectExplicitUserTargeting(request, response, next) {
  const { userId = null } = reqBody(request);
  if (!hasExplicitUserTarget(userId)) {
    next();
    return;
  }

  denyUserTargeting(response);
}

function apiWorkspaceThreadEndpoints(app) {
  if (!app) return;

  app.post(
    "/v1/workspace/:slug/thread/new",
    ...withRoutePolicy(
      {
        method: "POST",
        path: "/api/v1/workspace/:slug/thread/new",
        routeId: "api.workspace-thread.create",
        plane: "control",
        category: "workspace_thread_api",
        responsePolicy: "metadata_only",
        principalAccess: {
          workspace_service: ["workspace:api_sessions:write"],
        },
      },
      [
        validApiKey,
        rejectExplicitUserTargeting,
        loadTargetWorkspace,
        requireWorkspaceServiceAccess("workspace:api_sessions:write"),
      ],
      async (request, response) => {
        /*
      #swagger.tags = ['Workspace Threads']
      #swagger.description = 'Create a new workspace thread'
      #swagger.parameters['slug'] = {
          in: 'path',
          description: 'Unique slug of workspace',
          required: true,
          type: 'string'
      }
      #swagger.requestBody = {
        description: 'Optional userId associated with the thread, thread slug and thread name',
        required: false,
        content: {
          "application/json": {
            example: {
              userId: 1,
              name: 'Name',
              slug: 'thread-slug'
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
                thread: {
                  "id": 1,
                  "name": "Thread",
                  "slug": "thread-uuid",
                  "user_id": 1,
                  "workspace_id": 1
                },
                message: null
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
          let { userId = null, name = null, slug = null } = reqBody(request);
          const workspace = response.locals.targetWorkspace;
          const principal = response.locals.principal;

          const { thread, message } = await WorkspaceThread.new(
            workspace,
            userId ? Number(userId) : null,
            { name, slug },
            principal?.kind === "workspace_service" ? principal.apiKeyId : null
          );

          await Telemetry.sendTelemetry("workspace_thread_created", {
            multiUserMode: multiUserMode(response),
            LLMSelection: process.env.LLM_PROVIDER || "openai",
            Embedder: process.env.EMBEDDING_ENGINE || "inherit",
            VectorDbSelection: process.env.VECTOR_DB || "lancedb",
            TTSSelection: process.env.TTS_PROVIDER || "native",
          });
          await EventLogs.logEvent("api_workspace_thread_created", {
            workspaceName: workspace?.name || "Unknown Workspace",
          });
          response.status(200).json({ thread, message });
        } catch (e) {
          console.error(e.message, e);
          response.sendStatus(500).end();
        }
      }
    )
  );

  app.post(
    "/v1/workspace/:slug/thread/:threadSlug/update",
    ...withRoutePolicy(
      {
        method: "POST",
        path: "/api/v1/workspace/:slug/thread/:threadSlug/update",
        routeId: "api.workspace-thread.update",
        plane: "control",
        category: "workspace_thread_api",
        responsePolicy: "metadata_only",
        principalAccess: {
          workspace_service: ["workspace:api_sessions:write"],
        },
      },
      [
        validApiKey,
        rejectExplicitUserTargeting,
        loadTargetWorkspace,
        loadTargetThread,
        requireWorkspaceServiceThreadAccess("workspace:api_sessions:write"),
      ],
      async (request, response) => {
        /*
      #swagger.tags = ['Workspace Threads']
      #swagger.description = 'Update thread name by its unique slug.'
      #swagger.parameters['slug'] = {
          in: 'path',
          description: 'Unique slug of workspace',
          required: true,
          type: 'string'
      }
      #swagger.parameters['threadSlug'] = {
          in: 'path',
          description: 'Unique slug of thread',
          required: true,
          type: 'string'
      }
      #swagger.requestBody = {
        description: 'JSON object containing new name to update the thread.',
        required: true,
        content: {
          "application/json": {
            example: {
              "name": 'Updated Thread Name'
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
                thread: {
                  "id": 1,
                  "name": "Updated Thread Name",
                  "slug": "thread-uuid",
                  "user_id": 1,
                  "workspace_id": 1
                },
                message: null,
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
          const { name } = reqBody(request);
          const thread = response.locals.targetThread;

          const { thread: updatedThread, message } =
            await WorkspaceThread.update(thread, { name });
          response.status(200).json({ thread: updatedThread, message });
        } catch (e) {
          console.error(e.message, e);
          response.sendStatus(500).end();
        }
      }
    )
  );

  app.delete(
    "/v1/workspace/:slug/thread/:threadSlug",
    ...withRoutePolicy(
      {
        method: "DELETE",
        path: "/api/v1/workspace/:slug/thread/:threadSlug",
        routeId: "api.workspace-thread.delete",
        plane: "control",
        category: "workspace_thread_api",
        responsePolicy: "metadata_only",
        principalAccess: {
          workspace_service: ["workspace:api_sessions:write"],
        },
      },
      [
        validApiKey,
        rejectExplicitUserTargeting,
        loadTargetWorkspace,
        loadTargetThread,
        requireWorkspaceServiceThreadAccess("workspace:api_sessions:write"),
      ],
      async (request, response) => {
        /*
    #swagger.tags = ['Workspace Threads']
    #swagger.description = 'Delete a workspace thread'
    #swagger.parameters['slug'] = {
        in: 'path',
        description: 'Unique slug of workspace',
        required: true,
        type: 'string'
    }
    #swagger.parameters['threadSlug'] = {
        in: 'path',
        description: 'Unique slug of thread',
        required: true,
        type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Thread deleted successfully'
    }
    #swagger.responses[403] = {
      schema: {
        "$ref": "#/definitions/InvalidAPIKey"
      }
    }
      */
        try {
          const workspace = response.locals.targetWorkspace;
          const thread = response.locals.targetThread;
          await WorkspaceThread.delete({
            slug: thread.slug,
            workspace_id: workspace.id,
          });
          response.sendStatus(200).end();
        } catch (e) {
          console.error(e.message, e);
          response.sendStatus(500).end();
        }
      }
    )
  );

  app.get(
    "/v1/workspace/:slug/thread/:threadSlug/chats",
    ...withRoutePolicy(
      {
        method: "GET",
        path: "/api/v1/workspace/:slug/thread/:threadSlug/chats",
        routeId: "api.workspace-thread.history",
        plane: "content",
        category: "workspace_thread_api",
        responsePolicy: "metadata_only",
        principalAccess: {
          workspace_service: ["workspace:api_sessions:read"],
        },
      },
      [
        validApiKey,
        loadTargetWorkspace,
        loadTargetThread,
        requireWorkspaceServiceThreadAccess("workspace:api_sessions:read"),
      ],
      async (request, response) => {
        /*
      #swagger.tags = ['Workspace Threads']
      #swagger.description = 'Get chats for a workspace thread'
      #swagger.parameters['slug'] = {
          in: 'path',
          description: 'Unique slug of workspace',
          required: true,
          type: 'string'
      }
      #swagger.parameters['threadSlug'] = {
          in: 'path',
          description: 'Unique slug of thread',
          required: true,
          type: 'string'
      }
      #swagger.responses[200] = {
        content: {
          "application/json": {
            schema: {
              type: 'object',
              example: {
                history: [
                  {
                    "role": "user",
                    "content": "What is AnythingLLM?",
                    "sentAt": 1692851630
                  },
                  {
                    "role": "assistant",
                    "content": "AnythingLLM is a platform that allows you to convert notes, PDFs, and other source materials into a chatbot. It ensures privacy, cites its answers, and allows multiple people to interact with the same documents simultaneously. It is particularly useful for businesses to enhance the visibility and readability of various written communications such as SOPs, contracts, and sales calls. You can try it out with a free trial to see if it meets your business needs.",
                    "sources": [{"source": "object about source document and snippets used"}]
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
          const workspace = response.locals.targetWorkspace;
          const thread = response.locals.targetThread;

          const history = await ConversationFlags.listMetadataByClause({
            clause: {
              workspaceId: workspace.id,
              thread_id: thread.id,
              user_id: null,
              api_session_id: thread.api_session_id,
              include: true,
            },
            limit: null,
            orderBy: { id: "asc" },
          });

          response.status(200).json({ history });
        } catch (e) {
          console.error(e.message, e);
          response.sendStatus(500).end();
        }
      }
    )
  );

  app.post(
    "/v1/workspace/:slug/thread/:threadSlug/chat",
    ...withRoutePolicy(
      {
        method: "POST",
        path: "/api/v1/workspace/:slug/thread/:threadSlug/chat",
        routeId: "api.workspace-thread.chat",
        plane: "content",
        category: "workspace_thread_api",
        responsePolicy: "raw_chat_content",
        principalAccess: {
          workspace_service: ["workspace:api_sessions:write"],
        },
      },
      [
        validApiKey,
        rejectExplicitUserTargeting,
        loadTargetWorkspace,
        loadTargetThread,
        requireWorkspaceServiceThreadAccess("workspace:api_sessions:write"),
      ],
      async (request, response) => {
        /*
      #swagger.tags = ['Workspace Threads']
      #swagger.description = 'Chat with a workspace thread'
      #swagger.parameters['slug'] = {
          in: 'path',
          description: 'Unique slug of workspace',
          required: true,
          type: 'string'
      }
      #swagger.parameters['threadSlug'] = {
          in: 'path',
          description: 'Unique slug of thread',
          required: true,
          type: 'string'
      }
      #swagger.requestBody = {
        description: 'Send a prompt to the workspace thread and the type of conversation (query or chat).',
        required: true,
        content: {
          "application/json": {
            example: {
              message: "What is AnythingLLM?",
              mode: "query | chat",
              userId: 1,
              attachments: [
               {
                 name: "image.png",
                 mime: "image/png",
                 contentString: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
               }
              ],
              reset: false
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
                id: 'chat-uuid',
                type: "abort | textResponse",
                textResponse: "Response to your query",
                sources: [{title: "anythingllm.txt", chunk: "This is a context chunk used in the answer of the prompt by the LLM."}],
                close: true,
                error: "null | text string of the failure mode."
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
          const {
            message,
            mode = "query",
            attachments = [],
            reset = false,
          } = reqBody(request);
          const workspace = response.locals.targetWorkspace;
          const thread = response.locals.targetThread;

          if ((!message?.length || !VALID_CHAT_MODE.includes(mode)) && !reset) {
            response.status(400).json({
              id: uuidv4(),
              type: "abort",
              textResponse: null,
              sources: [],
              close: true,
              error: !message?.length
                ? "Message is empty"
                : `${mode} is not a valid mode.`,
            });
            return;
          }

          const result = await ApiChatHandler.chatSync({
            principal: response.locals.principal,
            workspace,
            message,
            mode,
            user: null,
            thread,
            attachments,
            reset,
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
            threadName: thread?.name,
            userId: null,
          });
          response.status(200).json({ ...result });
        } catch (e) {
          console.error(e.message, e);
          response.status(500).json({
            id: uuidv4(),
            type: "abort",
            textResponse: null,
            sources: [],
            close: true,
            error: e.message,
          });
        }
      }
    )
  );

  app.post(
    "/v1/workspace/:slug/thread/:threadSlug/stream-chat",
    ...withRoutePolicy(
      {
        method: "POST",
        path: "/api/v1/workspace/:slug/thread/:threadSlug/stream-chat",
        routeId: "api.workspace-thread.chat.stream",
        plane: "content",
        category: "workspace_thread_api",
        responsePolicy: "streaming_chat_content",
        principalAccess: {
          workspace_service: ["workspace:api_sessions:write"],
        },
      },
      [
        validApiKey,
        rejectExplicitUserTargeting,
        loadTargetWorkspace,
        loadTargetThread,
        requireWorkspaceServiceThreadAccess("workspace:api_sessions:write"),
      ],
      async (request, response) => {
        /*
      #swagger.tags = ['Workspace Threads']
      #swagger.description = 'Stream chat with a workspace thread'
      #swagger.parameters['slug'] = {
          in: 'path',
          description: 'Unique slug of workspace',
          required: true,
          type: 'string'
      }
      #swagger.parameters['threadSlug'] = {
          in: 'path',
          description: 'Unique slug of thread',
          required: true,
          type: 'string'
      }
      #swagger.requestBody = {
        description: 'Send a prompt to the workspace thread and the type of conversation (query or chat).',
        required: true,
        content: {
          "application/json": {
            example: {
              message: "What is AnythingLLM?",
              mode: "query | chat",
              userId: 1,
              attachments: [
               {
                 name: "image.png",
                 mime: "image/png",
                 contentString: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
               },
               {
                 name: "this is a document.pdf",
                 mime: "application/anythingllm-document",
                 contentString: "data:application/pdf;base64,iVBORw0KGgoAAAANSUhEUgAA..."
               }
              ],
              reset: false
            }
          }
        }
      }
      #swagger.responses[200] = {
        content: {
          "text/event-stream": {
            schema: {
              type: 'array',
              items: {
                  type: 'string',
              },
              example: [
                {
                  id: 'uuid-123',
                  type: "abort | textResponseChunk",
                  textResponse: "First chunk",
                  sources: [],
                  close: false,
                  error: "null | text string of the failure mode."
                },
                {
                  id: 'uuid-123',
                  type: "abort | textResponseChunk",
                  textResponse: "chunk two",
                  sources: [],
                  close: false,
                  error: "null | text string of the failure mode."
                },
                {
                  id: 'uuid-123',
                  type: "abort | textResponseChunk",
                  textResponse: "final chunk of LLM output!",
                  sources: [{title: "anythingllm.txt", chunk: "This is a context chunk used in the answer of the prompt by the LLM. This will only return in the final chunk."}],
                  close: true,
                  error: "null | text string of the failure mode."
                }
              ]
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
            message,
            mode = "query",
            attachments = [],
            reset = false,
          } = reqBody(request);
          const workspace = response.locals.targetWorkspace;
          const thread = response.locals.targetThread;

          if ((!message?.length || !VALID_CHAT_MODE.includes(mode)) && !reset) {
            response.status(400).json({
              id: uuidv4(),
              type: "abort",
              textResponse: null,
              sources: [],
              close: true,
              error: !message?.length
                ? "Message is empty"
                : `${mode} is not a valid mode.`,
            });
            return;
          }

          response.setHeader("Cache-Control", "no-cache");
          response.setHeader("Content-Type", "text/event-stream");
          response.setHeader("Access-Control-Allow-Origin", "*");
          response.setHeader("Connection", "keep-alive");
          response.flushHeaders();

          await ApiChatHandler.streamChat({
            principal: response.locals.principal,
            response,
            workspace,
            message,
            mode,
            user: null,
            thread,
            attachments,
            reset,
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
            threadName: thread?.name,
            userId: null,
          });
          response.end();
        } catch (e) {
          console.error(e.message, e);
          writeResponseChunk(response, {
            id: uuidv4(),
            type: "abort",
            textResponse: null,
            sources: [],
            close: true,
            error: e.message,
          });
          response.end();
        }
      }
    )
  );
}

module.exports = { apiWorkspaceThreadEndpoints };
