/* eslint-env jest */

const { canReadChatContent } = require("../../../utils/auth/principals");

describe("canReadChatContent", () => {
  test.each([
    [
      "user can read their own user-owned chat content",
      { kind: "user", userId: 1, roles: ["default"] },
      { ownerUserId: 1, workspaceId: 10, apiSessionId: null },
      true,
    ],
    [
      "user cannot read another user's chat content",
      { kind: "user", userId: 1, roles: ["default"] },
      { ownerUserId: 2, workspaceId: 10, apiSessionId: null },
      false,
    ],
    [
      "admin session cannot read another user's raw chat content",
      { kind: "user", userId: 9, roles: ["admin"] },
      { ownerUserId: 1, workspaceId: 10, apiSessionId: null },
      false,
    ],
    [
      "delegated user can read their subject's user-owned chat content",
      { kind: "delegated_user", userId: 1, delegatedScope: "read", roles: [] },
      { ownerUserId: 1, workspaceId: 10, apiSessionId: null },
      true,
    ],
    [
      "delegated user cannot read another subject's chat content",
      { kind: "delegated_user", userId: 1, delegatedScope: "read", roles: [] },
      { ownerUserId: 2, workspaceId: 10, apiSessionId: null },
      false,
    ],
    [
      "delegated user cannot read api-session content",
      { kind: "delegated_user", userId: 1, delegatedScope: "read", roles: [] },
      { ownerUserId: null, workspaceId: 10, apiSessionId: "api_sess_A" },
      false,
    ],
    [
      "workspace service can read matching workspace api-session content with read scope",
      {
        kind: "workspace_service",
        workspaceId: 10,
        scopes: ["workspace:api_sessions:read"],
      },
      { ownerUserId: null, workspaceId: 10, apiSessionId: "api_sess_A" },
      true,
    ],
    [
      "workspace service cannot read another workspace api-session content",
      {
        kind: "workspace_service",
        workspaceId: 10,
        scopes: ["workspace:api_sessions:read"],
      },
      { ownerUserId: null, workspaceId: 11, apiSessionId: "api_sess_A" },
      false,
    ],
    [
      "workspace service cannot read user-owned content",
      {
        kind: "workspace_service",
        workspaceId: 10,
        scopes: ["workspace:api_sessions:read"],
      },
      { ownerUserId: 1, workspaceId: 10, apiSessionId: null },
      false,
    ],
    [
      "workspace service cannot read api-session content without api-session read scope",
      {
        kind: "workspace_service",
        workspaceId: 10,
        scopes: ["workspace:chat:read"],
      },
      { ownerUserId: null, workspaceId: 10, apiSessionId: "api_sess_A" },
      false,
    ],
    [
      "management principals cannot read user-owned content",
      {
        kind: "management",
        scopes: ["management:metadata:read"],
      },
      { ownerUserId: 1, workspaceId: 10, apiSessionId: null },
      false,
    ],
    [
      "management principals cannot read api-session content",
      {
        kind: "management",
        scopes: ["management:metadata:read"],
      },
      { ownerUserId: null, workspaceId: 10, apiSessionId: "api_sess_A" },
      false,
    ],
  ])("%s", (_label, principal, resource, expected) => {
    expect(canReadChatContent(principal, resource)).toBe(expected);
  });
});
