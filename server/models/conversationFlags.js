const prisma = require("../utils/prisma");
const { safeJsonParse } = require("../utils/http");

function parseArray(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return safeJsonParse(value, []);
}

function serializeArray(value = []) {
  return JSON.stringify(Array.isArray(value) ? value : []);
}

function normalizeRule(rule = {}) {
  if (typeof rule === "string") return { id: rule, category: "unknown" };
  return {
    id: String(rule.id || "unknown"),
    category: String(rule.category || "unknown"),
  };
}

function normalizedSourceType(value = null) {
  return String(value || "workspace_chat");
}

function parsedResponse(response = "{}") {
  return safeJsonParse(response, {});
}

function responseMetadata(response = "{}") {
  const parsed = parsedResponse(response);
  return {
    provider: parsed?.metrics?.provider || null,
    model: parsed?.metrics?.model || null,
    attachmentCount: Array.isArray(parsed?.attachments)
      ? parsed.attachments.length
      : 0,
  };
}

function sanitizeAttachments(attachments = []) {
  if (!Array.isArray(attachments)) return [];
  return attachments.map((attachment = {}) => ({
    name: attachment?.name || "attachment",
    mime: attachment?.mime || null,
  }));
}

const ConversationFlags = {
  createForChat: async function ({
    sourceType = "workspace_chat",
    chatId,
    userId = null,
    workspaceId,
    threadId = null,
    riskLevel = "review",
    categories = [],
    matchedRules = [],
  }) {
    try {
      const flag = await prisma.conversation_flags.upsert({
        where: { chatId: Number(chatId) },
        update: {
          sourceType,
          userId: userId ? Number(userId) : null,
          workspaceId: Number(workspaceId),
          threadId: threadId ? Number(threadId) : null,
          riskLevel,
          categories: serializeArray(categories),
          matchedRules: serializeArray(
            matchedRules.map((rule) => normalizeRule(rule))
          ),
          status: "open",
          resolution: "none",
          reviewedBy: null,
          reviewedAt: null,
          reviewNote: null,
        },
        create: {
          sourceType,
          chatId: Number(chatId),
          userId: userId ? Number(userId) : null,
          workspaceId: Number(workspaceId),
          threadId: threadId ? Number(threadId) : null,
          riskLevel,
          categories: serializeArray(categories),
          matchedRules: serializeArray(
            matchedRules.map((rule) => normalizeRule(rule))
          ),
        },
      });
      return { flag, error: null };
    } catch (error) {
      console.error(error.message);
      return { flag: null, error: error.message };
    }
  },

  get: async function (clause = {}, include = undefined) {
    try {
      return await prisma.conversation_flags.findFirst({
        where: clause,
        ...(include ? { include } : {}),
      });
    } catch (error) {
      console.error(error.message);
      return null;
    }
  },

  where: async function (
    clause = {},
    limit = null,
    orderBy = null,
    offset = null,
    include = undefined
  ) {
    try {
      return await prisma.conversation_flags.findMany({
        where: clause,
        ...(limit !== null ? { take: limit } : {}),
        ...(offset !== null ? { skip: offset } : {}),
        ...(orderBy !== null ? { orderBy } : {}),
        ...(include ? { include } : {}),
      });
    } catch (error) {
      console.error(error.message);
      return [];
    }
  },

  count: async function (clause = {}) {
    try {
      return await prisma.conversation_flags.count({ where: clause });
    } catch (error) {
      console.error(error.message);
      return 0;
    }
  },

  openCountsByUserIds: async function (userIds = []) {
    const validUserIds = [...new Set(userIds.filter(Boolean).map(Number))];
    if (validUserIds.length === 0) return new Map();

    const flags = await this.where(
      {
        userId: { in: validUserIds },
        status: "open",
      },
      null,
      null,
      null
    );

    return flags.reduce((map, flag) => {
      map.set(flag.userId, (map.get(flag.userId) || 0) + 1);
      return map;
    }, new Map());
  },

  _hydrateWorkspaceChatMetadata: async function (chats = []) {
    const { Workspace } = require("./workspace");
    const { WorkspaceThread } = require("./workspaceThread");

    if (chats.length === 0) return [];

    const workspaceIds = [...new Set(chats.map((chat) => chat.workspaceId))];
    const threadIds = [
      ...new Set(chats.map((chat) => chat.thread_id).filter(Boolean)),
    ];
    const repeatFlagCountByUserId = await this.openCountsByUserIds(
      chats.map((chat) => chat.user_id)
    );

    const workspaces = workspaceIds.length
      ? await Workspace.where({ id: { in: workspaceIds } }, null, null)
      : [];
    const workspaceMap = new Map(
      workspaces.map((workspace) => [workspace.id, workspace])
    );

    const threads = threadIds.length
      ? await WorkspaceThread.where({ id: { in: threadIds } }, null, null)
      : [];
    const threadMap = new Map(threads.map((thread) => [thread.id, thread]));

    return chats.map((chat) => {
      const workspace = workspaceMap.get(chat.workspaceId);
      const thread = chat.thread_id ? threadMap.get(chat.thread_id) : null;
      const flag = chat.conversation_flag;
      const { provider, model, attachmentCount } = responseMetadata(
        chat.response
      );

      return {
        id: chat.id,
        chatId: chat.id,
        user: chat.users
          ? {
              id: chat.users.id,
              username: chat.users.username,
            }
          : {
              id: null,
              username: chat.api_session_id !== null ? "API" : "unknown user",
            },
        workspace: workspace
          ? {
              id: workspace.id,
              name: workspace.name,
              slug: workspace.slug,
            }
          : {
              id: chat.workspaceId,
              name: "deleted workspace",
              slug: null,
            },
        thread: thread
          ? {
              id: thread.id,
              slug: thread.slug,
              name: thread.name,
            }
          : null,
        apiSessionId: chat.api_session_id || null,
        createdAt: chat.createdAt,
        provider,
        model,
        attachmentCount,
        riskLevel: flag?.riskLevel || "safe",
        categories: parseArray(flag?.categories),
        flagStatus: flag?.status || null,
        repeatFlagCount: chat.user_id
          ? repeatFlagCountByUserId.get(chat.user_id) || 0
          : 0,
        userSuspended: Boolean(chat.users?.suspended),
      };
    });
  },

  listMetadataByClause: async function ({
    clause = {},
    limit = 20,
    offset = 0,
    orderBy = { id: "desc" },
  } = {}) {
    const chats = await prisma.workspace_chats.findMany({
      where: clause,
      ...(limit !== null ? { take: limit } : {}),
      ...(offset !== null ? { skip: offset } : {}),
      orderBy,
      include: {
        users: true,
        conversation_flag: true,
      },
    });

    return await this._hydrateWorkspaceChatMetadata(chats);
  },

  listMetadata: async function ({
    limit = 20,
    offset = 0,
    orderBy = { id: "desc" },
  } = {}) {
    return await this.listMetadataByClause({
      clause: {},
      limit,
      offset,
      orderBy,
    });
  },

  listReviewCases: async function ({
    status = "open",
    limit = 20,
    offset = 0,
    orderBy = { id: "desc" },
  } = {}) {
    const whereClause = status === "all" ? {} : { status };
    const results = await this.where(whereClause, limit, orderBy, offset, {
      user: true,
      workspace: true,
      thread: true,
      reviewer: true,
      chat: true,
    });

    return results.map((flag) => ({
      id: flag.id,
      sourceType: normalizedSourceType(flag.sourceType),
      chatId: flag.chatId,
      flaggedChatId: flag.chatId,
      userId: flag.userId,
      workspaceId: flag.workspaceId,
      threadId: flag.threadId,
      riskLevel: flag.riskLevel,
      categories: parseArray(flag.categories),
      matchedRules: parseArray(flag.matchedRules).map((rule) =>
        normalizeRule(rule)
      ),
      status: flag.status,
      resolution: flag.resolution,
      reviewedBy: flag.reviewer
        ? {
            id: flag.reviewer.id,
            username: flag.reviewer.username,
          }
        : null,
      reviewedAt: flag.reviewedAt,
      reviewNote: flag.reviewNote,
      createdAt: flag.createdAt,
      user: flag.user
        ? {
            id: flag.user.id,
            username: flag.user.username,
            suspended: Boolean(flag.user.suspended),
          }
        : null,
      workspace: flag.workspace
        ? {
            id: flag.workspace.id,
            name: flag.workspace.name,
            slug: flag.workspace.slug,
          }
        : null,
      thread: flag.thread
        ? {
            id: flag.thread.id,
            slug: flag.thread.slug,
            name: flag.thread.name,
          }
        : null,
    }));
  },

  canViewFlaggedConversation: function (actor = null, flag = null) {
    if (!actor || !flag) return false;
    if (!["admin", "manager"].includes(actor.role)) return false;
    if (flag.status !== "open") return false;
    return normalizedSourceType(flag.sourceType) === "workspace_chat";
  },

  getReviewConversation: async function (id) {
    try {
      const flag = await prisma.conversation_flags.findFirst({
        where: { id: Number(id) },
        include: {
          chat: true,
          user: true,
          workspace: true,
          thread: true,
          reviewer: true,
        },
      });
      if (!flag || flag.status !== "open") return null;

      const clause = {
        workspaceId: flag.workspaceId,
        include: true,
        ...(flag.threadId ? { thread_id: flag.threadId } : { thread_id: null }),
      };

      if (flag.chat?.api_session_id) {
        clause.user_id = null;
        clause.api_session_id = flag.chat.api_session_id;
      } else {
        clause.user_id = flag.userId || null;
        clause.api_session_id = null;
      }

      const chats = await prisma.workspace_chats.findMany({
        where: clause,
        orderBy: { id: "asc" },
      });

      return {
        caseId: flag.id,
        workspace: flag.workspace
          ? {
              id: flag.workspace.id,
              name: flag.workspace.name,
              slug: flag.workspace.slug,
            }
          : null,
        thread: flag.thread
          ? {
              id: flag.thread.id,
              name: flag.thread.name,
              slug: flag.thread.slug,
            }
          : null,
        flag: {
          id: flag.id,
          sourceType: normalizedSourceType(flag.sourceType),
          chatId: flag.chatId,
          flaggedChatId: flag.chatId,
          userId: flag.userId,
          workspaceId: flag.workspaceId,
          threadId: flag.threadId,
          riskLevel: flag.riskLevel,
          categories: parseArray(flag.categories),
          matchedRules: parseArray(flag.matchedRules).map((rule) =>
            normalizeRule(rule)
          ),
          status: flag.status,
          resolution: flag.resolution,
          createdAt: flag.createdAt,
        },
        messages: chats.map((chat) => {
          const response = parsedResponse(chat.response);
          return {
            id: chat.id,
            prompt: chat.prompt,
            responseText: response?.text || "",
            attachments: sanitizeAttachments(response?.attachments),
            createdAt: chat.createdAt,
            provider: response?.metrics?.provider || null,
            model: response?.metrics?.model || null,
            isFlaggedChat: chat.id === flag.chatId,
          };
        }),
      };
    } catch (error) {
      console.error(error.message);
      return null;
    }
  },

  dismiss: async function (id, actorId, reviewNote = "") {
    try {
      return await prisma.conversation_flags.update({
        where: { id: Number(id) },
        data: {
          status: "dismissed",
          resolution: "not_actionable",
          reviewedBy: actorId ? Number(actorId) : null,
          reviewedAt: new Date(),
          reviewNote: String(reviewNote || ""),
        },
      });
    } catch (error) {
      console.error(error.message);
      return null;
    }
  },

  suspendUser: async function (id, actorId, reviewNote = "") {
    try {
      const flag = await prisma.conversation_flags.findUnique({
        where: { id: Number(id) },
      });
      if (!flag?.userId) return null;

      const [, updatedFlag] = await prisma.$transaction([
        prisma.users.update({
          where: { id: Number(flag.userId) },
          data: { suspended: 1 },
        }),
        prisma.conversation_flags.update({
          where: { id: Number(id) },
          data: {
            status: "resolved",
            resolution: "suspended",
            reviewedBy: actorId ? Number(actorId) : null,
            reviewedAt: new Date(),
            reviewNote: String(reviewNote || ""),
          },
        }),
      ]);

      return updatedFlag;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  },

  unsuspendUser: async function (id, actorId, reviewNote = "") {
    try {
      const flag = await prisma.conversation_flags.findUnique({
        where: { id: Number(id) },
      });
      if (!flag?.userId) return null;

      const [, updatedFlag] = await prisma.$transaction([
        prisma.users.update({
          where: { id: Number(flag.userId) },
          data: { suspended: 0 },
        }),
        prisma.conversation_flags.update({
          where: { id: Number(id) },
          data: {
            reviewedBy: actorId ? Number(actorId) : null,
            reviewedAt: new Date(),
            reviewNote: String(reviewNote || ""),
          },
        }),
      ]);

      return updatedFlag;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  },
};

module.exports = {
  ConversationFlags,
};
