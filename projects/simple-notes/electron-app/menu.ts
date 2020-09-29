import { MenuItem, BrowserWindow, app } from "electron";

const isMac = process.platform === 'darwin'

const onDataExport = (menuItem: MenuItem, browserWindow: BrowserWindow, event: KeyboardEvent) => {
    console.log("export");
    browserWindow.webContents.send('export', {})
}

export const template: any[] = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  {
    label: 'Notes',
    submenu: [
        {label: "All Notes"},
        {label: "New Note"},
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  {
    label: 'Data',
    submenu: [
      { label: 'Export', click: onDataExport },
      { type: 'separator' },
      { label: 'Import' },
    ]
  },
]

