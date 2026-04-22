#!/usr/bin/env node
const path = require("path");
const dotenv = require("dotenv");
const {
  checkSqliteIntegrity,
  resolveSqliteDbPath,
} = require("../utils/storage/sqliteIntegrity");

const SERVER_ROOT = path.resolve(__dirname, "..");

function loadEnv() {
  dotenv.config({ path: path.join(SERVER_ROOT, ".env") });
}

function parseArgs(argv = process.argv.slice(2)) {
  const args = Array.from(argv);
  const allowMissing = args.includes("--allow-missing");
  const requestedPath = args.find((arg) => !arg.startsWith("--"));

  return {
    allowMissing,
    requestedPath,
  };
}

async function main(argv = process.argv.slice(2)) {
  loadEnv();

  const { allowMissing, requestedPath } = parseArgs(argv);
  const dbPath = resolveSqliteDbPath(requestedPath);
  const result = await checkSqliteIntegrity(dbPath);

  if (result.ok) {
    console.log(`[SQLiteIntegrity] OK ${result.path}`);
    return 0;
  }

  if (allowMissing && result.reason === "missing_file") {
    console.warn(
      `[SQLiteIntegrity] missing_file for ${result.path}; allowing first boot`
    );
    return 0;
  }

  const details = result.message ? ` (${result.message})` : "";
  console.error(
    `[SQLiteIntegrity] ${result.reason} for ${result.path}${details}`
  );
  return 1;
}

if (require.main === module) {
  main()
    .then((code) => {
      process.exitCode = code;
    })
    .catch((error) => {
      console.error("[SQLiteIntegrity] unexpected failure", error);
      process.exitCode = 1;
    });
}

module.exports = {
  parseArgs,
  main,
};
