const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

let extensionStates = {}; // Track the enabled/disabled state of extensions
const extensionNameOverrides = {}; // Store the extension name overrides

const extensionStatesFilePath = path.join(__dirname, 'extensionStates.json');

if (fs.existsSync(extensionStatesFilePath)) {
  try {
    const extensionStatesData = fs.readFileSync(extensionStatesFilePath);
    extensionStates = JSON.parse(extensionStatesData);
  } catch (error) {
    console.error('Error reading extension states:', error);
  }
}

function createWindow() {
  const originalWindowName = 'ElectronGPT';
  loadExtensionStates();
  loadExtensionNameOverrides();

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true
    },
    icon: path.join(__dirname, 'icon.png')
  });

  mainWindow.loadURL('https://chat.openai.com');

  mainWindow.webContents.on('page-title-updated', (event, title) => {
    let dynamicWindowName = originalWindowName;

    if (title.trim() !== 'ChatGPT') {
      dynamicWindowName += ` | ${title}`;
    }

    mainWindow.setTitle(dynamicWindowName);
  });

  const extensionPaths = [
    path.join(__dirname, 'extensions', 'ChatGPT_Coding_Kit'),
    path.join(__dirname, 'extensions', 'ChatGPT_Optimizer_1.9.3')
  ];

  extensionPaths.forEach((extensionPath) => {
    const extensionName = path.basename(extensionPath);
    const enabled = extensionStates[extensionName] !== false;
  
    if (enabled) {
      mainWindow.webContents.session.loadExtension(extensionPath);
    }
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
    },
    {
      label: 'Extensions',
      submenu: getExtensionsSubMenu()
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
    minimizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  infoWindow.loadFile(path.join(__dirname, 'info.html'));
}

function saveExtensionStates() {
  const extensionStatesData = JSON.stringify(extensionStates);

  try {
    fs.writeFileSync(extensionStatesFilePath, extensionStatesData);
  } catch (error) {
    console.error('Error saving extension states:', error);
  }
}

function loadExtensionStates() {
  const appPath = app.getPath('exe');
  const appDirectory = path.dirname(appPath);
  const extensionsPath = path.join(appDirectory, 'extensions');

  if (!fs.existsSync(extensionsPath)) {
    fs.mkdirSync(extensionsPath);
  }

  const extensionStatesFilePath = path.join(extensionsPath, 'extensionStates.json');

  if (fs.existsSync(extensionStatesFilePath)) {
    try {
      const extensionStatesData = fs.readFileSync(extensionStatesFilePath);
      extensionStates = JSON.parse(extensionStatesData);
    } catch (error) {
      console.error('Error reading extension states:', error);
    }
  }
}

function loadExtensionNameOverrides() {
  const extensionsPath = path.join(__dirname, 'extensions');
  const extensions = fs.readdirSync(extensionsPath);

  extensions.forEach((extension) => {
    const extensionFolderPath = path.join(extensionsPath, extension);
    const isDirectory = fs.statSync(extensionFolderPath).isDirectory();

    if (!isDirectory) {
      return; // Skip files in the extensions directory
    }

    const extensionNameOverridePath = path.join(extensionFolderPath, 'extension_name_override.json');

    if (fs.existsSync(extensionNameOverridePath)) {
      try {
        const extensionNameOverride = JSON.parse(fs.readFileSync(extensionNameOverridePath));
        const extensionName = extensionNameOverride.overrideto || extension;
        extensionNameOverrides[extension] = extensionName;
      } catch (error) {
        console.error(`Error parsing extension_name_override.json for ${extension}:`, error);
      }
    } else {
      console.log(`extension_name_override.json not found for ${extension}`);
      extensionNameOverrides[extension] = extension;
    }
  });

  console.log('Extension Name Overrides:', extensionNameOverrides);
}

function showRestartConfirmation() {
  const options = {
    type: 'question',
    buttons: ['Restart now', 'Don\'t restart now'],
    defaultId: 0,
    title: 'Restart Confirmation',
    message: 'Restart is required',
    detail: 'The application needs to be restarted for the changes to take effect.'
  };

  dialog.showMessageBox(null, options).then((response) => {
    if (response.response === 0) {
      app.relaunch();
      app.quit();
    }
  });
}

function getExtensionsSubMenu() {
  const extensionsPath = path.join(__dirname, 'extensions');
  const extensions = fs.readdirSync(extensionsPath);
  

  const subMenu = extensions.map((extension) => {
    const extensionFolderPath = path.join(extensionsPath, extension);
    const isDirectory = fs.statSync(extensionFolderPath).isDirectory();

    if (!isDirectory) {
      return null; // Skip non-directory entries in the extensions directory
    }

    const extensionNameOverridePath = path.join(extensionsPath, 'extension_name_override.json');
    let extensionName = extension; // Default to extension folder name

    if (fs.existsSync(extensionNameOverridePath)) {
      try {
        const extensionNameOverrideData = fs.readFileSync(extensionNameOverridePath);
        const extensionNameOverride = JSON.parse(extensionNameOverrideData);
        extensionName = extensionNameOverride[extension] || extension; // Use the overridden name if available
      } catch (error) {
        console.error(`Error reading extension name override for ${extension}:`, error);
      }
    } else {
      console.log(`extension_name_override.json not found for ${extension}`);
      console.log('Extension Name Overrides:', extensionNameOverrides);
      console.log('Extension Name Override Path:', extensionNameOverridePath);
    }

    const enabled = extensionStates[extension] !== false; // Check if the extension is enabled

    return {
      label: extensionName,
      type: 'checkbox',
      checked: enabled,
      click(menuItem) {
        const newState = menuItem.checked;
        const extensionFolder = extension;

        if (!newState && !Object.values(extensionStates).some((state) => state === true)) {
          showRestartConfirmation();
        }

        const currentState = extensionStates[extensionFolder];
        if (newState !== currentState) {
          extensionStates[extensionFolder] = newState;
          saveExtensionStates();
          if (currentState === true || newState === true) {
            showRestartConfirmation();
          }
        }        
      }
    };
  });

  return subMenu.filter((menuItem) => menuItem !== null); // Remove null values from the submenu array
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

app.on('before-quit', () => {
  mainWindow.removeAllListeners('close');
});

app.on('web-contents-created', (event, webContents) => {
  webContents.on('will-prevent-unload', (event) => {
    const isRestartRequired = Object.values(extensionStates).includes(false);

    if (isRestartRequired) {
      event.preventDefault();
      showRestartConfirmation();
    }
  });
});
