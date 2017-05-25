const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')
//var localStorage = require('localStorage')
var firebase = require("firebase")
const{ipcMain} =require('electron')
const {ipcRenderer} = require('electron')
var React = require('react');
var ReactDOM = require('react-dom');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
  let mainWindow, winSize

function createWindow () {
  // Create the browser window.
  
 
  loginWin = new BrowserWindow({width:570, height:570, x:0, y:0, show:false})
  
  // and load the index.html of the app.
  loginWin.loadURL(url.format({
    pathname: path.join(__dirname, './app/index.html'),
    protocol: 'file:',
    slashes: true
  }))
  loginWin.webContents.openDevTools()
  log('loginWin opened')



}

function dashboard(){
  log('loginWin Hidden')
  loginWin.hide()

  let {width, height, x, y} = {width:570, height:570, x:0, y:0}

  log('mainWindow Displayed')
  mainWindow = new BrowserWindow({width:570, height:570, x:0, y:0})

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, './app/pages/homepage.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Sets mainWindow bounds to localStorage 
  mainWindow.on('close', function(){
      //mainWindow.webContents.localStorage.setItem(mainWindow.getBounds())
});

  // Open the DevTools.
  mainWindow.webContents.openDevTools()


  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)


// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows o 

  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on('userAuth', (event, arg)=>{
  if (arg != null){
    event.sender.send("Firebase UID Recieved")
  }
  else{
    console.log("arg was null")
  }
})

ipcMain.on('toDash', (event, arg) =>{
  log('toDash Recieved')
  dashboard()
})

ipcMain.on('ls', (event, arg) =>{
  loginWin.setBounds(arg)
  loginWin.show()
})


function log(msg){
  console.log(msg)
}

function logd(msg){
  console.dir(msg)
}