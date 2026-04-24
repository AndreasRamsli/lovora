/* eslint-env jest */

const mockListMetadata = jest.fn();
const mockGetReviewConversation = jest.fn();

jest.mock("../../../models/conversationFlags", () => ({
  ConversationFlags: {
    listMetadata: mockListMetadata,
    listMetadataByClause: jest.fn(),
    listReviewCases: jest.fn(),
    getReviewConversation: mockGetReviewConversation,
  },
}));

const {
  createRequestSecurityContext,
} = require("../../../utils/privacy/requestSecurityContext");
const { ChatMetadataRepository } = require("../../../repositories/chatMetadataRepository");

describe("chat metadata repository request-context contract", () => {
  beforeEach(() => {
    mockListMetadata.mockReset();
    mockGetReviewConversation.mockReset();
  });

  test("accepts requestContext only when wrapped inside the options object", async () => {
    mockListMetadata.mockResolvedValue([{ id: 1 }]);

    const requestContext = createRequestSecurityContext({
      requestId: "req_meta_1",
      routeId: "system.workspace-chats",
      plane: "control",
      principal: { kind: "management", scopes: ["management:metadata:read"] },
    });

    const result = await ChatMetadataRepository.listWorkspaceChats({
      requestContext,
      limit: 7,
      offset: 2,
      orderBy: { id: "asc" },
    });

    expect(result).toEqual([{ id: 1 }]);
    expect(mockListMetadata).toHaveBeenCalledWith({
      limit: 7,
      offset: 2,
      orderBy: { id: "asc" },
    });
  });

  test("rejects positional request-context arguments for getReviewCase", async () => {
    const requestContext = createRequestSecurityContext({
      requestId: "req_meta_2",
      routeId: "system.review-case",
      plane: "control",
      principal: { kind: "management", scopes: ["management:metadata:read"] },
    });

    await expect(
      ChatMetadataRepository.getReviewCase(requestContext, 77)
    ).rejects.toMatchObject({ status: 500 });
    expect(mockGetReviewConversation).not.toHaveBeenCalled();
  });

  test("accepts getReviewCase id when wrapped with requestContext in a single object", async () => {
    mockGetReviewConversation.mockResolvedValue({ caseId: 77 });

    const requestContext = createRequestSecurityContext({
      requestId: "req_meta_3",
      routeId: "system.review-case",
      plane: "control",
      principal: { kind: "management", scopes: ["management:metadata:read"] },
    });

    const result = await ChatMetadataRepository.getReviewCase({
      requestContext,
      id: 77,
    });

    expect(result).toEqual({ caseId: 77 });
    expect(mockGetReviewConversation).toHaveBeenCalledWith(77);
  });
});
