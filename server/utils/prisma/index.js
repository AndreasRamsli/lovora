const { PrismaClient } = require("@prisma/client");

// npx prisma introspect
// npx prisma generate
// npx prisma migrate dev --name init -> ensures that db is in sync with schema
// npx prisma migrate reset -> resets the db

const logLevels = ["error", "info", "warn"]; // add "query" to debug query logs
const clientOptions = {
  log: logLevels,
};

if (process.env.DATABASE_URL) {
  clientOptions.datasources = {
    db: {
      url: process.env.DATABASE_URL,
    },
  };
}

const prisma = new PrismaClient(clientOptions);

module.exports = prisma;
