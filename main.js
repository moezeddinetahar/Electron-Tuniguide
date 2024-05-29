const { app, BrowserWindow, ipcMain,Menu, dialog } = require('electron');
const path = require('path');

let mainWindow;
let childWindow1;
let childWindow2;


function createMainWindow() {
    mainWindow = new BrowserWindow({
        title: 'projet_cross1202',
        width: 1200,
        height: 680,
        minWidth: 940,
        minHeight: 560,
        icon: "logo.jpeg",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: true,
            preload: path.join(__dirname, 'preload.js')
        },
        enableMouseEvents: false
    });

    mainWindow.once('ready-to-show', () => {
        const template = [];
        const menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);
    });

    mainWindow.loadFile(path.join(__dirname, './renderer/intro/index.html'));
}
// craetion d'un child window1

function createChildWindow1() {
    childWindow1 = new BrowserWindow({
        parent: mainWindow,
        modal: true, // Make the child window modal
        width: 1200,
        height: 680,
        
        minWidth: 940,
        minHeight: 560,
        icon: "logo.jpeg",
        webPreferences: {
            
            nodeIntegration: true,
            contextIsolation: false,
            devTools: true,
            preload: path.join(__dirname, 'preload.js')
        },
        enableMouseEvents: false
    });

    childWindow1.loadFile(path.join(__dirname, './renderer/login/pr.html'));

    // Handle child window closed
    childWindow1.on('closed', () => {
        childWindow1 = null;
    });

    // Afficher un message de type "warning"

    dialog.showMessageBox({
        type: 'warning',
        title: 'Attention',
        message: 'Please ensure all fields are filled with accurate information !',
        buttons: ['sure']
      });
    
}

app.whenReady().then(() => {
    createMainWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

// Listen for the 'exploreMoreButtonClicked' event
ipcMain.on('exploreMoreButtonClicked', () => {
    if (!childWindow1) {
        createChildWindow1();
    }
});

// childwindow 2

// Function to create the second child window
function createChildWindow2() {
    childWindow2 = new BrowserWindow({
        parent: childWindow1,
        modal: true, // Make the child window modal
        width: 940,
        height: 690,
        minWidth: 940,
        minHeight: 560,
          icon: "logo.jpeg",

        webPreferences: {
            
            nodeIntegration: true,
            contextIsolation: false,
            devTools: true,
            preload: path.join(__dirname, 'preload.js')
        },
    });

    childWindow2.loadFile(path.join(__dirname, './renderer/home/tt.html'));

    // Handle child window closed
    childWindow2.on('closed', () => {
        childWindow2 = null;
    });
}

// Listen for the 'signInButtonClicked' event
ipcMain.on('signInButtonClicked', () => {
    if (!childWindow2) {
        createChildWindow2();
    }
});

// 




