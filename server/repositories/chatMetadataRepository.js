const { ConversationFlags } = require("../models/conversationFlags");
const {
  isRequestSecurityContext,
} = require("../utils/privacy/requestSecurityContext");

function invalidMetadataRepositoryArgsError() {
  const error = new Error(
    "Metadata repository methods accept a single options object with optional requestContext."
  );
  error.status = 500;
  return error;
}

function normalizeOptions(argsLike, defaults = {}) {
  if (argsLike.length > 1) {
    throw invalidMetadataRepositoryArgsError();
  }

  const value = argsLike[0];
  if (value === undefined) return { ...defaults };

  if (isRequestSecurityContext(value)) {
    throw invalidMetadataRepositoryArgsError();
  }

  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    throw invalidMetadataRepositoryArgsError();
  }

  const { requestContext = null, ...options } = value;
  if (requestContext !== null && !isRequestSecurityContext(requestContext)) {
    throw invalidMetadataRepositoryArgsError();
  }

  return {
    ...defaults,
    ...options,
  };
}

function normalizeReviewCaseArgs(argsLike) {
  if (argsLike.length > 1) {
    throw invalidMetadataRepositoryArgsError();
  }

  const value = argsLike[0];
  if (value === undefined) {
    throw invalidMetadataRepositoryArgsError();
  }

  if (isRequestSecurityContext(value)) {
    throw invalidMetadataRepositoryArgsError();
  }

  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    const { requestContext = null, id } = value;
    if (requestContext !== null && !isRequestSecurityContext(requestContext)) {
      throw invalidMetadataRepositoryArgsError();
    }
    if (
      id === undefined ||
      id === null ||
      (typeof id === "object" && !Array.isArray(id))
    ) {
      throw invalidMetadataRepositoryArgsError();
    }
    return id;
  }

  return value;
}

const ChatMetadataRepository = {
  async listWorkspaceChats() {
    const {
      limit = 20,
      offset = 0,
      orderBy = { id: "desc" },
    } = normalizeOptions(arguments);

    return await ConversationFlags.listMetadata({ limit, offset, orderBy });
  },

  async listWorkspaceChatsByClause() {
    const {
      clause = {},
      limit = 20,
      offset = 0,
      orderBy = { id: "desc" },
    } = normalizeOptions(arguments);

    return await ConversationFlags.listMetadataByClause({
      clause,
      limit,
      offset,
      orderBy,
    });
  },

  async listReviewCases() {
    const {
      actor = null,
      status = "open",
      limit = 20,
      offset = 0,
      orderBy = { id: "desc" },
    } = normalizeOptions(arguments);

    return await ConversationFlags.listReviewCases({
      actor,
      status,
      limit,
      offset,
      orderBy,
    });
  },

  async getReviewCase() {
    const id = normalizeReviewCaseArgs(arguments);
    return await ConversationFlags.getReviewConversation(id);
  },
};

module.exports = {
  ChatMetadataRepository,
};
