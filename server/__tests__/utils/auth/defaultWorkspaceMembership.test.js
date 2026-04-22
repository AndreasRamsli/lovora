/* eslint-env jest */

jest.mock("../../../utils/boot/ensureProductionAuthState", () => ({
  ensureDefaultWorkspaceExists: jest.fn(),
}));

jest.mock("../../../models/workspaceUsers", () => ({
  WorkspaceUser: {
    get: jest.fn(),
    create: jest.fn(),
  },
}));

const {
  ensureDefaultWorkspaceExists,
} = require("../../../utils/boot/ensureProductionAuthState");
const { WorkspaceUser } = require("../../../models/workspaceUsers");
const {
  ensureDefaultWorkspaceMembership,
} = require("../../../utils/auth/defaultWorkspaceMembership");

describe("ensureDefaultWorkspaceMembership", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    ensureDefaultWorkspaceExists.mockResolvedValue({
      id: 7,
      slug: "workspace",
      name: "Workspace",
    });
  });

  test("throws when the user id is missing", async () => {
    await expect(ensureDefaultWorkspaceMembership()).rejects.toThrow(
      "Cannot assign default workspace without a local user id."
    );
  });

  test("returns existing workspace without creating duplicate membership", async () => {
    WorkspaceUser.get.mockResolvedValue({
      id: 99,
      user_id: 11,
      workspace_id: 7,
    });

    const workspace = await ensureDefaultWorkspaceMembership({ id: 11 });

    expect(workspace).toMatchObject({ id: 7, slug: "workspace" });
    expect(ensureDefaultWorkspaceExists).toHaveBeenCalledTimes(1);
    expect(WorkspaceUser.create).not.toHaveBeenCalled();
  });

  test("creates membership when it is missing", async () => {
    WorkspaceUser.get.mockResolvedValue(null);
    WorkspaceUser.create.mockResolvedValue(true);

    const workspace = await ensureDefaultWorkspaceMembership({ id: 11 });

    expect(workspace).toMatchObject({ id: 7, slug: "workspace" });
    expect(ensureDefaultWorkspaceExists).toHaveBeenCalledTimes(1);
    expect(WorkspaceUser.create).toHaveBeenCalledWith(11, 7);
  });
});
