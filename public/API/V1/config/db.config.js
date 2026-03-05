const { PrismaClient } = require("../electron/client");
const path = require("path");

// From public/API/V1/config: 4 levels up = project root, then DB/dev.db
// Works for: node server.js (project root) and packaged app (build/public/API/V1/config)
const dbPath = path.join(__dirname, "../../../../DB/dev.db");

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
