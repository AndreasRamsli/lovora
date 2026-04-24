import { describe, expect, test } from "@jest/globals";
import {
  buildCreateApiKeyPayload,
  describeApiKeyBinding,
} from "./apiKeyFormState.js";

describe("apiKeyFormState", () => {
  test("serializes workspace service keys with a numeric workspaceId", () => {
    expect(
      buildCreateApiKeyPayload({
        name: "Case Intake",
        principalType: "workspace_service",
        workspaceId: "7",
      })
    ).toEqual({
      name: "Case Intake",
      principalType: "workspace_service",
      workspaceId: 7,
    });
  });

  test("serializes management keys without a workspace binding", () => {
    expect(
      buildCreateApiKeyPayload({
        name: "Ops",
        principalType: "management",
        workspaceId: "9",
      })
    ).toEqual({
      name: "Ops",
      principalType: "management",
      workspaceId: null,
    });
  });

  test("normalizes blank and trimmed names while rejecting invalid workspace ids", () => {
    expect(
      buildCreateApiKeyPayload({
        name: "   Case Intake   ",
        principalType: "workspace_service",
        workspaceId: "not-a-number",
      })
    ).toEqual({
      name: "Case Intake",
      principalType: "workspace_service",
      workspaceId: null,
    });

    expect(
      buildCreateApiKeyPayload({
        name: "   ",
        principalType: "management",
        workspaceId: "12",
      })
    ).toEqual({
      name: "",
      principalType: "management",
      workspaceId: null,
    });
  });

  test("formats binding labels for workspace service and management keys", () => {
    expect(
      describeApiKeyBinding({
        principalType: "workspace_service",
        workspace: { name: "Assigned Workspace" },
      })
    ).toBe("Workspace service · Assigned Workspace");

    expect(
      describeApiKeyBinding({
        principalType: "management",
      })
    ).toBe("Management · Metadata only");

    expect(
      describeApiKeyBinding({
        principalType: "workspace_service",
        workspace: null,
      })
    ).toBe("Workspace service · Unbound workspace");
  });
});
