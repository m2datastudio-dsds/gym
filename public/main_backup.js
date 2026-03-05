const { app, BrowserWindow,  Menu} = require('electron'); 
const path = require('path');
// const sqlite3 = require('sqlite3');   
let mainWindow;  
// eslint-disable-next-line no-unused-vars
const server = require('./server');

let isDev;

(async () => {
  isDev = (await import('electron-is-dev')).default;

 });

var force_quit = false;
var menu = Menu.buildFromTemplate([
{
    label: 'Gym App',
    submenu: [
        {label: 'About App', selector: 'orderFrontStandardAboutPanel:'},
        {
            label: 'Quit', 
            accelerator: 'CmdOrCtrl+Q', 
            click: function() { 
                // force_quit=true; 
                app.quit();
            }
        }
    ]
}]);

// Menu.setApplicationMenu(menu);
app.disableHardwareAcceleration(); 


const createWindow = () => {

  mainWindow = new BrowserWindow({
    width: 600,
    height: 600, 
    minHeight: 800, 
    minWidth: 800, 
    show: false, 
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {    
      nodeIntegration: true,
      enableRemoteModule: true, 
      contextIsolation: true,
      preload: isDev 
        ? path.join(__dirname, './preload.js')
        : path.join(app.getAppPath(), './build/preload.js'),
    },
  });  
  mainWindow.webContents.on('did-finish-load', function() { 
    mainWindow.show();
  });  
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:9000' 
      : 'http://localhost:1818'
  ); 
  // mainWindow.setIcon(path.join(__dirname, '/icon.png'));
  mainWindow.maximize();

  mainWindow.once('ready-to-show', () => { 
    mainWindow.webContents.send("appOpen", "app started" )
  }); 


mainWindow.on('closed', function(e){   
  if(!force_quit){
    mainWindow.webContents.send("closecalled", "GET CONFIRMATION")
    e.preventDefault();
    e.stopPropagation();
  }
  else{ 
  }
});


app.on('before-quit', (event) => {
  // Show a confirmation dialog
  if(!force_quit){
  mainWindow.webContents.send("closecalled", "GET CONFIRMATION")
  event.preventDefault();
  event.stopPropagation();
  }
});

app.on('activate-with-no-open-windows', function(){
    mainWindow.show();
});

  /**app quit */
  mainWindow.on('quit', function(e){  
    if(!force_quit){
      mainWindow.webContents.send("closecalled", "GET CONFIRMATION")
      e.preventDefault();
      e.stopPropagation();
    } 
  }); 

};  

app.setPath(
  'userData',
  isDev
    ? path.join(app.getAppPath(), 'userdata/') 
    : path.join(process.resourcesPath, 'userdata/')
);

app.whenReady().then(async () => {
  createWindow(); 
});

// Exiting the app
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Activating the app
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Logging any exceptions
process.on('uncaughtException', (error) => {

  console.log(error)

  if (process.platform !== 'darwin') {
    // app.quit();
  }
});