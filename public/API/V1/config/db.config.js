const { PrismaClient } = require("../electron/client");
const path = require("path");

// 1) Packaged app: main.js sets process.env.DB_PATH to userData/DB/dev.db (survives auto-update).
// 2) Dev / node server.js: DB stays in project at DB/dev.db (no userData in dev).
let dbPath;
if (typeof process !== "undefined" && process.env.DB_PATH) {
  dbPath = process.env.DB_PATH;
} else {
  dbPath = path.join(__dirname, "../../../../DB/dev.db");
}

const prisma = new PrismaClient({
    log: ["error"],
    datasources: {
        db: {
            url: `file:${dbPath}?timeout=30000`
        }
    }
});

// Expose DB path for backup (e.g. B2 sync); same path the app uses for SQLite
prisma.dbPath = dbPath;
module.exports = prisma;
