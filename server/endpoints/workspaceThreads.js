const {
  multiUserMode,
  userFromSession,
  reqBody,
  safeJsonParse,
} = require("../utils/http");
const { validatedRequest } = require("../utils/middleware/validatedRequest");
const { Telemetry } = require("../models/telemetry");
const {
  flexUserRoleValid,
  ROLES,
} = require("../utils/middleware/multiUserProtected");
const { EventLogs } = require("../models/eventLogs");
const { WorkspaceThread } = require("../models/workspaceThread");
const {
  createRequestSecurityContext,
} = require("../utils/privacy/requestSecurityContext");
const {
  validWorkspaceSlug,
  validWorkspaceAndThreadSlug,
  validWorkspaceAndThreadSlugByMembership,
} = require("../utils/middleware/validWorkspace");
const { WorkspaceChats } = require("../models/workspaceChats");
const {
  ChatContentRepository,
} = require("../repositories/chatContentRepository");
const { convertToChatHistory } = require("../utils/helpers/chat/responses");
const { getModelTag } = require("./utils");
const { withRoutePolicy } = require("../utils/privacy/routePolicy");

function workspaceThreadEndpoints(app) {
  if (!app) return;

  app.post(
    "/workspace/:slug/thread/new",
    ...withRoutePolicy(
      {
        method: "POST",
        path: "/api/workspace/:slug/thread/new",
        routeId: "workspace.thread.create",
        plane: "control",
        category: "workspace_thread",
        responsePolicy: "metadata_only",
      },
      [validatedRequest, flexUserRoleValid([ROLES.all]), validWorkspaceSlug],
      async (request, response) => {
        try {
          const user = await userFromSession(request, response);
          const workspace = response.locals.workspace;
          const { thread, message } = await WorkspaceThread.new(
            workspace,
            user?.id
          );
          await Telemetry.sendTelemetry(
            "workspace_thread_created",
            {
              multiUserMode: multiUserMode(response),
              LLMSelection: process.env.LLM_PROVIDER || "openai",
              Embedder: process.env.EMBEDDING_ENGINE || "inherit",
              VectorDbSelection: process.env.VECTOR_DB || "lancedb",
              TTSSelection: process.env.TTS_PROVIDER || "native",
              LLMModel: getModelTag(),
            },
            user?.id
          );

          await EventLogs.logEvent(
            "workspace_thread_created",
            {
              workspaceName: workspace?.name || "Unknown Workspace",
            },
            user?.id
          );
          response.status(200).json({ thread, message });
        } catch (e) {
          if (e?.status === 403) {
            response.sendStatus(403).end();
            return;
          }
          console.error(e.message, e);
          response.sendStatus(500).end();
        }
      }
    )
  );

  app.get(
    "/workspace/:slug/threads",
    ...withRoutePolicy(
      {
        method: "GET",
        path: "/api/workspace/:slug/threads",
        routeId: "workspace.threads.list",
        plane: "control",
        category: "workspace_thread",
        responsePolicy: "metadata_only",
      },
      [validatedRequest, flexUserRoleValid([ROLES.all]), validWorkspaceSlug],
      async (request, response) => {
        try {
          const user = await userFromSession(request, response);
          const workspace = response.locals.workspace;
          const threads = await WorkspaceThread.where({
            workspace_id: workspace.id,
            user_id: user?.id || null,
          });
          response.status(200).json({ threads });
        } catch (e) {
          if (e?.status) {
            response.sendStatus(e.status).end();
            return;
          }
          console.error(e.message, e);
          response.sendStatus(500).end();
        }
      }
    )
  );

  app.delete(
    "/workspace/:slug/thread/:threadSlug",
    ...withRoutePolicy(
      {
        method: "DELETE",
        path: "/api/workspace/:slug/thread/:threadSlug",
        routeId: "workspace.thread.delete",
        plane: "control",
        category: "workspace_thread",
        responsePolicy: "metadata_only",
      },
      [
        validatedRequest,
        flexUserRoleValid([ROLES.all]),
        validWorkspaceAndThreadSlug,
      ],
      async (_, response) => {
        try {
          const thread = response.locals.thread;
          await WorkspaceThread.delete({ id: thread.id });
          response.sendStatus(200).end();
        } catch (e) {
          console.error(e.message, e);
          response.sendStatus(e?.status || 500).end();
        }
      }
    )
  );

  app.delete(
    "/workspace/:slug/thread-bulk-delete",
    ...withRoutePolicy(
      {
        method: "DELETE",
        path: "/api/workspace/:slug/thread-bulk-delete",
        routeId: "workspace.thread.bulk-delete",
        plane: "control",
        category: "workspace_thread",
        responsePolicy: "metadata_only",
      },
      [validatedRequest, flexUserRoleValid([ROLES.all]), validWorkspaceSlug],
      async (request, response) => {
        try {
          const { slugs = [] } = reqBody(request);
          if (slugs.length === 0) return response.sendStatus(200).end();

          const user = await userFromSession(request, response);
          const workspace = response.locals.workspace;
          await WorkspaceThread.delete({
            slug: { in: slugs },
            user_id: user?.id ?? null,
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
    "/workspace/:slug/thread/:threadSlug/chats",
    ...withRoutePolicy(
      {
        method: "GET",
        path: "/api/workspace/:slug/thread/:threadSlug/chats",
        routeId: "workspace.thread.history",
        plane: "content",
        category: "chat_history",
        responsePolicy: "raw_chat_content",
      },
      [
        validatedRequest,
        flexUserRoleValid([ROLES.all]),
        validWorkspaceAndThreadSlugByMembership,
      ],
      async (request, response) => {
        try {
          const user = await userFromSession(request, response);
          const workspace = response.locals.workspace;
          const thread = response.locals.thread;
          const history = await ChatContentRepository.listThreadHistory(
            response.locals.createRouteSecurityContext?.() ||
              createRequestSecurityContext({
                requestId: request.header("X-Request-Id") || null,
                routeId: "workspace.thread.history",
                plane: "content",
                principal: response.locals.principal,
              }),
            workspace.id,
            thread.id,
            {
              ownerUserId: user?.id ?? null,
              workspaceId: workspace.id,
              apiSessionId: null,
            }
          );

          response.status(200).json({ history: convertToChatHistory(history) });
        } catch (e) {
          console.error(e.message, e);
          response.sendStatus(e?.status || 500).end();
        }
      }
    )
  );

  app.post(
    "/workspace/:slug/thread/:threadSlug/update",
    ...withRoutePolicy(
      {
        method: "POST",
        path: "/api/workspace/:slug/thread/:threadSlug/update",
        routeId: "workspace.thread.update",
        plane: "control",
        category: "workspace_thread",
        responsePolicy: "metadata_only",
      },
      [
        validatedRequest,
        flexUserRoleValid([ROLES.all]),
        validWorkspaceAndThreadSlug,
      ],
      async (request, response) => {
        try {
          const data = reqBody(request);
          const currentThread = response.locals.thread;
          const { thread, message } = await WorkspaceThread.update(
            currentThread,
            data
          );
          response.status(200).json({ thread, message });
        } catch (e) {
          console.error(e.message, e);
          response.sendStatus(500).end();
        }
      }
    )
  );

  app.delete(
    "/workspace/:slug/thread/:threadSlug/delete-edited-chats",
    ...withRoutePolicy(
      {
        method: "DELETE",
        path: "/api/workspace/:slug/thread/:threadSlug/delete-edited-chats",
        routeId: "workspace.thread.delete-edited-chats",
        plane: "control",
        category: "chat_history",
        responsePolicy: "metadata_only",
      },
      [
        validatedRequest,
        flexUserRoleValid([ROLES.all]),
        validWorkspaceAndThreadSlug,
      ],
      async (request, response) => {
        try {
          const { startingId } = reqBody(request);
          const user = await userFromSession(request, response);
          const workspace = response.locals.workspace;
          const thread = response.locals.thread;

          await WorkspaceChats.delete({
            workspaceId: Number(workspace.id),
            thread_id: Number(thread.id),
            user_id: user?.id,
            id: { gte: Number(startingId) },
          });

          response.sendStatus(200).end();
        } catch (e) {
          console.error(e.message, e);
          response.sendStatus(500).end();
        }
      }
    )
  );

  app.post(
    "/workspace/:slug/thread/:threadSlug/update-chat",
    ...withRoutePolicy(
      {
        method: "POST",
        path: "/api/workspace/:slug/thread/:threadSlug/update-chat",
        routeId: "workspace.thread.update-chat",
        plane: "control",
        category: "chat_history",
        responsePolicy: "metadata_only",
      },
      [
        validatedRequest,
        flexUserRoleValid([ROLES.all]),
        validWorkspaceAndThreadSlug,
      ],
      async (request, response) => {
        try {
          const {
            chatId,
            newText = null,
            role = "assistant",
          } = reqBody(request);
          if (!newText || !String(newText).trim())
            throw new Error("Cannot save empty edit");

          const user = await userFromSession(request, response);
          const workspace = response.locals.workspace;
          const thread = response.locals.thread;
          const existingChat = await WorkspaceChats.get({
            workspaceId: workspace.id,
            thread_id: thread.id,
            user_id: user?.id,
            id: Number(chatId),
          });
          if (!existingChat) throw new Error("Invalid chat.");

          if (role === "user") {
            await WorkspaceChats._update(existingChat.id, {
              prompt: String(newText),
            });
          } else {
            const chatResponse = safeJsonParse(existingChat.response, null);
            if (!chatResponse) throw new Error("Failed to parse chat response");
            await WorkspaceChats._update(existingChat.id, {
              response: JSON.stringify({
                ...chatResponse,
                text: String(newText),
              }),
            });
          }

          response.sendStatus(200).end();
        } catch (e) {
          console.error(e.message, e);
          response.sendStatus(500).end();
        }
      }
    )
  );
}

module.exports = { workspaceThreadEndpoints };
