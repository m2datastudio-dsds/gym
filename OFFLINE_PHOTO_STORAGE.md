# Offline-First Photo & Document Storage

## Overview

This app now uses an **offline-first** architecture for photos and documents. Files are always saved locally first, then optionally synced to Backblaze B2 cloud storage when online.

## How It Works

### Upload Flow

```
User uploads photo
    ↓
File saved to local folder
    ↓
Entry added to FileSyncQueue (status: "pending")
    ↓
Background sync detects pending files + online status
    ↓
Uploads to Backblaze B2
    ↓
Updates FileSyncQueue (status: "synced", remoteUrl: "https://...")
```

### Display Flow

```
App requests member/staff data
    ↓
Controller checks if local file exists
    ↓
If missing but remoteUrl exists → downloads from B2
    ↓
Returns API URL pointing to local file
    ↓
Frontend displays image from local storage
```

## Storage Locations

### Development (node server.js)
```
{project_root}/uploads/
├── members/          # Member photos
├── staff/            # Staff photos
├── documents/        # Proof documents
└── misc/             # Other files
```

### Production (Electron .exe)
```
C:\Users\{username}\AppData\Roaming\GymApp\uploads\
├── members/
├── staff/
├── documents/
└── misc/
```

## Key Features

### 1. Works Offline
- Photos upload instantly (saved locally)
- No waiting for cloud upload
- App works without internet

### 2. No Duplicates
- Each file tracked by unique local path
- Sync queue prevents re-uploading synced files
- Only `status: "pending"` files are uploaded

### 3. Auto-Restore
- If local file missing but `remoteUrl` exists
- App automatically downloads from B2
- Handles app reinstall or PC migration

### 4. Local Files Never Deleted
- Even after syncing to B2
- Ensures offline viewing always works
- B2 is backup, not primary storage

## Database Schema

```sql
FileSyncQueue {
  id              Int       -- Auto-increment
  localPath       String    -- Full path to local file (unique)
  remoteUrl       String?   -- B2 URL after sync
  fileType        String    -- MIME type
  entityType      String    -- "member" or "staff"
  entityId        Int       -- Member/Staff ID
  fieldName       String    -- "memberPhoto", "proofDocument", "photoPicture"
  status          String    -- "pending", "synced", or "failed"
  errorMessage    String?   -- Error details if failed
  retryCount      Int       -- Auto-retry up to 5 times
  createdAt       DateTime
  updatedAt       DateTime
  syncedAt        DateTime? -- When synced to B2
}
```

## Setting Up Backblaze B2 (Optional)

If you want cloud backup, configure B2 in `public/API/V1/.env`:

1. Create a Backblaze account: https://www.backblaze.com/b2/cloud-storage.html
2. Create a bucket (public or private)
3. Create an Application Key with read/write access
4. Add to `.env`:

```env
B2_APPLICATION_KEY_ID="your_key_id"
B2_APPLICATION_KEY="your_application_key"
B2_BUCKET_ID="your_bucket_id"
B2_BUCKET_NAME="your_bucket_name"
```

5. Restart the server - auto-sync will start

### B2 Free Tier Limits
- 10 GB storage
- 1 GB/day download bandwidth
- Unlimited uploads

## API Endpoints

### GET /api/sync/status
Returns sync queue statistics.

```json
{
  "code": 200,
  "data": {
    "pending": 5,
    "synced": 100,
    "failed": 0,
    "total": 105,
    "b2Configured": true,
    "autoSyncEnabled": true
  }
}
```

### POST /api/sync/trigger
Manually trigger B2 sync.

```json
{
  "code": 200,
  "message": "Sync completed",
  "data": {
    "status": "completed",
    "synced": 3,
    "failed": 0
  }
}
```

### GET /api/sync/pending
List pending files.

## Troubleshooting

### Photos not showing?
1. Check if file exists in uploads folder
2. Check API console for errors
3. Try restarting the server

### Sync not working?
1. Check B2 credentials in `.env`
2. Check internet connection
3. Check `/api/sync/status` for errors
4. Check server logs for B2 errors

### Files not syncing after PC migration?
1. Install the app
2. Files will auto-download from B2 when accessed
3. Check `/api/sync/status` for `remoteUrl` availability

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      Gym Desktop App                        │
├─────────────────────────────────────────────────────────────┤
│  Frontend (React)                                           │
│  ┌─────────────┐                                            │
│  │ Upload Form │ ──────────────┐                            │
│  └─────────────┘               │                            │
│                                ▼                            │
│  ┌─────────────────────────────────────────────────┐       │
│  │             Backend (Express.js)                 │       │
│  │  ┌──────────────┐    ┌─────────────────────┐    │       │
│  │  │ multerLocal  │───▶│ Local Uploads Folder│    │       │
│  │  │ (middleware) │    │ /uploads/members/   │    │       │
│  │  └──────────────┘    └─────────────────────┘    │       │
│  │         │                     ▲                  │       │
│  │         ▼                     │                  │       │
│  │  ┌──────────────────┐  ┌──────────────┐         │       │
│  │  │ FileSyncService  │  │ express.static│         │       │
│  │  │ (add to queue)   │  │ /uploads/*   │          │       │
│  │  └──────────────────┘  └──────────────┘         │       │
│  │         │                                        │       │
│  │         ▼                                        │       │
│  │  ┌──────────────────┐                            │       │
│  │  │ FileSyncQueue DB │                            │       │
│  │  │ (pending/synced) │                            │       │
│  │  └──────────────────┘                            │       │
│  │         │                                        │       │
│  │         ▼                                        │       │
│  │  ┌──────────────────┐                            │       │
│  │  │ B2SyncService    │──────────▶ Backblaze B2   │       │
│  │  │ (background)     │◀────────── (cloud backup) │       │
│  │  └──────────────────┘                            │       │
│  └─────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

## Files Changed

- `public/API/V1/middlewares/multerLocal.js` - New local disk storage
- `public/API/V1/services/fileSyncService.js` - Sync queue management
- `public/API/V1/services/b2SyncService.js` - Backblaze B2 integration
- `public/API/V1/routes/sync.js` - Sync API endpoints
- `public/API/V1/controllers/Members/memberController.js` - Updated for local storage
- `public/API/V1/controllers/Staff/staffController.js` - Updated for local storage
- `public/API/V1/routes/member.js` - Uses multerLocal
- `public/API/V1/routes/staff.js` - Uses multerLocal
- `public/API/V1/routes/index.js` - Added sync routes
- `public/API/V1/prisma/schema.prisma` - Added FileSyncQueue model
- `server.js` - Serves uploads folder, starts auto-sync
