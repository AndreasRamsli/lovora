const bcrypt = require("bcryptjs");
const prisma = require("../prisma");
const { User } = require("../../models/user");
const { getBetterAuthRuntime } = require("./betterAuthRuntime");

const JSON_CONTENT_TYPE = "application/json; charset=utf-8";

function normalizeIdentifier(value = "") {
  return String(value || "").trim();
}

function isEmailAddress(value = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeIdentifier(value));
}

function getSyntheticEmailForLegacyUser(legacyUser = {}) {
  const username = normalizeIdentifier(legacyUser.username).toLowerCase();
  if (isEmailAddress(username)) return username;
  return `legacy-user-${legacyUser.id}@lovora.local`;
}

async function ensureBetterAuthUserForLegacyUser(legacyUser = {}, password = "") {
  const { auth } = await getBetterAuthRuntime();
  const context = await auth.$context;
  const hashedPassword = await context.password.hash(String(password));

  let betterAuthUser = null;
  if (legacyUser.betterAuthUserId) {
    betterAuthUser = await prisma.user.findUnique({
      where: { id: String(legacyUser.betterAuthUserId) },
    });
  }

  const email = betterAuthUser?.email || getSyntheticEmailForLegacyUser(legacyUser);

  if (!betterAuthUser) {
    betterAuthUser = await prisma.user.findUnique({
      where: { email },
    });
  }

  if (!betterAuthUser) {
    betterAuthUser = await context.internalAdapter.createUser({
      email,
      name:
        normalizeIdentifier(legacyUser.username) || `legacy-user-${legacyUser.id}`,
      emailVerified: true,
    });

    if (!betterAuthUser?.id) {
      throw new Error("Failed to create linked Better Auth user.");
    }

    await context.internalAdapter.linkAccount({
      userId: betterAuthUser.id,
      providerId: "credential",
      accountId: betterAuthUser.id,
      password: hashedPassword,
    });
  } else {
    const accounts =
      (await context.internalAdapter.findAccounts(betterAuthUser.id)) || [];
    const credentialAccount = accounts.find(
      (account) => account.providerId === "credential"
    );

    if (!credentialAccount) {
      await context.internalAdapter.linkAccount({
        userId: betterAuthUser.id,
        providerId: "credential",
        accountId: betterAuthUser.id,
        password: hashedPassword,
      });
    } else {
      await context.internalAdapter.updatePassword(
        betterAuthUser.id,
        hashedPassword
      );
    }
  }

  const updates = {};
  if (legacyUser.betterAuthUserId !== betterAuthUser.id) {
    updates.betterAuthUserId = betterAuthUser.id;
  }
  if (legacyUser.authProvider !== "better-auth") {
    updates.authProvider = "better-auth";
  }

  if (Object.keys(updates).length > 0) {
    const updateResult = await User._update(legacyUser.id, updates);
    if (!updateResult?.user && updateResult?.message) {
      throw new Error(updateResult.message);
    }
  }

  return {
    auth,
    betterAuthUser,
    email,
  };
}

function getSetCookies(headers) {
  if (typeof headers?.getSetCookie === "function") {
    return headers.getSetCookie();
  }

  const cookie = headers?.get?.("set-cookie");
  return cookie ? [cookie] : [];
}

async function toSerializableResponse(webResponse) {
  const contentType = webResponse.headers.get("content-type") || JSON_CONTENT_TYPE;
  const rawBody = await webResponse.text();
  let body = null;

  if (rawBody) {
    if (contentType.includes("application/json")) {
      try {
        body = JSON.parse(rawBody);
      } catch {
        body = { message: rawBody };
      }
    } else {
      body = rawBody;
    }
  }

  return {
    status: webResponse.status,
    contentType,
    setCookies: getSetCookies(webResponse.headers),
    body,
  };
}

function errorResponse(status, message) {
  return {
    status,
    contentType: JSON_CONTENT_TYPE,
    setCookies: [],
    body: {
      valid: false,
      message,
    },
  };
}

async function signInLegacyUserWithBetterAuth(request) {
  const username = normalizeIdentifier(request?.body?.username);
  const password = String(request?.body?.password || "");

  if (!username || !password) {
    return errorResponse(400, "Username and password are required.");
  }

  const legacyUser = await User._get({ username });
  if (!legacyUser) {
    return errorResponse(401, "[001] Invalid login credentials.");
  }

  if (!bcrypt.compareSync(password, legacyUser.password)) {
    return errorResponse(401, "[002] Invalid login credentials.");
  }

  if (legacyUser.suspended) {
    return errorResponse(403, "[004] Account suspended by admin.");
  }

  const { auth, email } = await ensureBetterAuthUserForLegacyUser(
    legacyUser,
    password
  );

  const signInResponse = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
    headers: request.headers,
    asResponse: true,
  });

  return toSerializableResponse(signInResponse);
}

module.exports = {
  ensureBetterAuthUserForLegacyUser,
  getSyntheticEmailForLegacyUser,
  isEmailAddress,
  signInLegacyUserWithBetterAuth,
};
