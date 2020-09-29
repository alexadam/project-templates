import { app, BrowserWindow, Menu, MenuItem, ipcRenderer, ipcMain } from 'electron'
import path from 'path'
import {template} from './menu'

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    })

    const isDev = true //false // true
    console.log(`file://${path.join(__dirname, './dist/main.html')}`);
    
    const mainURL = isDev ? 'http://localhost:8080' : `file://${path.join(__dirname, './main.html')}`;

    // win.loadFile('main.html')
    mainWindow.loadURL(mainURL);

    mainWindow.webContents.openDevTools()
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

ipcMain.on("export", (event, message) => {
    console.log("answer ", message)
})