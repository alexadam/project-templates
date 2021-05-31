import { app, BrowserWindow, ipcMain } from 'electron';
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

    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
  });

  if (isDev()) {
    mainWindow.loadURL(`http://localhost:8080`);
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


  // handle messages from React app
  ipcMain.on('sync-message', (event, arg) => {
    event.returnValue = arg.number * 2
  })

  ipcMain.on('async-message', (event, arg) => {
    event.sender.send('async-reply', { number: arg.number * 2 })
  })
}

app.on('ready', createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.allowRendererProcessReuse = true;