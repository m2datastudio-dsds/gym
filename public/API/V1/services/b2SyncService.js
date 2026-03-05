const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');
const FileSyncService = require('./fileSyncService');
const { logger } = require('../utils/logger');

/**
 * Backblaze B2 Sync Service
 * 
 * Handles background synchronization of local files to Backblaze B2 cloud storage.
 * 
 * SETUP REQUIRED:
 * Add these to your .env file:
 *   B2_APPLICATION_KEY_ID=your_key_id
 *   B2_APPLICATION_KEY=your_application_key
 *   B2_BUCKET_ID=your_bucket_id
 *   B2_BUCKET_NAME=your_bucket_name
 * 
 * ARCHITECTURE:
 * 1. Authorize with B2 API to get auth token and API URL
 * 2. Get upload URL for the bucket
 * 3. Upload files from sync queue with status='pending'
 * 4. Mark as synced with remote URL after successful upload
 * 5. Auto-retry failed uploads up to 5 times
 */

class B2SyncService {
    constructor() {
        this.authToken = null;
        this.apiUrl = null;
        this.downloadUrl = null;
        this.uploadUrl = null;
        this.uploadAuthToken = null;
        this.bucketId = process.env.B2_BUCKET_ID || '';
        this.bucketName = process.env.B2_BUCKET_NAME || '';
        this.keyId = process.env.B2_APPLICATION_KEY_ID || '';
        this.applicationKey = process.env.B2_APPLICATION_KEY || '';
        this.isRunning = false;
        this.syncInterval = null;
    }

    /**
     * Check if B2 is configured
     */
    isConfigured() {
        return !!(this.keyId && this.applicationKey && this.bucketId);
    }

    /**
     * Authorize with Backblaze B2
     */
    async authorize() {
        if (!this.isConfigured()) {
            logger.warn('B2 not configured. Skipping authorization.');
            return false;
        }

        return new Promise((resolve, reject) => {
            const credentials = Buffer.from(`${this.keyId}:${this.applicationKey}`).toString('base64');
            
            const options = {
                hostname: 'api.backblazeb2.com',
                path: '/b2api/v2/b2_authorize_account',
                method: 'GET',
                headers: {
                    'Authorization': `Basic ${credentials}`
                }
            };

            const req = https.request(options, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    if (res.statusCode === 200) {
                        try {
                            const response = JSON.parse(data);
                            this.authToken = response.authorizationToken;
                            this.apiUrl = response.apiUrl;
                            this.downloadUrl = response.downloadUrl;
                            logger.info('B2 authorization successful');
                            resolve(true);
                        } catch (e) {
                            reject(new Error('Failed to parse B2 auth response'));
                        }
                    } else {
                        reject(new Error(`B2 auth failed: ${res.statusCode} - ${data}`));
                    }
                });
            });

            req.on('error', reject);
            req.end();
        });
    }

    /**
     * Get upload URL from B2
     */
    async getUploadUrl() {
        if (!this.authToken || !this.apiUrl) {
            await this.authorize();
        }

        return new Promise((resolve, reject) => {
            const apiHost = new URL(this.apiUrl).hostname;
            const postData = JSON.stringify({ bucketId: this.bucketId });

            const options = {
                hostname: apiHost,
                path: '/b2api/v2/b2_get_upload_url',
                method: 'POST',
                headers: {
                    'Authorization': this.authToken,
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(postData)
                }
            };

            const req = https.request(options, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    if (res.statusCode === 200) {
                        try {
                            const response = JSON.parse(data);
                            this.uploadUrl = response.uploadUrl;
                            this.uploadAuthToken = response.authorizationToken;
                            resolve(true);
                        } catch (e) {
                            reject(new Error('Failed to parse upload URL response'));
                        }
                    } else {
                        reject(new Error(`Failed to get upload URL: ${res.statusCode} - ${data}`));
                    }
                });
            });

            req.on('error', reject);
            req.write(postData);
            req.end();
        });
    }

    /**
     * Upload a buffer to B2 with a specific key (overwrites existing object at that key)
     */
    async uploadBufferToKey(buffer, b2FileName, contentType = 'application/octet-stream') {
        if (!this.uploadUrl || !this.uploadAuthToken) {
            await this.getUploadUrl();
        }

        const sha1Hash = crypto.createHash('sha1').update(buffer).digest('hex');
        const uploadHost = new URL(this.uploadUrl).hostname;
        const uploadPath = new URL(this.uploadUrl).pathname;

        return new Promise((resolve, reject) => {
            const options = {
                hostname: uploadHost,
                path: uploadPath,
                method: 'POST',
                headers: {
                    'Authorization': this.uploadAuthToken,
                    'X-Bz-File-Name': encodeURIComponent(b2FileName),
                    'Content-Type': contentType,
                    'Content-Length': buffer.length,
                    'X-Bz-Content-Sha1': sha1Hash
                }
            };

            const req = https.request(options, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    if (res.statusCode === 200) {
                        try {
                            const response = JSON.parse(data);
                            const remoteUrl = `${this.downloadUrl}/file/${this.bucketName}/${b2FileName}`;
                            resolve(remoteUrl);
                        } catch (e) {
                            reject(new Error('Failed to parse upload response'));
                        }
                    } else if (res.statusCode === 401) {
                        this.uploadUrl = null;
                        this.uploadAuthToken = null;
                        reject(new Error('Upload auth expired, will retry'));
                    } else {
                        reject(new Error(`Upload failed: ${res.statusCode} - ${data}`));
                    }
                });
            });

            req.on('error', reject);
            req.write(buffer);
            req.end();
        });
    }

    /**
     * Upload a single file to B2 (for sync queue; path derived from local path)
     */
    async uploadFile(localPath) {
        if (!this.uploadUrl || !this.uploadAuthToken) {
            await this.getUploadUrl();
        }

        const fileBuffer = fs.readFileSync(localPath);
        const sha1Hash = crypto.createHash('sha1').update(fileBuffer).digest('hex');
        const fileName = `gym-uploads/${path.basename(path.dirname(localPath))}/${path.basename(localPath)}`;
        const contentType = this.getContentType(localPath);

        return new Promise((resolve, reject) => {
            const uploadHost = new URL(this.uploadUrl).hostname;
            const uploadPath = new URL(this.uploadUrl).pathname;

            const options = {
                hostname: uploadHost,
                path: uploadPath,
                method: 'POST',
                headers: {
                    'Authorization': this.uploadAuthToken,
                    'X-Bz-File-Name': encodeURIComponent(fileName),
                    'Content-Type': contentType,
                    'Content-Length': fileBuffer.length,
                    'X-Bz-Content-Sha1': sha1Hash
                }
            };

            const req = https.request(options, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    if (res.statusCode === 200) {
                        try {
                            const response = JSON.parse(data);
                            const remoteUrl = `${this.downloadUrl}/file/${this.bucketName}/${fileName}`;
                            resolve(remoteUrl);
                        } catch (e) {
                            reject(new Error('Failed to parse upload response'));
                        }
                    } else if (res.statusCode === 401) {
                        this.uploadUrl = null;
                        this.uploadAuthToken = null;
                        reject(new Error('Upload auth expired, will retry'));
                    } else {
                        reject(new Error(`Upload failed: ${res.statusCode} - ${data}`));
                    }
                });
            });

            req.on('error', reject);
            req.write(fileBuffer);
            req.end();
        });
    }

    /**
     * Get content type based on file extension
     */
    getContentType(filePath) {
        const ext = path.extname(filePath).toLowerCase();
        const types = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.webp': 'image/webp',
            '.pdf': 'application/pdf'
        };
        return types[ext] || 'application/octet-stream';
    }

    /** Fixed B2 key for DB backup (overwrite same path every time) */
    static get DB_BACKUP_B2_KEY() {
        return 'backups/db/latest.db';
    }

    /**
     * Sync the full SQLite DB file to B2 (overwrites previous snapshot at same path).
     * Only uploads when DB file exists and (optionally) has changed since last backup.
     */
    async syncDbBackup() {
        if (!this.isConfigured()) return { uploaded: false };
        const online = await this.isOnline();
        if (!online) return { uploaded: false, offline: true };

        let dbPath;
        try {
            const prisma = require('../config/db.config');
            dbPath = prisma.dbPath;
        } catch (e) {
            logger.warn('DB backup: could not get db path', e.message);
            return { uploaded: false };
        }

        if (!dbPath || !fs.existsSync(dbPath)) {
            logger.debug('DB backup: file not found', dbPath);
            return { uploaded: false };
        }

        const stat = fs.statSync(dbPath);
        const statePath = path.join(path.dirname(dbPath), '.db-backup-state.json');
        let lastMtime = null;
        try {
            if (fs.existsSync(statePath)) {
                const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
                lastMtime = state.lastBackupMtime;
            }
        } catch (_) { /* ignore */ }

        if (lastMtime != null && stat.mtimeMs <= lastMtime) {
            logger.debug('DB backup: no change since last backup, skip');
            return { uploaded: false, skipped: true };
        }

        try {
            if (!this.uploadUrl || !this.uploadAuthToken) {
                await this.getUploadUrl();
            }
            const fileBuffer = fs.readFileSync(dbPath);
            await this.uploadBufferToKey(fileBuffer, B2SyncService.DB_BACKUP_B2_KEY, 'application/octet-stream');
            fs.writeFileSync(statePath, JSON.stringify({ lastBackupMtime: stat.mtimeMs }), 'utf8');
            logger.info('DB backup: synced to B2 (backups/db/latest.db)');
            return { uploaded: true };
        } catch (error) {
            logger.error(`DB backup failed: ${error.message}`);
            return { uploaded: false, error: error.message };
        }
    }

    /**
     * Check if we have internet connectivity
     */
    async isOnline() {
        return new Promise((resolve) => {
            const req = https.request({
                hostname: 'api.backblazeb2.com',
                path: '/',
                method: 'HEAD',
                timeout: 5000
            }, (res) => {
                resolve(true);
            });

            req.on('error', () => resolve(false));
            req.on('timeout', () => {
                req.destroy();
                resolve(false);
            });

            req.end();
        });
    }

    /**
     * Sync pending files to B2
     */
    async syncPendingFiles() {
        if (!this.isConfigured()) {
            logger.debug('B2 not configured. Skipping sync.');
            return { synced: 0, failed: 0 };
        }

        const online = await this.isOnline();
        if (!online) {
            logger.debug('Offline. Skipping B2 sync.');
            return { synced: 0, failed: 0, offline: true };
        }

        const pendingFiles = await FileSyncService.getPendingFiles(10);
        
        if (pendingFiles.length === 0) {
            return { synced: 0, failed: 0 };
        }

        logger.info(`Syncing ${pendingFiles.length} pending files to B2...`);
        let synced = 0;
        let failed = 0;

        for (const file of pendingFiles) {
            try {
                if (!FileSyncService.localFileExists(file.localPath)) {
                    await FileSyncService.markAsFailed(file.localPath, 'Local file not found');
                    failed++;
                    continue;
                }

                const remoteUrl = await this.uploadFile(file.localPath);
                await FileSyncService.markAsSynced(file.localPath, remoteUrl);
                logger.info(`Synced: ${path.basename(file.localPath)} -> ${remoteUrl}`);
                synced++;
            } catch (error) {
                logger.error(`Failed to sync ${file.localPath}: ${error.message}`);
                await FileSyncService.markAsFailed(file.localPath, error.message);
                failed++;
                
                if (error.message.includes('auth expired')) {
                    this.authToken = null;
                    this.uploadUrl = null;
                }
            }
        }

        return { synced, failed };
    }

    /**
     * Start automatic background sync
     * Runs every 60 seconds when online
     */
    startAutoSync(intervalMs = 60000) {
        if (this.syncInterval) {
            return;
        }

        if (!this.isConfigured()) {
            logger.info('B2 not configured. Auto-sync disabled. Set B2_APPLICATION_KEY_ID, B2_APPLICATION_KEY, and B2_BUCKET_ID in .env to enable.');
            return;
        }

        logger.info(`Starting B2 auto-sync (interval: ${intervalMs}ms)`);
        
        this.syncInterval = setInterval(async () => {
            if (this.isRunning) return;

            this.isRunning = true;
            try {
                await this.syncPendingFiles();
                await this.syncDbBackup();
            } catch (error) {
                logger.error(`Auto-sync error: ${error.message}`);
            } finally {
                this.isRunning = false;
            }
        }, intervalMs);

        setTimeout(async () => {
            try {
                await this.syncPendingFiles();
                await this.syncDbBackup();
            } catch (e) {
                logger.error('Initial sync error:', e.message);
            }
        }, 5000);
    }

    /**
     * Stop automatic background sync
     */
    stopAutoSync() {
        if (this.syncInterval) {
            clearInterval(this.syncInterval);
            this.syncInterval = null;
            logger.info('B2 auto-sync stopped');
        }
    }

    /**
     * Manual sync trigger (for API endpoint): pending files + DB backup
     */
    async triggerSync() {
        if (this.isRunning) {
            return { status: 'already_running' };
        }

        this.isRunning = true;
        try {
            const result = await this.syncPendingFiles();
            const dbResult = await this.syncDbBackup();
            return { status: 'completed', ...result, dbBackup: dbResult };
        } finally {
            this.isRunning = false;
        }
    }
}

const b2SyncServiceInstance = new B2SyncService();

module.exports = {
    B2SyncService,
    b2SyncService: b2SyncServiceInstance
};
