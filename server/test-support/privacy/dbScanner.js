/* global expect */

const { listPrivacyCanaries } = require("./canaries");

async function assertMetadataTablesDoNotContainCanaries({
  prisma,
  canaries,
  tables = [],
}) {
  for (const table of tables) {
    const rows = await prisma.$queryRawUnsafe(`SELECT * FROM "${table}"`);
    const serialized = JSON.stringify(rows);

    for (const canary of listPrivacyCanaries(canaries)) {
      expect(serialized).not.toContain(canary);
    }
  }
}

module.exports = {
  assertMetadataTablesDoNotContainCanaries,
};
