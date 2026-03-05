const prisma = require('../config/db.config');
const path = require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');
const { getUploadsDir } = require('../middlewares/multerLocal');
const { logger } = require('../utils/logger');

/**
 * File Sync Service - Handles offline-first file management
 * 
 * FLOW:
 * 1. Files are saved locally via multerLocal middleware
 * 2. addToSyncQueue() adds entry with status='pending'
 * 3. Background sync (when implemented) uploads pending files to B2
 * 4. After sync, status='synced' and remoteUrl is populated
 * 5. getFileUrl() returns local path for display
 * 6. If local file missing but remoteUrl exists, restoreFromRemote() downloads it
 */

class FileSyncService {

    /**
     * Add a locally saved file to the sync queue
     * Called after multer saves file to disk
     */
    static async addToSyncQueue({ localPath, fileType, entityType, entityId, fieldName }) {
        try {
            const existing = await prisma.fileSyncQueue.findUnique({
                where: { localPath }
            });

            if (existing) {
                return await prisma.fileSyncQueue.update({
                    where: { localPath },
                    data: {
                        fileType,
                        entityType,
                        entityId,
                        fieldName,
                        status: 'pending',
                        retryCount: 0,
                        errorMessage: null,
                        updatedAt: new Date()
                    }
                });
            }

            return await prisma.fileSyncQueue.create({
                data: {
                    localPath,
                    fileType,
                    entityType,
                    entityId,
                    fieldName,
                    status: 'pending'
                }
            });
        } catch (error) {
            logger.error(`Error adding to sync queue: ${error.message}`);
            throw error;
        }
    }

    /**
     * Get all pending files that need to be synced
     */
    static async getPendingFiles(limit = 50) {
        try {
            return await prisma.fileSyncQueue.findMany({
                where: {
                    status: 'pending',
                    retryCount: { lt: 5 }
                },
                take: limit,
                orderBy: { createdAt: 'asc' }
            });
        } catch (error) {
            logger.error(`Error getting pending files: ${error.message}`);
            return [];
        }
    }

    /**
     * Mark a file as synced with its remote URL
     */
    static async markAsSynced(localPath, remoteUrl) {
        try {
            return await prisma.fileSyncQueue.update({
                where: { localPath },
                data: {
                    status: 'synced',
                    remoteUrl,
                    syncedAt: new Date(),
                    errorMessage: null
                }
            });
        } catch (error) {
            logger.error(`Error marking file as synced: ${error.message}`);
            throw error;
        }
    }

    /**
     * Mark a file sync as failed with error message
     */
    static async markAsFailed(localPath, errorMessage) {
        try {
            const current = await prisma.fileSyncQueue.findUnique({
                where: { localPath }
            });

            return await prisma.fileSyncQueue.update({
                where: { localPath },
                data: {
                    status: current && current.retryCount >= 4 ? 'failed' : 'pending',
                    errorMessage,
                    retryCount: { increment: 1 }
                }
            });
        } catch (error) {
            logger.error(`Error marking file as failed: ${error.message}`);
            throw error;
        }
    }

    /**
     * Get sync status for a file by its local path
     */
    static async getSyncStatus(localPath) {
        try {
            return await prisma.fileSyncQueue.findUnique({
                where: { localPath }
            });
        } catch (error) {
            logger.error(`Error getting sync status: ${error.message}`);
            return null;
        }
    }

    /**
     * Get the appropriate URL to use for displaying a file
     * Always returns local path (for offline support)
     * The frontend will convert this to a proper URL
     */
    static getDisplayPath(localPath) {
        if (!localPath) return null;
        
        const uploadsDir = getUploadsDir();
        const relativePath = localPath.replace(uploadsDir, '').replace(/\\/g, '/');
        return `/uploads${relativePath}`;
    }

    /**
     * Check if a local file exists
     */
    static localFileExists(localPath) {
        try {
            return fs.existsSync(localPath);
        } catch {
            return false;
        }
    }

    /**
     * Restore a file from remote URL if local file is missing
     * This is critical for app reinstalls or when files are accidentally deleted
     */
    static async restoreFromRemote(localPath, remoteUrl) {
        if (!remoteUrl) {
            logger.warn(`Cannot restore ${localPath}: no remote URL available`);
            return false;
        }

        if (this.localFileExists(localPath)) {
            return true;
        }

        try {
            const dir = path.dirname(localPath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            await this.downloadFile(remoteUrl, localPath);
            logger.info(`Restored file from remote: ${localPath}`);
            return true;
        } catch (error) {
            logger.error(`Error restoring file from remote: ${error.message}`);
            return false;
        }
    }

    /**
     * Download a file from URL to local path
     */
    static downloadFile(url, destPath) {
        return new Promise((resolve, reject) => {
            const protocol = url.startsWith('https') ? https : http;
            const file = fs.createWriteStream(destPath);

            protocol.get(url, (response) => {
                if (response.statusCode === 301 || response.statusCode === 302) {
                    file.close();
                    fs.unlinkSync(destPath);
                    return this.downloadFile(response.headers.location, destPath)
                        .then(resolve)
                        .catch(reject);
                }

                if (response.statusCode !== 200) {
                    file.close();
                    fs.unlinkSync(destPath);
                    reject(new Error(`Failed to download: ${response.statusCode}`));
                    return;
                }

                response.pipe(file);
                file.on('finish', () => {
                    file.close();
                    resolve();
                });
            }).on('error', (err) => {
                file.close();
                if (fs.existsSync(destPath)) {
                    fs.unlinkSync(destPath);
                }
                reject(err);
            });
        });
    }

    /**
     * Get all files for an entity (member or staff) and restore missing ones
     * Called when loading entity details
     */
    static async ensureEntityFiles(entityType, entityId) {
        try {
            const files = await prisma.fileSyncQueue.findMany({
                where: { entityType, entityId }
            });

            const restoredFiles = [];

            for (const file of files) {
                if (!this.localFileExists(file.localPath) && file.remoteUrl) {
                    const restored = await this.restoreFromRemote(file.localPath, file.remoteUrl);
                    if (restored) {
                        restoredFiles.push(file.fieldName);
                    }
                }
            }

            return restoredFiles;
        } catch (error) {
            logger.error(`Error ensuring entity files: ${error.message}`);
            return [];
        }
    }

    /**
     * Convert database file path to API-accessible URL
     * Used when returning data to frontend
     */
    static convertToApiUrl(filePath, apiBaseUrl = '') {
        if (!filePath) return null;
        
        if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
            return filePath;
        }

        const uploadsDir = getUploadsDir();
        if (filePath.startsWith(uploadsDir)) {
            const relativePath = filePath.replace(uploadsDir, '').replace(/\\/g, '/');
            return `${apiBaseUrl}/uploads${relativePath}`;
        }

        if (filePath.startsWith('/uploads')) {
            return `${apiBaseUrl}${filePath}`;
        }

        return filePath;
    }

    /**
     * Get sync statistics
     */
    static async getSyncStats() {
        try {
            const [pending, synced, failed, total] = await Promise.all([
                prisma.fileSyncQueue.count({ where: { status: 'pending' } }),
                prisma.fileSyncQueue.count({ where: { status: 'synced' } }),
                prisma.fileSyncQueue.count({ where: { status: 'failed' } }),
                prisma.fileSyncQueue.count()
            ]);

            return { pending, synced, failed, total };
        } catch (error) {
            logger.error(`Error getting sync stats: ${error.message}`);
            return { pending: 0, synced: 0, failed: 0, total: 0 };
        }
    }
}

module.exports = FileSyncService;
