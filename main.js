const {
  app,
  BrowserWindow,
  ipcMain,
  nativeTheme,
  autoUpdater,
} = require("electron");
const path = require("path");

if (require("electron-squirrel-startup")) return app.quit();

require("update-electron-app")({
  repo: "github-user/repo",
  updateInterval: "1 hour",
  logger: require("electron-log"),
});

const server = "https://github.com";
const feed = `${server}/i33W/electron-update-package/releases/download/${app.getVersion()}`;

autoUpdater.setFeedURL(feed);

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
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

setInterval(() => {
  autoUpdater.checkForUpdates();
  console.log("update!!!");
}, 0.2 * 60 * 1000);
