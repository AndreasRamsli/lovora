const crypto = require("crypto");
const { User } = require("../../models/user");

function fallbackPassword() {
  return `BA-${crypto.randomBytes(24).toString("hex")}`;
}

function buildSafeLegacyUsername(seed = "", suffix = "") {
  const normalizedSeed = String(seed || "")
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, "-")
    .replace(/^-+/, "");
  const normalizedSuffix = String(suffix || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .slice(0, 10);
  const maxSeedLength =
    32 - (normalizedSuffix ? normalizedSuffix.length + 1 : 0);
  const trimmedSeed = normalizedSeed.slice(0, Math.max(1, maxSeedLength));
  let candidate = normalizedSuffix
    ? `${trimmedSeed}-${normalizedSuffix}`
    : trimmedSeed;
  if (!candidate || !/^[a-z]/.test(candidate)) {
    candidate = `u${candidate}`.slice(0, 32);
  }
  return candidate.slice(0, 32);
}

function getLegacyUsernamesFromBetterAuthUser(baUser = {}) {
  const email = String(baUser?.email || "")
    .trim()
    .toLowerCase();
  const directEmail = email;
  const usernames = [];
  if (User.usernameRegex.test(directEmail) && directEmail.length <= 32) {
    usernames.push(directEmail);
  }

  const [localPart = "user"] = email.split("@");
  const primaryFallback = buildSafeLegacyUsername(localPart, baUser?.id);
  if (User.usernameRegex.test(primaryFallback)) usernames.push(primaryFallback);

  const secondaryFallback = buildSafeLegacyUsername(
    "user",
    `${baUser?.id || ""}${crypto.randomBytes(2).toString("hex")}`
  );
  if (User.usernameRegex.test(secondaryFallback)) {
    usernames.push(secondaryFallback);
  }

  return Array.from(new Set(usernames));
}

async function getBetterAuthSessionFromRequest(request) {
  const [{ fromNodeHeaders }, { auth }] = await Promise.all([
    import("better-auth/node"),
    import("../../auth/better-auth.mjs"),
  ]);

  return auth.api.getSession({
    headers: fromNodeHeaders(request.headers),
  });
}

async function mapBetterAuthSessionToLegacyUser(session = {}) {
  const baUser = session?.user;
  if (!baUser?.id || !baUser?.email) return null;

  const betterAuthUserId = String(baUser.id);
  const email = String(baUser.email).trim().toLowerCase();

  const existingByBetterAuthId = await User._get({ betterAuthUserId });
  if (existingByBetterAuthId) return existingByBetterAuthId;

  const existingByEmail = await User._get({ username: email });
  if (existingByEmail) {
    const updateResult = await User._update(existingByEmail.id, {
      betterAuthUserId,
      authProvider: "better-auth",
    });
    if (!updateResult?.user && updateResult?.message) {
      throw new Error(updateResult.message);
    }
    return await User._get({ id: existingByEmail.id });
  }

  let createdUser = null;
  let createError = null;
  const candidateUsernames = getLegacyUsernamesFromBetterAuthUser(baUser);

  for (const username of candidateUsernames) {
    const { user, error } = await User.create({
      username,
      password: fallbackPassword(),
      role: "default",
    });
    if (user && !error) {
      createdUser = user;
      createError = null;
      break;
    }
    createError = error || "Failed creating legacy user.";
  }

  if (!createdUser || createError) {
    throw new Error(createError || "Failed creating legacy user.");
  }

  const updateResult = await User._update(createdUser.id, {
    betterAuthUserId,
    authProvider: "better-auth",
  });
  if (!updateResult?.user && updateResult?.message) {
    throw new Error(updateResult.message);
  }

  return await User._get({ id: createdUser.id });
}

module.exports = {
  getBetterAuthSessionFromRequest,
  mapBetterAuthSessionToLegacyUser,
};
