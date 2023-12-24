import { DataSource, DataSourceOptions } from "typeorm";
import { IPCApi } from "./IPCApi";
import type Process from "process";
import { TodoDocument } from "../domain/entity/todo/TodoDocument";
import { TodoItem } from "../domain/entity/todo/TodoItem";
import { DocumentCollection } from "../domain/entity/document/DocumentCollection";
import { Document } from "../domain/entity/document/Document";
import { Tag } from "../domain/entity/tag/Tag";
import { TodoEnableCondition } from "../domain/entity/todo/TodoEnableCondition";
import { TodoTriggerEvent } from "../domain/entity/todo/TodoTriggerEvent";
const process = require("process") as typeof Process;

async function init() {
  const options: DataSourceOptions = {
    type: "sqlite",
    database: `${await IPCApi.app.getPath("userData")}/data/main.sqlite`,
    entities: [
      TodoItem,
      TodoDocument,
      TodoEnableCondition,
      TodoTriggerEvent,
      // Document,
      DocumentCollection,
      Tag,
    ],
    logging: true,
    synchronize: true,
  };

  const data_source = new DataSource(options);
  await data_source.initialize();

  return data_source;
}

export const data_source_promise = init();
