var app = require('app');
var BrowserWindow = require('browser-window');
require('crash-reporter').start();
var mainWindow = null;

const electron = require('electron');
const globalShortcut = electron.globalShortcut;


app.on('window-all-closed', function() {
  app.quit();
});


app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 578, height: 324, darkTheme:true,frame: true, icon: 'hrtv.bmp'});
  // frame: false
  mainWindow.setMenuBarVisibility(false);
  mainWindow.setTitle("Hromadske.tv");
  mainWindow.setAlwaysOnTop(true);
  mainWindow.loadUrl('file://'+__dirname+'/index.html');
  // Emitted when the window is closed.
  var ret = globalShortcut.register('ctrl+w', function() {
    app.quit();
  });
if (!ret) {
    console.log('registration failed');
  }

  var h = globalShortcut.register('ctrl+q', function() {
      if (mainWindow.isVisible()){mainWindow.hide();} else {mainWindow.show();}
  });

  // Check whether a shortcut is registered.
  console.log(globalShortcut.isRegistered('ctrl+q'));
});

app.on('will-quit', function() {
  // Unregister a shortcut.
  globalShortcut.unregister('ctrl+w');
  globalShortcut.unregister('ctrl+q');
  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
  mainWindow.on('closed', function() {
    mainWindow = null;
    app.quit();
  });
});
