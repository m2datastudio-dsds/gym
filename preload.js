const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  env: process.env.NODE_ENV // Expose NODE_ENV to the renderer process
});