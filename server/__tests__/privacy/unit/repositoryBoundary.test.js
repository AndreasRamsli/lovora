/* eslint-env jest */

const mockWhere = jest.fn();

jest.mock("../../../models/workspaceChats", () => ({
  WorkspaceChats: {
    where: mockWhere,
  },
}));

const {
  createRequestSecurityContext,
} = require("../../../utils/privacy/requestSecurityContext");
const { ChatContentRepository } = require("../../../repositories/chatContentRepository");

describe("chat content repository boundary", () => {
  beforeEach(() => {
    mockWhere.mockReset();
  });

  test("rejects control-plane request contexts", async () => {
    await expect(
      ChatContentRepository.listThreadHistory(
        {
          requestId: "req_1",
          plane: "control",
          routeId: "admin.flags.list",
          principal: {
            kind: "management",
            scopes: ["management:users:read"],
          },
        },
        10,
        5,
        {
          ownerUserId: null,
          workspaceId: 10,
          apiSessionId: "api_sess_A",
        }
      )
    ).rejects.toMatchObject({ status: 403 });
    expect(mockWhere).not.toHaveBeenCalled();
  });

  test("rejects bare principals instead of silently wrapping them", async () => {
    await expect(
      ChatContentRepository.listThreadHistory(
        {
          kind: "delegated_user",
          userId: 12,
          delegatedScope: "read",
          roles: [],
        },
        10,
        5,
        {
          ownerUserId: 12,
          workspaceId: 10,
          apiSessionId: null,
        }
      )
    ).rejects.toMatchObject({ status: 403 });
    expect(mockWhere).not.toHaveBeenCalled();
  });

  test("rejects forged duck-typed context objects", async () => {
    await expect(
      ChatContentRepository.listThreadHistory(
        {
          requestId: "req_fake",
          plane: "content",
          routeId: "workspace.thread.history",
          principal: {
            kind: "delegated_user",
            userId: 12,
            delegatedScope: "read",
            roles: [],
          },
        },
        10,
        5,
        {
          ownerUserId: 12,
          workspaceId: 10,
          apiSessionId: null,
        }
      )
    ).rejects.toMatchObject({ status: 403 });
    expect(mockWhere).not.toHaveBeenCalled();
  });

  test("authorizes using the passed resource before querying content", async () => {
    mockWhere.mockResolvedValue([{ id: 1 }]);

    const result = await ChatContentRepository.listThreadHistory(
      createRequestSecurityContext({
        requestId: "req_2",
        routeId: "workspace.thread.history",
        plane: "content",
        principal: {
          kind: "delegated_user",
          userId: 12,
          delegatedScope: "read",
          roles: [],
        },
      }),
      10,
      44,
      {
        ownerUserId: 12,
        workspaceId: 10,
        apiSessionId: null,
      }
    );

    expect(result).toEqual([{ id: 1 }]);
    expect(mockWhere).toHaveBeenCalledWith(
      {
        workspaceId: 10,
        thread_id: 44,
        user_id: 12,
        api_session_id: null,
        include: true,
      },
      null,
      { id: "asc" }
    );
  });
});
