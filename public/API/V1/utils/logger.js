const { existsSync, mkdirSync } = require('fs');
const { join } = require('path');
const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');

// Use Electron's userData when running inside Electron; otherwise use project-relative path (e.g. node server.js)
// Only require('electron') when inside Electron to avoid loading it under plain Node (can cause exit/crash).
let logDir;
if (typeof process !== 'undefined' && process.versions && process.versions.electron) {
  try {
    const { app } = require('electron');
    if (app && typeof app.getPath === 'function') {
      logDir = join(app.getPath('userData'), 'logs');
    } else {
      logDir = join(process.cwd(), 'logs');
    }
  } catch {
    logDir = join(process.cwd(), 'logs');
  }
} else {
  logDir = join(process.cwd(), 'logs');
}

// Create Log dir and subdirectories if they don't exist
if (!existsSync(logDir)) {
  mkdirSync(logDir, { recursive: true });
}

// Create debug/error subdirectories explicitly
[join(logDir, 'debug'), join(logDir, 'error')].forEach(dir => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
});

// Define log format
const logFormat = winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat
  ),
  transports: [
    // Debug log
    new winstonDaily({
      level: 'debug',
      datePattern: 'YYYY-MM-DD',
      dirname: join(logDir, 'debug'), // Use dynamic path
      filename: '%DATE%.log',
      maxFiles: 30,
      json: false,
      zippedArchive: true,
    }),
    // Error log
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: join(logDir, 'error'), // Use dynamic path
      filename: '%DATE%.log',
      maxFiles: 30,
      handleExceptions: true,
      json: false,
      zippedArchive: true,
    }),
  ],
});

// Rest of the code remains the same...

logger.add(
    new winston.transports.Console({
        format: winston.format.combine(winston.format.splat(), winston.format.colorize()),
    })
);

const stream = {
    write: (message) => {
        logger.info(message.substring(0, message.lastIndexOf('\n')));
    },
};

module.exports = { logger, stream };
