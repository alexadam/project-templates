import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';

let mainWindow: Electron.BrowserWindow | null;

function isDev() {
  return process.argv[2] == '--dev';
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // maxHeight:600,
    // maxWidth:600,
    // minHeight:400,
    // minWidth:400,
    // backgroundColor:'#7B435B'

    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (isDev()) {
    mainWindow.loadURL(`http://localhost:8080`);
    // mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
      })
    );
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});