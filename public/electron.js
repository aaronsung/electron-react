const electron = require("electron");
const path = require("path");
const url = require("url");

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { nodeIntegration: true, contextIsolation: false },
  });
  // and load the index.html of the app.
  // console.log(__dirname);
  // mainWindow.loadFile(path.join(__dirname, "../build/index.html"));
  const startUrl = url.format({
    pathname: path.join(__dirname, '../build/index.html'),
    protocol: 'file:',
    slashes: true
  });

  mainWindow.loadURL(startUrl);
  // mainWindow.webContents.openDevTools();

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);