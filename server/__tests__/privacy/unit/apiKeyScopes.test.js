/* eslint-env jest */

const {
  resolveApiKeyPrincipal,
  resolveSessionPrincipal,
  principalCan,
  isWorkspaceServicePrincipal,
} = require("../../../utils/auth/principals");

describe("privacy api key scopes", () => {
  test("management keys remain metadata-only", () => {
    const principal = resolveApiKeyPrincipal({
      id: "19",
      createdBy: "3",
      principalType: "management",
      scopes: JSON.stringify(["management:metadata:read"]),
    });

    expect(principal).toEqual({
      kind: "management",
      apiKeyId: 19,
      createdByUserId: 3,
      workspaceId: null,
      scopes: ["management:metadata:read"],
    });
    expect(principalCan(principal, "management:metadata:read")).toBe(true);
    expect(principalCan(principal, "workspace:api_sessions:read")).toBe(false);
    expect(isWorkspaceServicePrincipal(principal)).toBe(false);
  });

  test("management keys default to read and write metadata scopes", () => {
    const principal = resolveApiKeyPrincipal({
      id: "20",
      createdBy: "4",
      principalType: "management",
      scopes: null,
    });

    expect(principal).toEqual({
      kind: "management",
      apiKeyId: 20,
      createdByUserId: 4,
      workspaceId: null,
      scopes: [
        "management:metadata:read",
        "management:metadata:write",
        "management:moderation:write",
        "management:users:read",
        "management:users:write",
      ],
    });
    expect(principalCan(principal, "management:metadata:read")).toBe(true);
    expect(principalCan(principal, "management:metadata:write")).toBe(true);
    expect(principalCan(principal, "management:users:write")).toBe(true);
  });

  test("workspace service keys are content-capable only through api-session scopes", () => {
    const principal = resolveApiKeyPrincipal({
      id: 7,
      createdBy: 4,
      principalType: "workspace_service",
      workspaceId: "15",
      scopes: null,
    });

    expect(principal).toEqual({
      kind: "workspace_service",
      apiKeyId: 7,
      createdByUserId: 4,
      workspaceId: 15,
      scopes: ["workspace:api_sessions:read", "workspace:api_sessions:write"],
    });
    expect(principalCan(principal, "workspace:api_sessions:read")).toBe(true);
    expect(principalCan(principal, "workspace:api_sessions:write")).toBe(true);
    expect(principalCan(principal, "management:metadata:read")).toBe(false);
    expect(isWorkspaceServicePrincipal(principal, 15)).toBe(true);
    expect(isWorkspaceServicePrincipal(principal, 99)).toBe(false);
  });

  test("workspace service keys preserve a persisted read-only api-session scope list", () => {
    const principal = resolveApiKeyPrincipal({
      id: 8,
      createdBy: 5,
      principalType: "workspace_service",
      workspaceId: "16",
      scopes: JSON.stringify(["workspace:api_sessions:read"]),
    });

    expect(principal).toEqual({
      kind: "workspace_service",
      apiKeyId: 8,
      createdByUserId: 5,
      workspaceId: 16,
      scopes: ["workspace:api_sessions:read"],
    });
    expect(principalCan(principal, "workspace:api_sessions:read")).toBe(true);
    expect(principalCan(principal, "workspace:api_sessions:write")).toBe(false);
    expect(principalCan(principal, "workspace:chat:read")).toBe(false);
  });

  test("session principals never gain api key scopes", () => {
    const userPrincipal = resolveSessionPrincipal({
      id: 5,
      role: "manager",
    });
    const delegatedPrincipal = resolveSessionPrincipal({
      id: 6,
      role: "default",
      delegated: true,
      delegatedScope: "read",
    });

    expect(principalCan(userPrincipal, "management:metadata:read")).toBe(false);
    expect(principalCan(userPrincipal, "workspace:api_sessions:read")).toBe(false);
    expect(principalCan(delegatedPrincipal, "management:metadata:read")).toBe(
      false
    );
    expect(principalCan(delegatedPrincipal, "workspace:api_sessions:read")).toBe(false);
  });
});
