const {
  buildApiWorkspaceChatsRequest,
  buildConversationFlagsRequest,
  buildWorkspaceChatsRequest,
} = require("./requestVariants");

function createActorIndex(actors = []) {
  const indexedActors = actors;

  for (const actor of actors) {
    indexedActors[actor.id] = actor;
  }

  indexedActors.memberUser = indexedActors.aliceUser || null;
  indexedActors.outsiderUser = indexedActors.bobUser || null;
  indexedActors.managementKey = indexedActors.apiManagementKey || null;

  return indexedActors;
}

function createActor({
  id,
  name,
  principalKind,
  authorization,
  allowedCanaries = [],
  requests = [],
}) {
  const actor = {
    id,
    name,
    principalKind,
    headers: { Authorization: authorization },
    allowedCanaries: new Set(allowedCanaries.filter(Boolean)),
  };

  actor.requests = requests.map(
    (builder) => (app, request) => builder(app, request, actor)
  );

  return actor;
}

function createPrivacyActors(fixtures) {
  const workspaceLegalAlpha =
    fixtures.workspaces.workspaceLegalAlpha ||
    fixtures.workspaces.assignedWorkspace;

  return createActorIndex([
    createActor({
      id: "aliceUser",
      name: "alice_user",
      principalKind: "user",
      authorization: fixtures.auth.alice || fixtures.auth.member,
      allowedCanaries: [
        fixtures.canaries.alicePrompt,
        fixtures.canaries.aliceResponse,
        fixtures.canaries.aliceThreadPrompt,
        fixtures.canaries.aliceThreadResponse,
        fixtures.canaries.aliceAttachmentName,
        fixtures.canaries.aliceAttachmentText,
        fixtures.canaries.retrievedSnippet,
      ],
      requests: [
        (app, request, actor) =>
          buildWorkspaceChatsRequest({
            app,
            request,
            workspaceSlug: workspaceLegalAlpha.slug,
            actor,
          }),
      ],
    }),
    createActor({
      id: "charlieUser",
      name: "charlie_user",
      principalKind: "user",
      authorization: fixtures.auth.charlie,
      allowedCanaries: [
        fixtures.canaries.charliePrompt,
        fixtures.canaries.charlieResponse,
      ],
      requests: [
        (app, request, actor) =>
          buildWorkspaceChatsRequest({
            app,
            request,
            workspaceSlug: workspaceLegalAlpha.slug,
            actor,
          }),
      ],
    }),
    createActor({
      id: "bobUser",
      name: "bob_user",
      principalKind: "user",
      authorization: fixtures.auth.bob || fixtures.auth.outsider,
      allowedCanaries: [],
      requests: [
        (app, request, actor) =>
          buildWorkspaceChatsRequest({
            app,
            request,
            workspaceSlug: workspaceLegalAlpha.slug,
            actor,
          }),
      ],
    }),
    createActor({
      id: "adminUser",
      name: "admin_user",
      principalKind: "admin",
      authorization: fixtures.auth.admin,
      allowedCanaries: [],
      requests: [
        (app, request, actor) =>
          buildConversationFlagsRequest({
            app,
            request,
            actor,
          }),
      ],
    }),
    createActor({
      id: "managerUser",
      name: "manager_user",
      principalKind: "manager",
      authorization: fixtures.auth.manager,
      allowedCanaries: [],
      requests: [
        (app, request, actor) =>
          buildConversationFlagsRequest({
            app,
            request,
            actor,
          }),
      ],
    }),
    createActor({
      id: "suspendedUser",
      name: "suspended_user",
      principalKind: "user",
      authorization: fixtures.auth.suspended,
      allowedCanaries: [],
      requests: [
        (app, request, actor) =>
          buildWorkspaceChatsRequest({
            app,
            request,
            workspaceSlug: workspaceLegalAlpha.slug,
            actor,
          }),
      ],
    }),
    createActor({
      id: "deletedUser",
      name: "deleted_user",
      principalKind: "deleted",
      authorization: fixtures.auth.deleted,
      allowedCanaries: [],
      requests: [
        (app, request, actor) =>
          buildWorkspaceChatsRequest({
            app,
            request,
            workspaceSlug: workspaceLegalAlpha.slug,
            actor,
          }),
      ],
    }),
    createActor({
      id: "delegatedAliceUser",
      name: "delegated_alice_user",
      principalKind: "delegated",
      authorization: fixtures.delegatedTokens.alice,
      allowedCanaries: [
        fixtures.canaries.alicePrompt,
        fixtures.canaries.aliceResponse,
        fixtures.canaries.aliceThreadPrompt,
        fixtures.canaries.aliceThreadResponse,
        fixtures.canaries.aliceAttachmentName,
        fixtures.canaries.aliceAttachmentText,
        fixtures.canaries.retrievedSnippet,
      ],
      requests: [
        (app, request, actor) =>
          buildWorkspaceChatsRequest({
            app,
            request,
            workspaceSlug: workspaceLegalAlpha.slug,
            actor,
          }),
      ],
    }),
    createActor({
      id: "delegatedCharlieUser",
      name: "delegated_charlie_user",
      principalKind: "delegated",
      authorization: fixtures.delegatedTokens.charlie,
      allowedCanaries: [
        fixtures.canaries.charliePrompt,
        fixtures.canaries.charlieResponse,
      ],
      requests: [
        (app, request, actor) =>
          buildWorkspaceChatsRequest({
            app,
            request,
            workspaceSlug: workspaceLegalAlpha.slug,
            actor,
          }),
      ],
    }),
    createActor({
      id: "apiManagementKey",
      name: "management_key",
      principalKind: "management",
      authorization: fixtures.auth.apiKey,
      allowedCanaries: [],
      requests: [
        (app, request, actor) =>
          buildApiWorkspaceChatsRequest({
            app,
            request,
            workspaceSlug: workspaceLegalAlpha.slug,
            actor,
          }),
      ],
    }),
  ]);
}

module.exports = {
  createPrivacyActors,
};
