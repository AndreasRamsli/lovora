/* eslint-env jest */

jest.mock("../../../utils/prisma", () => ({
  system_settings: {
    upsert: jest.fn(),
  },
}));

jest.mock("../../../models/workspace", () => ({
  Workspace: {
    slugify: jest.fn(() => "workspace"),
    get: jest.fn(),
    new: jest.fn(),
  },
}));

jest.mock("../../../models/systemSettings", () => ({
  SystemSettings: {
    isMultiUserMode: jest.fn(),
    isOnboardingComplete: jest.fn(),
  },
}));

const prisma = require("../../../utils/prisma");
const { Workspace } = require("../../../models/workspace");
const { SystemSettings } = require("../../../models/systemSettings");
const {
  ensureDefaultWorkspaceExists,
  ensureProductionAuthState,
} = require("../../../utils/boot/ensureProductionAuthState");

describe("ensureProductionAuthState", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    delete process.env.DEFAULT_WORKSPACE_SLUG;
    prisma.system_settings.upsert.mockResolvedValue({});
    Workspace.get.mockResolvedValue(null);
    Workspace.new.mockResolvedValue({
      workspace: { id: 7, slug: "workspace", name: "workspace" },
      message: null,
    });
  });

  test("uses Workspace.slugify for the default workspace lookup", async () => {
    process.env.DEFAULT_WORKSPACE_SLUG = "Primary.Workspace+One";

    await ensureDefaultWorkspaceExists();

    expect(Workspace.slugify).toHaveBeenCalledWith("Primary.Workspace+One", {
      lower: true,
    });
    expect(Workspace.get).toHaveBeenCalledWith({
      slug: "workspace",
    });
  });

  test("creates the default workspace when onboarding is already complete", async () => {
    SystemSettings.isMultiUserMode.mockResolvedValue(false);
    SystemSettings.isOnboardingComplete.mockResolvedValue(true);

    const workspace = await ensureProductionAuthState();

    expect(workspace).toMatchObject({ id: 7, slug: "workspace" });
    expect(Workspace.new).toHaveBeenCalledWith("workspace", null, {});
  });
});
