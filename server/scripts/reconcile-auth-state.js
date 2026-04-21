#!/usr/bin/env node
const { User } = require("../models/user");
const {
  ensureDefaultWorkspaceMembership,
} = require("../utils/auth/defaultWorkspaceMembership");

async function main() {
  const username = String(process.argv[2] || "").trim();

  if (!username) {
    throw new Error(
      "Usage: node server/scripts/reconcile-auth-state.js <username>"
    );
  }

  const legacyUser = await User._get({ username });
  if (!legacyUser) {
    throw new Error(`Legacy user not found: ${username}`);
  }
  const workspace = await ensureDefaultWorkspaceMembership(legacyUser);

  console.log(
    JSON.stringify(
      {
        success: true,
        userId: legacyUser.id,
        username: legacyUser.username,
        betterAuthUserId: legacyUser.betterAuthUserId ?? null,
        authProvider: legacyUser.authProvider ?? "legacy",
        workspaceSlug: workspace?.slug || null,
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
