const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  env: process.env.NODE_ENV,
  updater: {
    checkForUpdates: () => ipcRenderer.send('check-for-updates-manual'),
    onStatus: (callback) => {
      const handler = (_event, data) => callback(data);
      ipcRenderer.on('update-status', handler);
      return () => ipcRenderer.removeListener('update-status', handler);
    },
    onDownloadProgress: (callback) => {
      const handler = (_event, data) => callback(data);
      ipcRenderer.on('update-download-progress', handler);
      return () => ipcRenderer.removeListener('update-download-progress', handler);
    }
  }
});