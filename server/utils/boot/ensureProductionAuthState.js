const prisma = require("../prisma");
const { Workspace } = require("../../models/workspace");
const { SystemSettings } = require("../../models/systemSettings");

function defaultWorkspaceName() {
  return (
    String(process.env.DEFAULT_WORKSPACE_SLUG || "workspace").trim() ||
    "workspace"
  );
}

function defaultWorkspaceSlug() {
  return (
    Workspace.slugify(defaultWorkspaceName(), {
      lower: true,
    }) || "workspace"
  );
}

async function ensureSystemSetting(label, value) {
  return prisma.system_settings.upsert({
    where: { label },
    update: {},
    create: { label, value },
  });
}

async function ensureDefaultWorkspaceExists() {
  const slug = defaultWorkspaceSlug();
  const existingWorkspace = await Workspace.get({ slug });
  if (existingWorkspace) return existingWorkspace;

  const { workspace, message } = await Workspace.new(
    defaultWorkspaceName(),
    null,
    {}
  );
  if (!workspace) {
    throw new Error(message || `Failed to create default workspace: ${slug}`);
  }

  return workspace;
}

async function ensureProductionAuthState() {
  await Promise.all([
    ensureSystemSetting("multi_user_mode", "false"),
    ensureSystemSetting("onboarding_complete", "false"),
  ]);

  const [multiUserMode, onboardingComplete] = await Promise.all([
    SystemSettings.isMultiUserMode(),
    SystemSettings.isOnboardingComplete(),
  ]);

  if (!multiUserMode && !onboardingComplete) {
    return null;
  }

  return ensureDefaultWorkspaceExists();
}

module.exports = {
  defaultWorkspaceSlug,
  ensureDefaultWorkspaceExists,
  ensureProductionAuthState,
};
