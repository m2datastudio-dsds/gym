# Client PC: Upgrading from Old .exe to New .exe (Data Migration)

## Short answer

**Yes, you can keep the old data and use it with the new .exe.**  
The new app only **adds** one table (`FileSyncQueue`). It does **not** remove or rename columns in existing tables (Member, Staff, Payment, etc.). So the old database file is compatible; you only need to add the new table and then use the same DB with the new app.

---

## Why it still fits

| Change in new app | Impact on old data |
|-------------------|---------------------|
| **New table: FileSyncQueue** | Old DB does not have this table. You run a one-time step to create it. Existing data is untouched. |
| **Member, Staff, Package, Payment, etc.** | Same columns and types as before. No columns removed or renamed. Old rows continue to work. |
| **Photo/document storage** | Old rows may have S3 URLs in `memberPhoto` / `photoPicture` / `proofDocument`. The new app shows placeholders when those URLs fail; new uploads use local storage + B2 sync. No schema change required for that. |

So: **old data fits the new schema** as long as you add the new table.

---

## What you need to do on the client PC

### 1. Backup first (mandatory)

- Find where the old app stores the database (e.g. a `DB` folder next to the app or inside the install directory).
- Copy the entire folder that contains `dev.db` (or the actual DB file name) to a safe place (e.g. Desktop or USB).  
- Example: copy `dev.db` to `dev_backup_YYYYMMDD.db`.

### 2. Install the new .exe

- Uninstall the old app if your install process requires it, or install the new .exe over/alongside, depending on how you deploy.
- Do **not** delete the folder that contains `dev.db` if you want to keep using the same data.

### 3. Point the new app at the old DB (if path is different)

- The new app expects the SQLite file in a specific place (e.g. a `DB` folder relative to the app, or a path set in config).
- If the new install uses a **different** folder for the DB:
  - Copy your **backed-up** `dev.db` (the one with all member/staff data) into the folder where the new app looks for the DB.
- If the new install uses the **same** folder (e.g. same install path and same `DB` folder), the new app may already see the old DB; just ensure you didn’t delete it.

### 4. Add the new table (one-time migration)

The old DB does not have `FileSyncQueue`. The new app needs this table.

**Option A – Using Prisma (if you can run commands on client PC or via a small script):**

- Open a command prompt in the folder that has your Prisma schema (e.g. `public/API/V1/prisma`).
- Set `DATABASE_URL` in `.env` so it points to the **actual** path of the existing `dev.db` on that PC (e.g. `file:C:/path/to/DB/dev.db`).
- Run:
  - `npx prisma db push --schema=public/API/V1/prisma/schema.prisma`  
  or, if you use migrations:
  - `npx prisma migrate deploy --schema=public/API/V1/prisma/schema.prisma`
- This will only **add** the `FileSyncQueue` table; it will not drop or alter existing tables or data.

**Option B – Run SQL directly on the DB:**

If you cannot run Prisma on the client, you can add the table with SQLite. Attach the client’s `dev.db` in any SQLite tool (e.g. DB Browser for SQLite) and run:

```sql
CREATE TABLE IF NOT EXISTS "FileSyncQueue" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "localPath" TEXT NOT NULL,
  "remoteUrl" TEXT,
  "fileType" TEXT NOT NULL,
  "entityType" TEXT NOT NULL,
  "entityId" INTEGER NOT NULL,
  "fieldName" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'pending',
  "errorMessage" TEXT,
  "retryCount" INTEGER NOT NULL DEFAULT 0,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "syncedAt" DATETIME
);

CREATE UNIQUE INDEX "FileSyncQueue_localPath_key" ON "FileSyncQueue"("localPath");
CREATE INDEX "FileSyncQueue_status_idx" ON "FileSyncQueue"("status");
CREATE INDEX "FileSyncQueue_entityType_entityId_idx" ON "FileSyncQueue"("entityType", "entityId");
```

After this, the new .exe can use the same DB and all old data (members, staff, payments, etc.) will work.

---

## When data would *not* fit (for future reference)

You would need a real data migration (script or tool) if you:

- **Remove** a column that the old DB still has.
- **Rename** a column (old rows would still have the old name).
- **Change** a column type in a way SQLite doesn’t allow (e.g. text → integer for existing non-numeric data).

In your current case you did **none** of that; you only added a new table. So the old data **will** fit after you add `FileSyncQueue` and point the new app at the same DB.

---

## Summary

| Question | Answer |
|----------|--------|
| Can we transfer/keep old data and use it with the new .exe? | **Yes.** |
| Will it fit after schema/table changes? | **Yes**, because only a new table was added; existing tables and columns are unchanged. |
| What must we do? | Backup DB → install new .exe → ensure new app uses the same (or a copied) DB file → run one-time step to create `FileSyncQueue` (Prisma or SQL). |

After that, the new .exe will run with the client’s existing gym member and staff data.
