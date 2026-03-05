const path = require('path');
// Load root .env first (for npm start / Electron from project root), then API .env for JWT, etc.
// AWS S3 removed: storage is now local + Backblaze B2 sync
require('dotenv').config();
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const {
    NODE_ENV,
    PORT,
    LOG_FORMAT,
    LOG_DIR,
    SMS_AUTH_KEY,
    DLT_ENTITY_ID,
    WAPP_APP_ID,
    WAPP_VERSION,
    WAPP_PHONE_NUMBER_ID,
    WAPP_ACCESS_TOKEN
} = process.env;

const JWT_SECRET = process.env.JWT_SECRET || "KqeDnnR1pnkz1DtTs7w8";
const EXPIRY_TIME = process.env.EXPIRY_TIME || "24h";

module.exports = {
    NODE_ENV,
    PORT,
    LOG_FORMAT,
    LOG_DIR,
    JWT_SECRET,
    EXPIRY_TIME,
    SMS_AUTH_KEY,
    DLT_ENTITY_ID,
    WAPP_APP_ID,
    WAPP_VERSION,
    WAPP_PHONE_NUMBER_ID,
    WAPP_ACCESS_TOKEN
};
