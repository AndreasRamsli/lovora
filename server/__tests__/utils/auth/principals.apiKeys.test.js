/* eslint-env jest */

const {
  isWorkspaceServicePrincipal,
  principalCan,
  resolveSessionPrincipal,
  resolveApiKeyPrincipal,
} = require("../../../utils/auth/principals");

describe("API key principal resolution", () => {
  test("management key resolves to a metadata-only principal", () => {
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

  test("management key without persisted scopes gets read and write metadata defaults", () => {
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
    expect(principalCan(principal, "management:metadata:write")).toBe(true);
    expect(principalCan(principal, "management:users:write")).toBe(true);
  });

  test("workspace service key resolves to a content-capable principal", () => {
    const principal = resolveApiKeyPrincipal({
      id: 27,
      createdBy: 8,
      principalType: "workspace_service",
      workspaceId: "41",
      scopes: null,
    });

    expect(principal).toEqual({
      kind: "workspace_service",
      apiKeyId: 27,
      createdByUserId: 8,
      workspaceId: 41,
      scopes: ["workspace:api_sessions:read", "workspace:api_sessions:write"],
    });
    expect(principalCan(principal, "workspace:api_sessions:read")).toBe(true);
    expect(principalCan(principal, "workspace:chat:read")).toBe(false);
    expect(principalCan(principal, "management:metadata:read")).toBe(false);
    expect(isWorkspaceServicePrincipal(principal, 41)).toBe(true);
    expect(isWorkspaceServicePrincipal(principal, 99)).toBe(false);
  });

  test("unknown principal type returns null", () => {
    expect(
      resolveApiKeyPrincipal({
        id: 31,
        principalType: "delegated",
        scopes: [],
      })
    ).toBeNull();
  });

  test("malformed api key id returns null", () => {
    expect(
      resolveApiKeyPrincipal({
        id: "abc",
        principalType: "management",
        scopes: [],
      })
    ).toBeNull();
  });

  test("malformed createdBy returns null", () => {
    expect(
      resolveApiKeyPrincipal({
        id: 32,
        createdBy: "abc",
        principalType: "management",
        scopes: [],
      })
    ).toBeNull();
  });

  test("workspace service without a valid workspace id returns null", () => {
    expect(
      resolveApiKeyPrincipal({
        id: 33,
        createdBy: 9,
        principalType: "workspace_service",
        workspaceId: "not-a-number",
        scopes: [],
      })
    ).toBeNull();
  });

  test("session principals do not gain scoped api capabilities", () => {
    const principal = resolveSessionPrincipal({
      id: 5,
      role: "manager",
    });

    expect(principal).toEqual({
      kind: "user",
      userId: 5,
      roles: ["manager"],
    });
    expect(principalCan(principal, "management:metadata:read")).toBe(false);
    expect(principalCan(principal, "workspace:api_sessions:read")).toBe(false);
  });
});
