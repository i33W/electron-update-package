const {
  app,
  BrowserWindow,
  ipcMain,
  nativeTheme,
  // autoUpdater,
} = require("electron");
const elog = require("electron-log");
const path = require("path");

if (require("electron-squirrel-startup")) return app.quit();

require("update-electron-app")({
  repo: "i33W/electron-update-package",
  updateInterval: "5 minutes",
  logger: elog,
});

const server = "https://github.com";
const feed = `${server}/i33W/electron-update-package/releases/download/${app.getVersion()}`;

// autoUpdater.setFeedURL(feed);

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");

  ipcMain.handle("toggle", () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = "light";
    } else {
      nativeTheme.themeSource = "dark";
    }
    return nativeTheme.shouldUseDarkColors;
  });

  ipcMain.handle("system", () => {
    nativeTheme.themeSource = "system";
  });

  return win;
};

app.whenReady().then(() => {
  const win = createWindow();

  elog.info("ok?");

  // app.on("activate", () => {
  //   if (BrowserWindow.getAllWindows().length === 0) {
  //     createWindow();
  //   }
  // });

  // setInterval(() => {
  //   win.webContents.send("log", "interval");
  //   try {
  //     autoUpdater.checkForUpdates();
  //     win.webContents.send("log", "autoUpdater.checkForUpdates()");
  //   } catch (error) {
  //     win.webContents.send("log", error);
  //   }
  // }, 0.2 * 60 * 1000);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
