import { app, BrowserWindow, globalShortcut } from "electron";
import { Keyboard } from "./keyboard";
import path from "path";


function createWindow() {

  const win = new BrowserWindow({
    width: 800,
    height: 600,
show: false,
    webPreferences: {
preload: path.join( __dirname, 'www', 'preload.js' ),
      nodeIntegration: true,
    },
  });
  win.loadURL(
`file://${__dirname}/www/index.html`
  );

const keyboard = new Keyboard( win );

keyboard.registerShortcutWithModifier( 'f12', 'control+shift' );
keyboard.registerShortcutWithModifier( 'a', 'control+shift' );

}
app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

