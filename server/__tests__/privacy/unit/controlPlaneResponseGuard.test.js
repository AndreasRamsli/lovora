/* eslint-env jest */

const {
  assertControlPlaneResponseSafe,
  installControlPlaneResponseGuard,
} = require("../../../utils/privacy/controlPlaneResponseGuard");

describe("control-plane response guard", () => {
  test("throws when a forbidden nested key is serialized on a control payload", () => {
    expect(() =>
      assertControlPlaneResponseSafe({
        id: 1,
        review: {
          prompt: "LOVORA_CANARY_SHOULD_NOT_LEAK",
          filename: "secret.txt",
          threadTitle: "private-thread",
          pageContent: "document body",
        },
      })
    ).toThrow("Forbidden key");
  });

  test("allows metadata-only control payloads", () => {
    expect(() =>
      assertControlPlaneResponseSafe({
        flags: [
          {
            id: 7,
            workspace: { id: 11, slug: "workspace-legal-alpha" },
            user: { id: 3, username: "alice-user" },
            categories: ["review"],
          },
        ],
      })
    ).not.toThrow();
  });

  test("wraps response.json only for control-plane routes", () => {
    const controlResponse = {
      locals: {
        routePolicy: {
          plane: "control",
        },
      },
      json(payload) {
        return payload;
      },
    };

    installControlPlaneResponseGuard(controlResponse);
    expect(() =>
      controlResponse.json({
        history: [{ response: "LOVORA_CANARY_SHOULD_NOT_LEAK" }],
      })
    ).toThrow("Forbidden key");

    const contentResponse = {
      locals: {
        routePolicy: {
          plane: "content",
        },
      },
      json(payload) {
        return payload;
      },
    };

    installControlPlaneResponseGuard(contentResponse);
    expect(() =>
      contentResponse.json({
        history: [{ content: "allowed on content-plane routes" }],
      })
    ).not.toThrow();
  });
});
