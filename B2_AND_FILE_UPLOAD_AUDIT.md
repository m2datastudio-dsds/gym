# B2 Sync & File Upload Audit

This document summarizes how **file uploads** (photos, documents) and **database backup** use B2 sync across the project, and confirms **restore-from-B2** when local files are missing.

---

## 1. File uploads – B2 sync (addToSyncQueue) and restore (ensureEntityFiles)

Every upload path should:
- **On save/update:** add the new file to the sync queue via `FileSyncService.addToSyncQueue()` so it can be uploaded to B2.
- **On get/list:** call `FileSyncService.ensureEntityFiles(entityType, entityId)` before returning file URLs, so missing local files are restored from B2; then use `FileSyncService.convertToApiUrl()` for the URL.

### Expense
| Action | addToSyncQueue | ensureEntityFiles + convertToApiUrl |
|--------|----------------|-------------------------------------|
| saveExpense | ✅ | N/A |
| updateExpense (new files only) | ✅ | N/A |
| getAllExpenses | N/A | ✅ |
| getExpenseById | N/A | ✅ |

### Diet plan
| Action | addToSyncQueue | ensureEntityFiles + convertToApiUrl |
|--------|----------------|-------------------------------------|
| saveDietPlan | ✅ | N/A |
| updateDietPlan | ✅ | N/A |
| getAllDietPlans | N/A | ✅ |
| getDietPlanById | N/A | ✅ |

### Exercise plan
| Action | addToSyncQueue | ensureEntityFiles + convertToApiUrl |
|--------|----------------|-------------------------------------|
| saveExercisePlan | ✅ | N/A |
| updateExercisePlan | ✅ | N/A |
| getAllExercisePlans | N/A | ✅ |
| getExercisePlanById | N/A | ✅ |

### Member (memberPhoto, proofDocument)
| Action | addToSyncQueue | ensureEntityFiles + convertToApiUrl |
|--------|----------------|-------------------------------------|
| saveMember | ✅ (both fields) | N/A |
| updateMember | ✅ (both fields) | N/A |
| updateMemberProof | ✅ **(fixed)** | N/A |
| getallMember | N/A | ✅ (both; ensure even if only proofDocument) **(fixed)** |
| getMemberById | N/A | ✅ |
| getExpiredMembers | N/A | ✅ **(fixed)** |

### Staff (photoPicture)
| Action | addToSyncQueue | ensureEntityFiles + convertToApiUrl |
|--------|----------------|-------------------------------------|
| saveStaff | ✅ | N/A |
| updateStaff | ✅ | N/A |
| getallstaff | N/A | ✅ |
| getstaffById | N/A | ✅ |

### Attendance (member/staff photos in list/detail)
| Action | ensureEntityFiles before convertToApiUrl |
|--------|----------------------------------------|
| getAllMemberAttendance | ✅ **(fixed)** – ensure for each member with photo |
| getLatestMemberAttendance | ✅ **(fixed)** – ensure for member before photo URL |
| getallstaffAttendancewithDetails | ✅ **(fixed)** – ensure for each staff with photo |
| getLatestStaffAttendance | ✅ **(fixed)** – ensure for staff before photo URL |

---

## 2. Database backup to B2

- **What:** The SQLite database file is backed up to B2 at a fixed key: `backups/db/latest.db`.
- **When:** During the B2 sync cycle (auto-sync and manual trigger). Implemented in `b2SyncService.syncDbBackup()`.
- **Behaviour:** Upload only when the DB file exists and (optionally) has changed since the last backup (tracked via `.db-backup-state.json`).
- **Restore:** There is **no automatic restore** of the database from B2 when the local DB is missing. That was intentional: DB restore can be added later as a separate, explicit step (e.g. manual or admin-only) if desired.

So: **DB is backed up to B2; it is not auto-restored when local DB is missing.**

---

## 3. Fixes applied in this audit

1. **Member – updateMemberProof:** Added `FileSyncService.addToSyncQueue()` after updating the proof document so the new file is synced to B2.
2. **Member – getallMember:** Call `ensureEntityFiles('member', member.id)` when the member has either `memberPhoto` or `proofDocument` (so members with only proof document still get restore + correct URL).
3. **Member – getExpiredMembers:** For each expired member, call `ensureEntityFiles` and `convertToApiUrl` for `memberPhoto` and `proofDocument` so file URLs work and missing files are restored from B2.
4. **Attendance – getAllMemberAttendance:** Before building the response, call `ensureEntityFiles('member', member.id)` for every member that has a `memberPhoto`.
5. **Attendance – getLatestMemberAttendance:** Call `ensureEntityFiles('member', member.id)` before converting `memberPhoto` to URL.
6. **Staff attendance – getallstaffAttendancewithDetails:** Before building the response, call `ensureEntityFiles('staff', staff.id)` for every staff that has a `photoPicture`.
7. **Staff attendance – getLatestStaffAttendance:** Call `ensureEntityFiles('staff', staff.id)` before converting `photoPicture` to URL.

---

## 4. Flow summary

- **Upload:** Multer saves file locally → controller saves path in DB → `addToSyncQueue()` → B2 sync job uploads file and stores `remoteUrl` in `fileSyncQueue`.
- **Read (with restore):** Controller loads entity → `ensureEntityFiles(entityType, entityId)` restores any missing local files from B2 using `remoteUrl` → `convertToApiUrl()` builds the URL for the response.
- **DB:** Backed up to B2 on sync; no auto-restore when local DB is missing.
