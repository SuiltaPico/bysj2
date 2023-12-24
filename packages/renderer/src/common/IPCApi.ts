/**
 * @file 提供了标注了类型的 IPC API 调用。方便渲染器和主程序通讯的管理。
 */

import type { app, IpcRenderer } from "electron";

const { ipcRenderer } = require("electron") as {
  ipcRenderer: IpcRenderer;
};

export const IPCApi = {
  app: {
    getPath<T extends Parameters<(typeof app)["getPath"]>>(...args: T) {
      return ipcRenderer.invoke("app.getPath", ...args) as Promise<
        ReturnType<(typeof app)["getPath"]>
      >;
    },
  },
};
