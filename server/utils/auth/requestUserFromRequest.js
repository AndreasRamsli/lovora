const JWT = require("jsonwebtoken");
const { User } = require("../../models/user");
const {
  getBetterAuthSessionFromRequest,
  mapBetterAuthSessionToLegacyUser,
} = require("./betterAuthSession");

function tokenFromAuthHeader(request = {}) {
  const authHeader =
    request?.header?.("Authorization") ?? request?.headers?.authorization;
  if (!authHeader || typeof authHeader !== "string") return null;
  const [, token] = authHeader.split(" ");
  return token || null;
}

function decodeJwtToken(token = null) {
  if (!token || !process.env.JWT_SECRET) return null;
  try {
    return JWT.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

async function resolveRequestUser(request, response = null) {
  if (response?.locals?.user) return response.locals.user;

  const session = await getBetterAuthSessionFromRequest(request).catch(
    () => null
  );
  if (session?.user) {
    const mappedUser = await mapBetterAuthSessionToLegacyUser(session);
    if (mappedUser) return mappedUser;
  }

  const token = tokenFromAuthHeader(request);
  const decodedToken = decodeJwtToken(token);
  if (!decodedToken?.id) return null;
  const user = await User.get({ id: decodedToken.id });
  return user || null;
}

module.exports = {
  resolveRequestUser,
};
