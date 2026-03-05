# Gym App – Deployment, Updates & Database Guide

This document answers: (1) how to ship corrections to clients, (2) whether you can change the existing .exe, (3) how the database is set up and how to inspect it, and (4) what happens to client data when you install a new .exe.

---

## 1. Project structure (high level)

- **Electron** main process: `main.js` (dev) / `build/main.js` (packaged).
- **React** UI: `src/` (built into `build/static/` and loaded in the renderer).
- **Backend** (runs inside Electron in production): Express in `server.js` → `public/API/V1/` (routes, controllers, Prisma).
- **Database**: SQLite file `DB/dev.db`, used via **Prisma** (`public/API/V1/prisma/schema.prisma`).
- **Packaging**: `electron-builder` produces `out/GymApp Setup 0.1.0.exe` (NSIS installer) and `out/win-unpacked/` (portable).

---

## 2. If you make changes, do you need to install the .exe again?

**Yes.** There is **no auto-updater** in this project (no `electron-updater` or similar). So:

- You **rebuild** the app (`npm run build-win`), then distribute the **new installer .exe**.
- Each client must **run the new installer** (install again over the old version or do a fresh install).

You **cannot** “edit the existing .exe” on the client PC to apply code changes. The .exe is the packaged app; any change in code or assets requires a new build and a new installer.

**Optional later improvement:** Integrate `electron-updater` so the app can update itself without the user manually running a new installer.

---

## 3. Database setup and how to check the database

### What is used

- **Engine:** SQLite.
- **File:** `DB/dev.db` (single file, no separate server).
- **ORM:** Prisma; schema: `public/API/V1/prisma/schema.prisma`.
- **Connection:** All API controllers use `public/API/V1/config/db.config.js`, which builds a path to `dev.db` and passes it to `PrismaClient` via `datasources.db.url`.

So “database setup” = where `dev.db` is stored and how Prisma is pointed to it. That is controlled by `db.config.js` (see below).

### How to “check” the database

**Option A – SQLite CLI (recommended)**  
If you have SQLite installed:

```bash
sqlite3 "d:\M2 DATA STUDIO\GYM\PRAVYN FILE\Gym-app (3)\Gym-app (3)\Gym-app3 - Rework\DB\dev.db"
```

Then run SQL, e.g.:

```sql
.tables
SELECT * FROM Member LIMIT 5;
.quit
```

**Option B – GUI tools**  
Use any SQLite GUI (e.g. DB Browser for SQLite, DBeaver, or the one referenced in `dev.sqbpro`) and open:

`d:\...\Gym-app3 - Rework\DB\dev.db`

**Option C – Prisma Studio**  
From the project root:

```bash
npx prisma studio
```

It will use the DB URL from your environment/schema and open a browser UI to browse and edit data.

**Important:** For Prisma to see the same file as the app, run this from the project root and ensure the schema (or `DATABASE_URL`) points to the same `dev.db` path the app uses (see next section).

---

## 4. Where does the app expect the DB in production (packaged .exe)?

In **development**, the app uses the path computed in `db.config.js`:

- `dbPath = path.join(__dirname, "../../../../../DB/dev.db")`  
  From `build/public/API/V1/config` (or `public/API/V1/config` when run from `public`), this goes up to the project root and then into `DB/dev.db`.

In the **packaged app**:

- The backend runs from inside the app (e.g. `.../resources/app.asar/build/...`).
- `__dirname` in `db.config.js` is inside that packaged path, so the same `../../../../../DB/dev.db` resolves to something like `.../app.asar/build/DB/dev.db`.
- The installer, however, puts the DB in **resources** via `electron-builder.json` (`extraResources`: `DB` → `resources/DB`). So the DB file on disk is at `resources/DB/dev.db`, **not** inside `build/`. So the current path in `db.config.js` may **not** match where the packaged app actually has the DB, and the app might be using a DB in a different location (or failing) depending on how the packager and OS resolve paths.

So: “database setup” for the project is “one SQLite file”; “how to check it” is open that file with SQLite/Prisma Studio; and “where the app looks for it” is defined in `db.config.js` (and should be aligned with where the packaged app places the file).

---

## 5. If the client installs the new .exe, will old data still show?

It **depends where** the running app actually stores and loads `dev.db` on the client PC.

- If the DB path used at runtime is **inside the app installation folder** (e.g. under `Program Files` or next to the .exe):
  - **Uninstall / reinstall** often **deletes** that folder → **old data can be lost** unless the installer or app explicitly preserves it.
- If the DB path used at runtime is in a **per-user, persistent** location (e.g. Electron’s `app.getPath('userData')` → e.g. `C:\Users\<user>\AppData\Roaming\GymApp`):
  - Installing a **new .exe** (same or new version) usually **does not** delete that folder → **old data will still be there** and the app will show it.

In this project, the path is **not** currently set to `userData`; it’s derived from `__dirname` relative to the code, which in production is inside the app bundle. So:

- **Risk:** If the client uninstalls and reinstalls (or installs to a new path), the DB that lived under the old install path may be removed and **they would have to re-enter data**.
- **Safe approach:** Store the DB in Electron’s user data directory and point Prisma to that path so **reinstalling the .exe does not remove data**. Then, after you make corrections and ship a new .exe, the client can install it and still see old data.

---

## 6. Recommended: store DB in userData so data survives reinstall

So that “install new .exe” does **not** force clients to re-enter everything:

1. **Use a single, persistent DB path** for the packaged app: Electron’s user data directory.
2. **On first run** (or when the DB file doesn’t exist), **copy** the bundled `resources/DB/dev.db` (or an empty/migrated DB) to that userData path, then run migrations if needed.
3. **In `db.config.js`** (or wherever you create `PrismaClient`), use that userData path when running inside Electron (e.g. detect via `process.versions.electron` or an env set by `main.js`).

Concretely:

- In **main process** (e.g. in `main.js` or in code that starts the server), compute:
  - `const { app } = require('electron');`
  - `const userDataPath = app.getPath('userData');`
  - `const dbPath = path.join(userDataPath, 'dev.db');`
- Start the Express server (or Prisma) with this `dbPath` (e.g. pass it via `process.env.DATABASE_URL` or a shared config that `db.config.js` reads).
- Ensure the server/Prisma uses **this** path in production so all data is written under `userData`. Then:
  - You can “check the database” by opening that `dev.db` (e.g. with Prisma Studio or SQLite, with the same path).
  - Installing a new .exe won’t delete that folder, so **old data will still show** for the client.

---

## 7. Summary table

| Question | Answer |
|----------|--------|
| After you make corrections, must the client install the .exe again? | **Yes.** There is no auto-updater; you ship a new installer and they run it. |
| Can you change the existing .exe on the client? | **No.** You change source code, rebuild, and distribute a new .exe. |
| What is the database? | **SQLite** in `DB/dev.db`, accessed via **Prisma**. |
| How to check the database? | Use **SQLite CLI**, a **SQLite GUI**, or **Prisma Studio** on the same `dev.db` file the app uses. |
| Will old data show after installing the new .exe? | **Only if** the DB is stored in a place that isn’t removed on reinstall (e.g. userData). Right now it’s tied to the app path, so **recommended: move DB to userData** so data persists. |

Once you have decided how you want to handle the DB path in production (e.g. userData + copy from resources on first run), you can implement that in `main.js` and `db.config.js` and then proceed with your corrections; the rest of the app (Prisma, controllers, React) can stay the same.
