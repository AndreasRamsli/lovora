const { v4: uuidv4 } = require("uuid");
const { reqBody, userFromSession, multiUserMode } = require("../utils/http");
const { validatedRequest } = require("../utils/middleware/validatedRequest");
const { Telemetry } = require("../models/telemetry");
const { streamChatWithWorkspace } = require("../utils/chats/stream");
const {
  ROLES,
  flexUserRoleValid,
} = require("../utils/middleware/multiUserProtected");
const { EventLogs } = require("../models/eventLogs");
const {
  validWorkspaceAndThreadSlug,
  validWorkspaceSlug,
} = require("../utils/middleware/validWorkspace");
const { writeResponseChunk } = require("../utils/helpers/chat/responses");
const { WorkspaceThread } = require("../models/workspaceThread");
const { User } = require("../models/user");
const truncate = require("truncate");
const { getModelTag } = require("./utils");
const { withRoutePolicy } = require("../utils/privacy/routePolicy");

function chatEndpoints(app) {
  if (!app) return;

  app.post(
    "/workspace/:slug/stream-chat",
    ...withRoutePolicy(
      {
        method: "POST",
        path: "/api/workspace/:slug/stream-chat",
        routeId: "workspace.chat.stream",
        plane: "content",
        category: "chat_stream",
        responsePolicy: "streaming_chat_content",
      },
      [validatedRequest, flexUserRoleValid([ROLES.all]), validWorkspaceSlug],
      async (request, response) => {
        try {
          const user = await userFromSession(request, response);
          const { message, attachments = [] } = reqBody(request);
          const workspace = response.locals.workspace;

          if (typeof message !== "string" || message.trim().length === 0) {
            response.status(400).json({
              id: uuidv4(),
              type: "abort",
              textResponse: null,
              sources: [],
              close: true,
              error: "Message is empty.",
            });
            return;
          }

          response.setHeader("Cache-Control", "no-cache");
          response.setHeader("Content-Type", "text/event-stream");
          response.setHeader("Access-Control-Allow-Origin", "*");
          response.setHeader("Connection", "keep-alive");
          response.flushHeaders();

          const chatAccessState = multiUserMode(response)
            ? await User.getChatAccessState(user)
            : { allowed: true, reason: "single_user_mode", quota: null };
          if (multiUserMode(response) && !chatAccessState.allowed) {
            const isQuotaReached = chatAccessState.reason === "quota_reached";
            const quota = chatAccessState.quota || null;
            const limit = quota?.limit ?? 0;
            const windowHours = quota?.windowHours ?? 0;
            const humanMessage = isQuotaReached
              ? `You have reached your free chat limit of ${limit} messages in ${windowHours} hours. Please upgrade to continue.`
              : "Chat access is not available for this account.";
            writeResponseChunk(response, {
              id: uuidv4(),
              type: "abort",
              textResponse: null,
              sources: [],
              close: true,
              ...(isQuotaReached ? { errorCode: "CHAT_QUOTA_REACHED" } : {}),
              error: humanMessage,
              ...(isQuotaReached ? { quota } : {}),
            });
            return;
          }

          await streamChatWithWorkspace(
            response,
            workspace,
            message,
            workspace?.chatMode,
            user,
            null,
            attachments
          );
          await Telemetry.sendTelemetry("sent_chat", {
            multiUserMode: multiUserMode(response),
            LLMSelection: process.env.LLM_PROVIDER || "openai",
            Embedder: process.env.EMBEDDING_ENGINE || "inherit",
            VectorDbSelection: process.env.VECTOR_DB || "lancedb",
            multiModal: Array.isArray(attachments) && attachments?.length !== 0,
            TTSSelection: process.env.TTS_PROVIDER || "native",
            LLMModel: getModelTag(),
          });

          await EventLogs.logEvent(
            "sent_chat",
            {
              workspaceName: workspace?.name,
              chatModel: workspace?.chatModel || "System Default",
            },
            user?.id
          );
          response.end();
        } catch (e) {
          console.error(e);
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

  app.post(
    "/workspace/:slug/thread/:threadSlug/stream-chat",
    ...withRoutePolicy(
      {
        method: "POST",
        path: "/api/workspace/:slug/thread/:threadSlug/stream-chat",
        routeId: "workspace.thread.chat.stream",
        plane: "content",
        category: "chat_stream",
        responsePolicy: "streaming_chat_content",
      },
      [
        validatedRequest,
        flexUserRoleValid([ROLES.all]),
        validWorkspaceAndThreadSlug,
      ],
      async (request, response) => {
        try {
          const user = await userFromSession(request, response);
          const { message, attachments = [] } = reqBody(request);
          const workspace = response.locals.workspace;
          const thread = response.locals.thread;

          if (typeof message !== "string" || message.trim().length === 0) {
            response.status(400).json({
              id: uuidv4(),
              type: "abort",
              textResponse: null,
              sources: [],
              close: true,
              error: "Message is empty.",
            });
            return;
          }

          response.setHeader("Cache-Control", "no-cache");
          response.setHeader("Content-Type", "text/event-stream");
          response.setHeader("Access-Control-Allow-Origin", "*");
          response.setHeader("Connection", "keep-alive");
          response.flushHeaders();

          const chatAccessState = multiUserMode(response)
            ? await User.getChatAccessState(user)
            : { allowed: true, reason: "single_user_mode", quota: null };
          if (multiUserMode(response) && !chatAccessState.allowed) {
            const isQuotaReached = chatAccessState.reason === "quota_reached";
            const quota = chatAccessState.quota || null;
            const limit = quota?.limit ?? 0;
            const windowHours = quota?.windowHours ?? 0;
            const humanMessage = isQuotaReached
              ? `You have reached your free chat limit of ${limit} messages in ${windowHours} hours. Please upgrade to continue.`
              : "Chat access is not available for this account.";
            writeResponseChunk(response, {
              id: uuidv4(),
              type: "abort",
              textResponse: null,
              sources: [],
              close: true,
              ...(isQuotaReached ? { errorCode: "CHAT_QUOTA_REACHED" } : {}),
              error: humanMessage,
              ...(isQuotaReached ? { quota } : {}),
            });
            return;
          }

          await streamChatWithWorkspace(
            response,
            workspace,
            message,
            workspace?.chatMode,
            user,
            thread,
            attachments
          );

          // If thread was renamed emit event to frontend via special `action` response.
          await WorkspaceThread.autoRenameThread({
            thread,
            workspace,
            user,
            newName: truncate(message, 22),
            onRename: (thread) => {
              writeResponseChunk(response, {
                action: "rename_thread",
                thread: {
                  slug: thread.slug,
                  name: thread.name,
                },
              });
            },
          });

          await Telemetry.sendTelemetry("sent_chat", {
            multiUserMode: multiUserMode(response),
            LLMSelection: process.env.LLM_PROVIDER || "openai",
            Embedder: process.env.EMBEDDING_ENGINE || "inherit",
            VectorDbSelection: process.env.VECTOR_DB || "lancedb",
            multiModal: Array.isArray(attachments) && attachments?.length !== 0,
            TTSSelection: process.env.TTS_PROVIDER || "native",
            LLMModel: getModelTag(),
          });

          await EventLogs.logEvent(
            "sent_chat",
            {
              workspaceName: workspace.name,
              thread: thread.name,
              chatModel: workspace?.chatModel || "System Default",
            },
            user?.id
          );
          response.end();
        } catch (e) {
          console.error(e);
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

module.exports = { chatEndpoints };
