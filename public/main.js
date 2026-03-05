// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require("node:path");
const server = require("./server");

let isDev;
let mainWindow;

const checkDev = async () => {
  isDev = (await import('electron-is-dev')).default;
}

(async () => {
  isDev = (await import('electron-is-dev')).default;
})();

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // should be false when loading React
      contextIsolation: true, // for security
      enableRemoteModule: false, // avoid using remote
      preload: isDev
        ? path.join(__dirname, './preload.js')
        : path.join(app.getAppPath(), "./build/preload.js")
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : 'http://localhost:1818'
  );
}

// ---- Auto-updater: only in packaged app ----
function setupAutoUpdater() {
  if (!app.isPackaged) return;

  try {
    const { autoUpdater } = require('electron-updater');

    autoUpdater.on('checking-for-update', () => {
      mainWindow?.webContents?.send('update-status', { status: 'checking' });
    });
    autoUpdater.on('update-available', (info) => {
      mainWindow?.webContents?.send('update-status', { status: 'available', info });
    });
    autoUpdater.on('update-not-available', (info) => {
      mainWindow?.webContents?.send('update-status', { status: 'not-available', info });
    });
    autoUpdater.on('error', (err) => {
      mainWindow?.webContents?.send('update-status', { status: 'error', error: err.message });
    });
    autoUpdater.on('download-progress', (progressObj) => {
      mainWindow?.webContents?.send('update-download-progress', progressObj);
    });
    autoUpdater.on('update-downloaded', () => {
      mainWindow?.webContents?.send('update-status', { status: 'downloaded' });
      const result = dialog.showMessageBoxSync(mainWindow, {
        type: 'question',
        buttons: ['Restart now', 'Later'],
        defaultId: 0,
        cancelId: 1,
        title: 'Update Ready',
        message: 'A new version has been downloaded. Restart now to install it?'
      });
      if (result === 0) autoUpdater.quitAndInstall();
    });

    // Auto-check on app start
    autoUpdater.checkForUpdatesAndNotify();
  } catch (e) {
    console.warn('Auto-updater not available:', e.message);
  }
}

// Manual "Check for Updates" from renderer
ipcMain.on('check-for-updates-manual', () => {
  if (!app.isPackaged) {
    mainWindow?.webContents?.send('update-status', {
      status: 'error',
      error: 'Updates are only available in the installed app.'
    });
    return;
  }
  try {
    const { autoUpdater } = require('electron-updater');
    autoUpdater.checkForUpdates();
  } catch (e) {
    mainWindow?.webContents?.send('update-status', { status: 'error', error: e.message });
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.whenReady().then(async () => {
  await checkDev();
  createWindow();
  setupAutoUpdater();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') app.quit()
// })

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

process.on('uncaughtException', (error) => {

  console.log(error)

  if (process.platform !== 'darwin') {
    // app.quit();
  }
}); 







