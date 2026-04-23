/* eslint-env jest */

const {
  resolveSessionPrincipal,
  resolveApiKeyPrincipal,
  principalCan,
} = require("../../../utils/auth/principals");

describe("privacy principal resolution", () => {
  test("resolves delegated, management, and workspace-service principals distinctly", () => {
    const delegated = resolveSessionPrincipal({
      id: 1,
      role: "default",
      delegated: true,
      delegatedScope: "read",
    });
    const management = resolveApiKeyPrincipal({
      id: 10,
      createdBy: 4,
      principalType: "management",
      scopes: JSON.stringify(["management:users:read"]),
    });
    const workspaceService = resolveApiKeyPrincipal({
      id: 11,
      createdBy: 5,
      principalType: "workspace_service",
      workspaceId: 7,
      scopes: JSON.stringify(["workspace:api_sessions:read"]),
    });

    expect(delegated).toEqual({
      kind: "delegated_user",
      userId: 1,
      delegatedScope: "read",
      roles: [],
    });
    expect(management.kind).toBe("management");
    expect(workspaceService.kind).toBe("workspace_service");
    expect(principalCan(management, "management:users:read")).toBe(true);
    expect(principalCan(workspaceService, "workspace:api_sessions:read")).toBe(
      true
    );
  });
});
