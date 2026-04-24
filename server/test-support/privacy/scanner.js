/* global expect */

const { listPrivacyCanaries } = require("./canaries");

function normalizeResponse(response) {
  return [
    response.text || "",
    JSON.stringify(response.body || {}),
    JSON.stringify(response.headers || {}),
  ].join("\n");
}

function actorCanarySet(actor) {
  return actor?.allowedCanaries instanceof Set
    ? actor.allowedCanaries
    : new Set();
}

function assertNoForbiddenCanaries({ actor, response, canaries }) {
  const responseText = normalizeResponse(response);
  const allowedCanaries = actorCanarySet(actor);

  for (const canary of listPrivacyCanaries(canaries)) {
    if (!allowedCanaries.has(canary)) {
      expect(responseText).not.toContain(canary);
    }
  }
}

function assertResponseContainsAllowedCanaries({
  actor,
  response,
  expectedCanaries = [],
}) {
  const responseText = normalizeResponse(response);
  const allowedCanaries = actorCanarySet(actor);

  for (const canary of expectedCanaries) {
    expect(allowedCanaries.has(canary)).toBe(true);
    expect(responseText).toContain(canary);
  }
}

module.exports = {
  normalizeResponse,
  assertNoForbiddenCanaries,
  assertResponseContainsAllowedCanaries,
};
