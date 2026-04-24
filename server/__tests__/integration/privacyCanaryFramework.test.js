/* eslint-env jest */
const request = require("supertest");
const { createSecurityHarness } = require("../../test-support/securityHarness");
const { createPrivacyActors } = require("../../test-support/privacy/actors");
const {
  assertNoForbiddenCanaries,
  assertResponseContainsAllowedCanaries,
} = require("../../test-support/privacy/scanner");

describe("privacy canary framework", () => {
  let harness;
  let app;
  let fixtures;

  beforeAll(async () => {
    harness = await createSecurityHarness();
    app = harness.app;
    fixtures = harness.fixtures;
  });

  afterAll(async () => {
    if (harness) await harness.cleanup();
  });

  test("actor matrix only exposes allowed canaries across content and metadata routes", async () => {
    expect(fixtures.canaries).toBeDefined();
    const actors = createPrivacyActors(fixtures);

    for (const actor of actors) {
      for (const buildRequest of actor.requests) {
        const response = await buildRequest(app, request).set(actor.headers);
        assertNoForbiddenCanaries({
          actor,
          response,
          canaries: fixtures.canaries,
        });

        if (actor.name === "member_user") {
          assertResponseContainsAllowedCanaries({
            actor,
            response,
            expectedCanaries: [
              fixtures.canaries.memberDefaultPrompt,
              fixtures.canaries.memberDefaultResponse,
              fixtures.canaries.memberAttachmentName,
              fixtures.canaries.memberAttachmentText,
            ],
          });
        }
      }
    }
  });
});
