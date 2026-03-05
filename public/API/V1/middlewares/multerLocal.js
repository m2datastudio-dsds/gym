const multer = require('multer');
const path = require('path');
const fs = require('fs');

/**
 * Local Disk Storage Middleware for Offline-First Photo/Document Uploads
 * 
 * ARCHITECTURE:
 * - Files are ALWAYS saved locally first (works offline)
 * - A sync queue tracks pending uploads to Backblaze B2
 * - Background sync service uploads to B2 when online
 * - Local files are NEVER deleted after sync (for offline viewing)
 * 
 * STORAGE LOCATION:
 * - Development: {project_root}/uploads/
 * - Production (Electron): {userData}/uploads/ (e.g., C:\Users\<user>\AppData\Roaming\GymApp\uploads)
 */

function getUploadsDir() {
    let uploadsDir;

    if (typeof process !== 'undefined' && process.versions && process.versions.electron) {
        try {
            const { app } = require('electron');
            if (app && typeof app.getPath === 'function') {
                uploadsDir = path.join(app.getPath('userData'), 'uploads');
            } else {
                uploadsDir = path.join(process.cwd(), 'uploads');
            }
        } catch {
            uploadsDir = path.join(process.cwd(), 'uploads');
        }
    } else {
        uploadsDir = path.join(process.cwd(), 'uploads');
    }

    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }

    return uploadsDir;
}

const uploadsDir = getUploadsDir();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const subFolder = file.fieldname === 'memberPhoto' ? 'members' 
                        : file.fieldname === 'photoPicture' ? 'staff'
                        : file.fieldname === 'proofDocument' ? 'documents'
                        : 'misc';
        
        const destPath = path.join(uploadsDir, subFolder);
        
        if (!fs.existsSync(destPath)) {
            fs.mkdirSync(destPath, { recursive: true });
        }
        
        cb(null, destPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const prefix = file.fieldname;
        cb(null, `${prefix}-${uniqueSuffix}${ext}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const allowedDocTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    
    if (file.fieldname === 'memberPhoto' || file.fieldname === 'photoPicture') {
        if (allowedImageTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only image files (JPEG, PNG, GIF, WebP) are allowed for photos'), false);
        }
    } else if (file.fieldname === 'proofDocument') {
        if (allowedDocTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only PDF and image files are allowed for documents'), false);
        }
    } else {
        cb(null, true);
    }
};

const uploadLocal = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB max file size
    }
});

module.exports = {
    uploadLocal,
    getUploadsDir
};
