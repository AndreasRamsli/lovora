function buildWorkspaceChatsRequest({ app, request, workspaceSlug, actor }) {
  return request(app)
    .get(`/api/workspace/${workspaceSlug}/chats`)
    .set(actor.headers);
}

function buildConversationFlagsRequest({ app, request, actor }) {
  return request(app)
    .post("/api/system/conversation-flags")
    .set(actor.headers)
    .send({ offset: 0, limit: 20, status: "open" });
}

function buildApiWorkspaceChatsRequest({ app, request, workspaceSlug, actor }) {
  return request(app)
    .get(`/api/v1/workspace/${workspaceSlug}/chats`)
    .set(actor.headers);
}

module.exports = {
  buildWorkspaceChatsRequest,
  buildConversationFlagsRequest,
  buildApiWorkspaceChatsRequest,
};
