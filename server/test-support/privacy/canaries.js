const crypto = require("crypto");

function token() {
  return crypto.randomBytes(3).toString("hex");
}

function createPrivacyCanaries() {
  const alicePrompt = `LOVORA_CANARY_ALICE_PROMPT_${token()}`;
  const aliceResponse = `LOVORA_CANARY_ALICE_RESPONSE_${token()}`;
  const aliceThreadPrompt = `LOVORA_CANARY_ALICE_THREAD_PROMPT_${token()}`;
  const aliceThreadResponse = `LOVORA_CANARY_ALICE_THREAD_RESPONSE_${token()}`;
  const aliceAttachmentName = `LOVORA_CANARY_ALICE_ATTACHMENT_NAME_${token()}.txt`;
  const aliceAttachmentText = `LOVORA_CANARY_ALICE_ATTACHMENT_TEXT_${token()}`;
  const bobPrompt = `LOVORA_CANARY_BOB_PROMPT_${token()}`;
  const bobResponse = `LOVORA_CANARY_BOB_RESPONSE_${token()}`;
  const charliePrompt = `LOVORA_CANARY_CHARLIE_PROMPT_${token()}`;
  const charlieResponse = `LOVORA_CANARY_CHARLIE_RESPONSE_${token()}`;
  const adminOwnPrompt = `LOVORA_CANARY_ADMIN_OWN_PROMPT_${token()}`;
  const adminOwnResponse = `LOVORA_CANARY_ADMIN_OWN_RESPONSE_${token()}`;
  const apiSessionPrompt = `LOVORA_CANARY_API_SESSION_PROMPT_${token()}`;
  const apiSessionResponse = `LOVORA_CANARY_API_SESSION_RESPONSE_${token()}`;
  const threadTitle = `LOVORA_CANARY_THREAD_TITLE_${token()}`;
  const retrievedSnippet = `LOVORA_CANARY_RETRIEVED_SNIPPET_${token()}`;
  const reviewNote = `LOVORA_CANARY_REVIEW_NOTE_${token()}`;

  return {
    alicePrompt,
    aliceResponse,
    aliceThreadPrompt,
    aliceThreadResponse,
    aliceAttachmentName,
    aliceAttachmentText,
    bobPrompt,
    bobResponse,
    charliePrompt,
    charlieResponse,
    adminOwnPrompt,
    adminOwnResponse,
    apiSessionPrompt,
    apiSessionResponse,
    threadTitle,
    retrievedSnippet,
    reviewNote,
    memberDefaultPrompt: alicePrompt,
    memberDefaultResponse: aliceResponse,
    memberThreadPrompt: aliceThreadPrompt,
    memberThreadResponse: aliceThreadResponse,
    memberAttachmentName: aliceAttachmentName,
    memberAttachmentText: aliceAttachmentText,
  };
}

function listPrivacyCanaries(canaries = {}) {
  return [...new Set(Object.values(canaries).filter(Boolean))];
}

module.exports = {
  createPrivacyCanaries,
  listPrivacyCanaries,
};
