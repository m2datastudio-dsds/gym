const express = require('express');
const { b2SyncService } = require('../services/b2SyncService');
const FileSyncService = require('../services/fileSyncService');
const { StatusCodes } = require('http-status-codes');

const router = express.Router();

/**
 * GET /api/sync/status
 * Get current sync queue statistics
 */
router.get('/sync/status', async (req, res) => {
    try {
        const stats = await FileSyncService.getSyncStats();
        const isConfigured = b2SyncService.isConfigured();
        
        res.status(StatusCodes.OK).json({
            code: StatusCodes.OK,
            message: 'Sync status retrieved',
            data: {
                ...stats,
                b2Configured: isConfigured,
                autoSyncEnabled: !!b2SyncService.syncInterval
            }
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: 'Failed to get sync status'
        });
    }
});

/**
 * POST /api/sync/trigger
 * Manually trigger a sync to B2
 */
router.post('/sync/trigger', async (req, res) => {
    try {
        if (!b2SyncService.isConfigured()) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                code: StatusCodes.BAD_REQUEST,
                message: 'B2 is not configured. Add B2_APPLICATION_KEY_ID, B2_APPLICATION_KEY, and B2_BUCKET_ID to .env'
            });
        }

        const result = await b2SyncService.triggerSync();
        
        res.status(StatusCodes.OK).json({
            code: StatusCodes.OK,
            message: result.status === 'already_running' ? 'Sync already in progress' : 'Sync completed',
            data: result
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: 'Sync failed: ' + error.message
        });
    }
});

/**
 * GET /api/sync/pending
 * Get list of pending files
 */
router.get('/sync/pending', async (req, res) => {
    try {
        const pendingFiles = await FileSyncService.getPendingFiles(100);
        
        res.status(StatusCodes.OK).json({
            code: StatusCodes.OK,
            message: 'Pending files retrieved',
            data: {
                count: pendingFiles.length,
                files: pendingFiles.map(f => ({
                    id: f.id,
                    entityType: f.entityType,
                    entityId: f.entityId,
                    fieldName: f.fieldName,
                    status: f.status,
                    retryCount: f.retryCount,
                    createdAt: f.createdAt
                }))
            }
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            code: StatusCodes.INTERNAL_SERVER_ERROR,
            message: 'Failed to get pending files'
        });
    }
});

module.exports = router;
