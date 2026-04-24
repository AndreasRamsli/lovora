const { WorkspaceUser } = require("../../models/workspaceUsers");

function ensureDefaultWorkspaceExists() {
  return require("../boot/ensureProductionAuthState").ensureDefaultWorkspaceExists();
}

async function ensureDefaultWorkspaceMembership(user = null) {
  if (!user?.id) {
    throw new Error("Cannot assign default workspace without a local user id.");
  }

  const workspace = await ensureDefaultWorkspaceExists();

  const membershipClause = {
    user_id: Number(user.id),
    workspace_id: Number(workspace.id),
  };
  const existingMembership = await WorkspaceUser.get(membershipClause);
  if (existingMembership) return workspace;

  const created = await WorkspaceUser.create(user.id, workspace.id);
  if (!created) {
    const concurrentMembership = await WorkspaceUser.get(membershipClause);
    if (concurrentMembership) return workspace;

    throw new Error(
      `Failed to assign user ${user.id} to default workspace ${workspace.slug}`
    );
  }

  return workspace;
}

module.exports = { ensureDefaultWorkspaceMembership };
