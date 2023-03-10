// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain, dialog} = require('electron')
const path = require('path')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  ipcMain.on('saveFile', async (event, data) => {
    console.log("Data", data);
    let saveFile = await dialog.showSaveDialog();
    //console.log(saveFile);
    if(saveFile.filePath){
      const csvWriter = createCsvWriter({
        path: saveFile.filePath,
        header: [
          {id: 'date', title: 'DATE'},
          {id: 'start', title: 'START'},
          {id: 'end', title: 'END'},
          {id: 'task', title: 'TASK'},
        ]
      });
      await csvWriter.writeRecords(data);
    }
    
  });

  ipcMain.on('appendToFile', async (event, data) => {
    let saveFile = await dialog.showSaveDialog();
    if(saveFile.filePath){
      const csvWriter = createCsvWriter({
        path: saveFile.filePath,
        header: [
          {id: 'date', title: 'DATE'},
          {id: 'start', title: 'START'},
          {id: 'end', title: 'END'},
          {id: 'task', title: 'TASK'},
        ],
        append: true
      });
      await csvWriter.writeRecords(data);
    }
  });
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// how do you pass data to save file picker .

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// const createCsvWriter = require('csv-writer').createObjectCsvWriter;
// const csvWriter = createCsvWriter({
//     path: 'path/to/file.csv',
//     header: [
//         {id: 'name', title: 'NAME'},
//         {id: 'lang', title: 'LANGUAGE'}
//     ]
// });
 
// const records = [
//     {name: 'Bob',  lang: 'French, English'},
//     {name: 'Mary', lang: 'English'}
// ];
 
// csvWriter.writeRecords(records)       // returns a promise
//     .then(() => {
//         console.log('...Done');
//     });