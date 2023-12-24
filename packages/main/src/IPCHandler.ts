import { app, ipcMain } from "electron";

ipcMain.handle("app.getPath", async (event, name) => {
  return app.getPath(name);
});
