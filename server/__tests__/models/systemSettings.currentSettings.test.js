/* eslint-env jest */

jest.mock("../../utils/prisma", () => ({
  users: { count: jest.fn() },
  user: { count: jest.fn() },
  workspaces: { findUnique: jest.fn() },
}));

jest.mock("../../utils/files", () => ({
  hasVectorCachedFiles: jest.fn(() => false),
  purgeEntireVectorCache: jest.fn(),
}));

jest.mock("../../utils/EmbeddingEngines/native", () => ({
  NativeEmbedder: {
    _getEmbeddingModel: jest.fn(() => "mock-embedding-model"),
  },
}));

jest.mock("../../utils/helpers", () => ({
  getBaseLLMProviderModel: jest.fn(() => null),
}));

jest.mock("../../utils/vectorDbProviders/pgvector", () => ({
  PGVector: {
    connectionString: jest.fn(() => false),
    tableName: jest.fn(() => "pgvector"),
  },
}));

jest.mock("../../models/workspace", () => ({
  Workspace: {
    slugify: jest.fn(() => "workspace"),
  },
}));

const prisma = require("../../utils/prisma");
const { Workspace } = require("../../models/workspace");
const { SystemSettings } = require("../../models/systemSettings");

describe("SystemSettings.currentSettings auth readiness", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.BETTER_AUTH_URL = "https://app.lovora.no";
    process.env.BETTER_AUTH_SECRET = "secret";
    delete process.env.DEFAULT_WORKSPACE_SLUG;
    process.env.AUTH_TOKEN = "legacy";
    process.env.JWT_SECRET = "jwt";
    process.env.LLM_PROVIDER = "xai";
    process.env.EMBEDDING_ENGINE = "voyageai";

    SystemSettings.isMultiUserMode = jest.fn().mockResolvedValue(true);
    SystemSettings.hasEmbeddings = jest.fn().mockResolvedValue(false);
  });

  test("reports Better Auth and workspace readiness", async () => {
    prisma.users.count.mockResolvedValue(1);
    prisma.user.count.mockResolvedValue(1);
    prisma.workspaces.findUnique.mockResolvedValue({ id: 7, slug: "workspace" });

    const settings = await SystemSettings.currentSettings();

    expect(settings.BetterAuthConfigured).toBe(true);
    expect(settings.DefaultWorkspaceSlug).toBe("workspace");
    expect(settings.DefaultWorkspaceReady).toBe(true);
    expect(settings.LegacyUserCount).toBe(1);
    expect(settings.BetterAuthUserCount).toBe(1);
    expect(prisma.workspaces.findUnique).toHaveBeenCalledWith({
      where: { slug: "workspace" },
    });
  });

  test("normalizes the configured workspace slug before reporting readiness", async () => {
    process.env.DEFAULT_WORKSPACE_SLUG = "Primary Workspace";
    Workspace.slugify.mockReturnValue("primary-workspace");
    prisma.users.count.mockResolvedValue(1);
    prisma.user.count.mockResolvedValue(0);
    prisma.workspaces.findUnique.mockResolvedValue({
      id: 8,
      slug: "primary-workspace",
    });

    const settings = await SystemSettings.currentSettings();

    expect(settings.DefaultWorkspaceSlug).toBe("primary-workspace");
    expect(settings.DefaultWorkspaceReady).toBe(true);
    expect(Workspace.slugify).toHaveBeenCalledWith("Primary Workspace", {
      lower: true,
    });
    expect(prisma.workspaces.findUnique).toHaveBeenCalledWith({
      where: { slug: "primary-workspace" },
    });
  });
});
