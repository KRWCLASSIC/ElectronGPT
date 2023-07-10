const { app, BrowserWindow, Menu, dialog, MenuItem } = require('electron');
const fs = require('fs');
const path = require('path');

// Global reference to the main window
let mainWindow;

// Function to create the main window
function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    resizable: true,
    webPreferences: {
      nodeIntegration: true
    },
    icon: path.join(__dirname, 'icon.png') // Specify the path to the icon file
  });

  mainWindow.loadURL('https://chat.openai.com'); // Load the chat.openai.com site

  // Handle window close event
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Handle page title update event
  mainWindow.webContents.on('page-title-updated', (event, title) => {
    let dynamicWindowName = 'ElectronGPT';

    if (title.trim() !== 'ChatGPT') {
      dynamicWindowName += ` | ${title}`;
    }

    mainWindow.setTitle(dynamicWindowName);
  });
}

// Function to create the extensions menu
function createExtensionsMenu() {
  const extensionsMenu = [];

  const etlFolderPath = './etl';
  const overrideFilePath = './etl/dp_ext_txt_ov.json';

  // Read the folders in the etl folder
  const extensionFolders = fs.readdirSync(etlFolderPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  // Read the name overrides from the override file
  let nameOverrides = {};
  if (fs.existsSync(overrideFilePath)) {
    const overrideFileData = fs.readFileSync(overrideFilePath, 'utf-8');
    nameOverrides = JSON.parse(overrideFileData);
  }

  // Create menu items for each extension
  extensionFolders.forEach(folderName => {
    let displayName = folderName;

    // Check if name override exists for the folder
    if (nameOverrides.hasOwnProperty(folderName)) {
      displayName = nameOverrides[folderName];
    }

    extensionsMenu.push({
      label: displayName,
      type: 'checkbox',
      checked: true, // Set the initial state to checked
      click: () => {
        // Handle extension toggle
        const restartRequired = toggleExtension(folderName);

        if (restartRequired) {
          // Show restart dialog
          dialog.showMessageBox(mainWindow, {
            type: 'info',
            title: 'Restart Required',
            message: 'Please restart the application to apply the changes.',
            buttons: ['Restart Now', 'Don\'t Restart Now']
          }, (response) => {
            if (response === 0) {
              // Restart the application
              app.relaunch();
              app.exit();
            }
          });
        }
      }
    });
  });

  // Create the "Extensions" dropdown menu
  const extensionsSubMenu = Menu.buildFromTemplate(extensionsMenu);
  const menu = Menu.getApplicationMenu();
  const extensionsMenuItem = new MenuItem({ label: 'Extensions', submenu: extensionsSubMenu });
  menu.insert(menu.items.length - 1, extensionsMenuItem);
  Menu.setApplicationMenu(menu);
}

// Function to toggle the extension
function toggleExtension(extensionName) {
  // Implement your extension toggling logic here
  // Return true if restart is required, false otherwise
  // You can modify this function based on your extension loading mechanism
  // For now, it returns a random boolean value
  return Math.random() < 0.5;
}

// Function to create the "Info" menu
function createInfoMenu() {
  const infoMenu = [
    {
      label: 'Show Info',
      click: () => {
        const infoWindow = new BrowserWindow({
          width: 800,
          height: 320,
          resizable: false,
          maximizable: false,
          minimizable: false,
          webPreferences: {
            nodeIntegration: true
          }
        });

        infoWindow.loadFile('info.html');

        // Handle window close event
        infoWindow.on('closed', () => {
          infoWindow = null;
        });
      }
    }
  ];

  const menu = Menu.getApplicationMenu();
  const infoMenuItem = new MenuItem({ label: 'Info', submenu: infoMenu });
  menu.insert(menu.items.length - 1, infoMenuItem);
  Menu.setApplicationMenu(menu);
}

// Electron app's ready event
app.on('ready', () => {
  createMainWindow();
  createExtensionsMenu();
  createInfoMenu();
});

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Activate the app (macOS specific)
app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow();
  }
});
