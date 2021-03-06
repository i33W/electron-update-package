const { contextBridge, ipcRenderer } = require("electron");

// contextBridge.exposeInMainWorld("darkMode", {
//   toggle: () => ipcRenderer.invoke("dark-mode:toggle"),
//   system: () => ipcRenderer.invoke("dark-mode:system"),
// });

contextBridge.exposeInMainWorld("methodToggle", () =>
  ipcRenderer.invoke("toggle")
);
contextBridge.exposeInMainWorld("methodSystem", () =>
  ipcRenderer.invoke("system")
);

ipcRenderer.on("log", (event, arg) => {
  console.log(arg);
  document.getElementById("log-div").innerHTML += arg + "<br>";
});
