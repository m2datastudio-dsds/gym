# Transfer DB and Data from Old Installer to New Installer

Use this to move your existing database and uploads from the **old** Gym app install to the **new** installer so you don’t re-enter anything. Test on your PC first, then do the same on the client PC.

---

## 1. Where the old app stores data

| What | Where (typical on Windows) |
|------|-----------------------------|
| **Database** | Either (a) inside the old install folder, e.g. `C:\Users\<You>\AppData\Local\Programs\Gym Management System\resources\DB\dev.db` or a `DB` folder next to the app, or (b) in Electron userData: `C:\Users\<You>\AppData\Roaming\Gym Management System\dev.db` (if the old app stored it there). |
| **Uploads** (photos, plan files, receipts) | `C:\Users\<You>\AppData\Roaming\Gym Management System\uploads` (Electron userData). |

**How to find the old DB:**  
Search for `dev.db` under `C:\Users\<You>\AppData` (Local and Roaming). The one that has your members/staff data is the one to back up.

---

## 2. Steps on your PC (test run)

### Step 1 – Backup old data (do this before uninstalling or installing new)

1. **Find the old app’s database**
   - Search for `dev.db` under `C:\Users\<You>\AppData`.
   - Or open the old app’s install folder (e.g. `AppData\Local\Programs\Gym Management System` or `Program Files`) and look for a `DB` folder or `resources\DB`.
2. **Copy the DB**
   - Copy `dev.db` to a safe place, e.g. Desktop: `Desktop\gym_backup_dev.db`.
3. **Copy uploads** (so photos/documents still work)
   - Copy the whole folder:  
     `C:\Users\<You>\AppData\Roaming\Gym Management System\uploads`  
     to e.g. `Desktop\gym_backup_uploads`.

### Step 2 – Install the new app

- Run the **new** installer (`Gym-Management-System-Setup-0.1.0.exe`).
- You can uninstall the old app first, or install the new one and then remove the old one.  
- **Do not delete** your backup (`gym_backup_dev.db` and `gym_backup_uploads`) until you’ve confirmed the new app works with the transferred data.

### Step 3 – Find where the new app expects the DB

After installing the new app, its DB is usually in one of:

- `C:\Users\<You>\AppData\Local\Programs\Gym Management System\resources\DB\dev.db`, or  
- Inside the install folder: `…\Gym Management System\resources\DB\dev.db`, or  
- Sometimes under `AppData\Roaming\Gym Management System\` (if the new app was changed to use userData for the DB).

Search again for `dev.db` under `C:\Users\<You>\AppData` and under the new “Gym Management System” install folder. The **new** `dev.db` (often empty or default) is the one we will replace.

### Step 4 – Replace the new app’s DB with your backup

1. **Quit the new app** if it’s running.
2. **Rename** the new app’s current `dev.db` to `dev.db.new` (so you can restore it if needed).
3. **Copy** your backup `gym_backup_dev.db` into the **same folder** where the new app’s `dev.db` was, and **rename** the copy to `dev.db`.

So the new app’s DB path should now point to a file named `dev.db` that is actually your old data.

### Step 5 – Add the new table (required once per DB)

The new app expects a `FileSyncQueue` table. The old DB usually doesn’t have it. Add it once:

**Option A – SQL (no Prisma needed)**  
Open the **same** `dev.db` (the one you just copied) in a SQLite tool (e.g. [DB Browser for SQLite](https://sqlitebrowser.org/)) and run:

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
CREATE UNIQUE INDEX IF NOT EXISTS "FileSyncQueue_localPath_key" ON "FileSyncQueue"("localPath");
CREATE INDEX IF NOT EXISTS "FileSyncQueue_status_idx" ON "FileSyncQueue"("status");
CREATE INDEX IF NOT EXISTS "FileSyncQueue_entityType_entityId_idx" ON "FileSyncQueue"("entityType", "entityId");
```

**Option B – Prisma (if you have the project on this PC)**  
Point `DATABASE_URL` in `.env` to that same `dev.db` (full path, e.g. `file:C:/Users/You/AppData/Local/Programs/Gym Management System/resources/DB/dev.db`), then run:

```bash
npx prisma db push --schema=public/API/V1/prisma/schema.prisma
```

That will add any missing tables/columns (including `FileSyncQueue`) and leave existing data as-is.

### Step 6 – Restore uploads

1. **Quit the new app.**
2. Open: `C:\Users\<You>\AppData\Roaming\Gym Management System\`.
3. If there is already an `uploads` folder, rename it to `uploads.new`.
4. **Copy** your backed-up `gym_backup_uploads` folder into that Roaming folder and **rename** the copied folder to `uploads`.

So the new app’s uploads path (`userData/uploads`) now contains your old photos and files.

### Step 7 – Start the new app and check

- Open the new “Gym Management System” app.
- Check: members, staff, diet/exercise plans, expense receipts, etc.
- Check that photos and plan files open (they should if the DB paths and `uploads` match what the app expects).

If something doesn’t load or you get “table/column not found”, see the “Schema / column changes” section below.

---

## 3. Do you need to change database columns?

- **If the old installer was built from the same (or very similar) codebase as the current one:**  
  The only structural change in the new app is the **new table** `FileSyncQueue`. Existing tables (Member, Staff, DietPlan, ExercisePlan, Expense, etc.) are the same; no columns were removed or renamed in the current schema. So you **do not** need to change columns—only add the `FileSyncQueue` table (Step 5).

- **If the old installer was from a much older version** (e.g. different Prisma schema, or different column types):  
  Then the old DB might be missing columns or have different types. In that case:
  - Run **Option B** above (`npx prisma db push`) with the project’s current `schema.prisma` and `DATABASE_URL` pointing at the copied `dev.db`. Prisma will add missing columns/tables and adjust where it can, or
  - If you get specific errors (e.g. “column X not found”), we can add a small migration (SQL or script) to add those columns. Share the exact error and table name.

So: **for the current new installer, no manual column changes are required**—only adding `FileSyncQueue`. If the old DB is from an older schema, use `prisma db push` or targeted SQL.

---

## 4. Same steps on the client PC

1. **Backup** the client’s `dev.db` and `uploads` from the old install (same paths as in section 1; search for `dev.db` and the app’s Roaming folder).
2. **Install** the new installer on the client.
3. **Find** where the new app’s `dev.db` is on the client (same search).
4. **Replace** that `dev.db` with the client’s backup, renamed to `dev.db`.
5. **Run** the same `FileSyncQueue` SQL (Option A) on that DB, or run `prisma db push` (Option B) if you have the project there.
6. **Copy** the client’s backup `uploads` into the new app’s Roaming `uploads` folder as in Step 6.
7. **Open** the new app and verify data and files.

---

## 5. Short checklist (your PC and client)

- [ ] Backup old `dev.db` and old `uploads` folder.
- [ ] Install new app.
- [ ] Replace new app’s `dev.db` with backup, named `dev.db`.
- [ ] Add `FileSyncQueue` table (SQL or Prisma).
- [ ] Replace new app’s `uploads` with backup.
- [ ] Start new app and confirm members, staff, plans, expenses, and file previews.

If anything fails (e.g. “table/column not found” or missing photos), note the exact message and where it appears—then we can add the minimal migration or path fix without changing the rest of the app.
