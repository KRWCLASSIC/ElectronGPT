const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL('https://chat.openai.com');

  // Load extensions
  const extensionPaths = [
    path.join(__dirname, 'extensions', 'ChatGPT_Coding_Kit'),
    path.join(__dirname, 'extensions', 'ChatGPT_Optimizer_1.9.3')
  ];

  extensionPaths.forEach((extensionPath) => {
    mainWindow.webContents.session.loadExtension(extensionPath);
  });

  const template = [
    {
      label: 'File',
      submenu: [
        { label: 'New Tab' },
        { label: 'Open' },
        { type: 'separator' },
        {
          label: 'Exit',
          click() {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Info',
      submenu: [
        {
          label: 'Show Info',
          click() {
            createInfoWindow();
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function createInfoWindow() {
  const isMac = process.platform === 'darwin';

  const infoWindow = new BrowserWindow({
    width: 800,
    height: 320,
    resizable: false,
    title: 'ElectronGPT Info',
    autoHideMenuBar: true,
    frame: !isMac,
    titleBarStyle: 'hiddenInset',
    minimizable: false, // Set minimizable to false to remove the minimize button
    webPreferences: {
      nodeIntegration: true
    }
  });

  infoWindow.loadFile(path.join(__dirname, 'info.html'));
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
