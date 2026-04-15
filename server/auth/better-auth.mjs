import { betterAuth } from "better-auth";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import { dash } from "@better-auth/infra";
import prisma from "../utils/prisma/index.js";

const defaultPort = process.env.SERVER_PORT || "3001";
const defaultBaseUrl = `http://localhost:${defaultPort}`;

const baseURL = process.env.BETTER_AUTH_URL || defaultBaseUrl;
const secret =
  process.env.BETTER_AUTH_SECRET ||
  process.env.JWT_SECRET ||
  "change-me-in-production-better-auth-secret";
const trustedOriginsFromEnv = String(
  process.env.BETTER_AUTH_TRUSTED_ORIGINS || ""
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const trustedOrigins = Array.from(
  new Set([
    baseURL,
    defaultBaseUrl,
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3001",
    ...trustedOriginsFromEnv,
  ])
);
const betterAuthApiKey = process.env.BETTER_AUTH_API_KEY;
if (process.env.NODE_ENV === "production" && !betterAuthApiKey) {
  console.warn(
    "[better-auth] BETTER_AUTH_API_KEY is not set; Better Auth Infrastructure dashboard features are disabled."
  );
}

const plugins = betterAuthApiKey
  ? [
      dash({
        apiKey: betterAuthApiKey,
      }),
    ]
  : [];

export const auth = betterAuth({
  baseURL,
  secret,
  trustedOrigins,
  database: prismaAdapter(prisma, { provider: "sqlite" }),
  plugins,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
});
