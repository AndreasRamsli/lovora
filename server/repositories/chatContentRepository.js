const { WorkspaceChats } = require("../models/workspaceChats");
const { canReadChatContent } = require("../utils/auth/principals");
const {
  assertContentPlane,
} = require("../utils/privacy/requestSecurityContext");

function forbiddenError(message = "Forbidden") {
  const error = new Error(message);
  error.status = 403;
  return error;
}

function resourceFilter(resource = {}) {
  return {
    user_id: resource.ownerUserId ?? null,
    api_session_id: resource.apiSessionId ?? null,
  };
}

function assertReadableResource(
  ctx = null,
  workspaceId = null,
  resource = null
) {
  if (!resource || typeof resource !== "object") {
    throw forbiddenError("Chat content resource required.");
  }

  if (Number(resource.workspaceId) !== Number(workspaceId)) {
    throw forbiddenError();
  }

  if (!canReadChatContent(ctx.principal, resource)) {
    throw forbiddenError();
  }

  return resource;
}

const ChatContentRepository = {
  async listDefaultThreadHistory(ctx, workspaceId, resource) {
    assertContentPlane(ctx);
    const resolvedResource = assertReadableResource(ctx, workspaceId, resource);

    return await WorkspaceChats.where(
      {
        workspaceId,
        thread_id: null,
        ...resourceFilter(resolvedResource),
        include: true,
      },
      null,
      { id: "asc" }
    );
  },

  async listThreadHistory(ctx, workspaceId, threadId, resource) {
    assertContentPlane(ctx);
    const resolvedResource = assertReadableResource(ctx, workspaceId, resource);

    return await WorkspaceChats.where(
      {
        workspaceId,
        thread_id: threadId,
        ...resourceFilter(resolvedResource),
        include: true,
      },
      null,
      { id: "asc" }
    );
  },
};

module.exports = {
  ChatContentRepository,
};
