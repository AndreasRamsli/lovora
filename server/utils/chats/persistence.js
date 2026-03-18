const { EventLogs } = require("../../models/eventLogs");
const { ConversationFlags } = require("../../models/conversationFlags");
const { WorkspaceChats } = require("../../models/workspaceChats");
const {
  ConversationModerationService,
} = require("../moderation/ConversationModerationService");

function buildProviderSessionId({
  workspace,
  user = null,
  thread = null,
  apiSessionId = null,
}) {
  if (apiSessionId) return `workspace:${workspace.slug}:api:${apiSessionId}`;
  if (thread?.slug) return `workspace:${workspace.slug}:thread:${thread.slug}`;
  return `workspace:${workspace.slug}:user:${user?.id ?? "single-user"}:default`;
}

async function persistAndModerateConversation({
  workspace,
  prompt,
  response = {},
  user = null,
  thread = null,
  include = true,
  apiSessionId = null,
  moderationMessage = null,
}) {
  const moderationResult = ConversationModerationService.classify(
    moderationMessage ?? prompt
  );
  const { chat, message } = await WorkspaceChats.new({
    workspaceId: workspace.id,
    prompt,
    response,
    user,
    threadId: thread?.id || null,
    include,
    apiSessionId,
  });

  if (!chat) {
    return { chat: null, error: message, moderationResult };
  }

  if (moderationResult.disposition !== "review") {
    return { chat, error: null, moderationResult };
  }

  try {
    const { flag, error } = await ConversationFlags.createForChat({
      sourceType: "workspace_chat",
      chatId: chat.id,
      userId: user?.id || null,
      workspaceId: workspace.id,
      threadId: thread?.id || null,
      riskLevel: moderationResult.riskLevel,
      categories: moderationResult.categories,
      matchedRules: moderationResult.matchedRules,
    });

    if (!flag || error) return { chat, error: null, moderationResult };

    await EventLogs.logEvent(
      "conversation_flagged",
      {
        caseId: flag.id,
        sourceType: "workspace_chat",
        chatId: chat.id,
        workspaceId: workspace.id,
        threadId: thread?.id || null,
        apiSessionId: apiSessionId || null,
        categories: moderationResult.categories,
        matchedRules: moderationResult.matchedRules,
      },
      user?.id || null
    );
  } catch (error) {
    console.error(error.message, error);
  }

  return { chat, error: null, moderationResult };
}

module.exports = {
  buildProviderSessionId,
  persistAndModerateConversation,
};
