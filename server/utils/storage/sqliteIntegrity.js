const fs = require("fs/promises");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

function resolveStorageDir(storageDir = process.env.STORAGE_DIR) {
  return storageDir
    ? path.resolve(storageDir)
    : path.resolve(__dirname, "../../storage");
}

function resolveSqliteDbPath(dbPath, storageDir = process.env.STORAGE_DIR) {
  if (dbPath) return path.resolve(dbPath);
  return path.resolve(resolveStorageDir(storageDir), "anythingllm.db");
}

async function checkSqliteIntegrity(dbPath) {
  const resolvedPath = resolveSqliteDbPath(dbPath);
  let prisma;

  try {
    const stats = await fs.stat(resolvedPath);

    if (!stats.isFile()) {
      return { ok: false, reason: "not_file", path: resolvedPath };
    }

    prisma = new PrismaClient({
      datasources: {
        db: {
          url: `file:${resolvedPath}`,
        },
      },
      log: ["error"],
    });

    const rows = await prisma.$queryRawUnsafe("PRAGMA quick_check");
    const results = Array.isArray(rows)
      ? rows.map((row) => row.quick_check).filter(Boolean)
      : [];

    if (results.length === 1 && results[0] === "ok") {
      return {
        ok: true,
        path: resolvedPath,
        size: stats.size,
        check: "quick_check",
      };
    }

    return {
      ok: false,
      reason: "quick_check_failed",
      path: resolvedPath,
      size: stats.size,
      check: "quick_check",
      results,
    };
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return { ok: false, reason: "missing_file", path: resolvedPath };
    }

    return {
      ok: false,
      reason: "quick_check_failed",
      path: resolvedPath,
      message: error instanceof Error ? error.message : String(error),
    };
  } finally {
    await prisma?.$disconnect();
  }
}

module.exports = {
  checkSqliteIntegrity,
  resolveSqliteDbPath,
  resolveStorageDir,
};
