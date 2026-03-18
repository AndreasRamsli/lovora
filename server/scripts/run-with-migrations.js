#!/usr/bin/env node
const { spawnSync } = require("child_process");
const path = require("path");
const dotenv = require("dotenv");

const SERVER_ROOT = path.resolve(__dirname, "..");
const npxCommand = process.platform === "win32" ? "npx.cmd" : "npx";
const DEVELOPMENT_ENV_PATH = path.resolve(__dirname, "../.env.development");

function resolveMode(requestedMode = "") {
  if (requestedMode === "dev") return "dev";
  if (requestedMode === "migrate-only-dev") return "migrate-only-dev";
  if (requestedMode === "migrate-only") return "migrate-only";
  return "start";
}

function shouldLoadDevelopmentEnv(mode) {
  return mode === "dev" || mode === "migrate-only-dev";
}

function run(label, command, args = [], env = {}) {
  console.log(`[Startup] ${label}`);
  const result = spawnSync(command, args, {
    cwd: SERVER_ROOT,
    stdio: "inherit",
    env: {
      ...process.env,
      ...env,
    },
  });

  if (result.error) {
    console.error(`[Startup] ${label} failed`, {
      message: result.error.message,
    });
    process.exit(1);
  }

  if (typeof result.status === "number" && result.status !== 0) {
    process.exit(result.status);
  }
}

function main(requestedMode = process.argv[2]) {
  const mode = resolveMode(requestedMode);

  if (shouldLoadDevelopmentEnv(mode)) {
    dotenv.config({ path: DEVELOPMENT_ENV_PATH });
  }

  run(
    "Applying Prisma migrations",
    npxCommand,
    ["prisma", "migrate", "deploy", "--schema=./prisma/schema.prisma"],
    { CHECKPOINT_DISABLE: process.env.CHECKPOINT_DISABLE || "1" }
  );

  if (mode === "dev") {
    run(
      "Starting development server",
      npxCommand,
      [
        "nodemon",
        "--ignore",
        "documents",
        "--ignore",
        "vector-cache",
        "--ignore",
        "storage",
        "--ignore",
        "swagger",
        "--trace-warnings",
        "index.js",
      ],
      {
        NODE_ENV: "development",
      }
    );
    return;
  }

  if (mode === "migrate-only" || mode === "migrate-only-dev") {
    return;
  }

  run("Starting server", process.execPath, ["index.js"], {
    NODE_ENV: process.env.NODE_ENV || "production",
  });
}

if (require.main === module) {
  main();
}

module.exports = {
  resolveMode,
  shouldLoadDevelopmentEnv,
  DEVELOPMENT_ENV_PATH,
  main,
};
