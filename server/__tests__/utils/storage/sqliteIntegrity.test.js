/* global describe, test, expect */
const fs = require("fs");
const os = require("os");
const path = require("path");
const { checkSqliteIntegrity } = require("../../../utils/storage/sqliteIntegrity");
const { main } = require("../../../scripts/sqlite-integrity-check");

describe("sqliteIntegrity", () => {
  test("returns missing_file when the sqlite database is absent", async () => {
    await expect(
      checkSqliteIntegrity("/tmp/lovora-sqlite-integrity-missing.db")
    ).resolves.toMatchObject({
      ok: false,
      reason: "missing_file",
    });
  });

  test("returns ok only after sqlite quick_check passes", async () => {
    const dbDir = fs.mkdtempSync(path.join(os.tmpdir(), "lovora-sqlite-"));
    const dbPath = path.join(dbDir, "anythingllm.db");

    fs.writeFileSync(dbPath, "");

    await expect(checkSqliteIntegrity(dbPath)).resolves.toMatchObject({
      ok: true,
      path: dbPath,
      check: "quick_check",
    });
  });

  test("allow-missing startup mode exits successfully for a clean deployment", async () => {
    await expect(
      main([
        "--allow-missing",
        "/tmp/lovora-sqlite-integrity-script-missing.db",
      ])
    ).resolves.toBe(0);
  });
});
