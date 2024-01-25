import type Process from "process";
import { DataSource, DataSourceOptions } from "typeorm";
import { KlCollectionEt } from "../domain/entity/kb/KlCollection";
import {
  KlItemORMEt,
  KlItem_entities,
  MountedKlItemContentEt,
  TextKlItemContentEt,
} from "../domain/entity/kb/KlItem";
import { KlSv } from "../domain/entity/kb/KlSv";
import { Tag } from "../domain/entity/tag/Tag";
import { TodoDocument } from "../domain/entity/todo/TodoDocument";
import { TodoEnableCondition } from "../domain/entity/todo/TodoEnableCondition";
import { TodoItemEt } from "../domain/entity/todo/TodoItem";
import { TodoTriggerEvent } from "../domain/entity/todo/TodoTriggerEvent";
import { IPCApi } from "./IPCApi";
const process = require("process") as typeof Process;

async function init() {
  const options: DataSourceOptions = {
    type: "sqlite",
    database: `${await IPCApi.app.getPath("userData")}/data/main.sqlite`,
    entities: [
      // TodoItemEt,
      // TodoDocument,
      // TodoEnableCondition,
      // TodoTriggerEvent,
      // Document,
      // DocumentCollection,
      // Tag,
      ...KlItem_entities,
      KlCollectionEt,
    ],
    logging: true,
    synchronize: true,
  };

  const data_source = new DataSource(options);
  await data_source.initialize();

  return data_source;
}

export const data_source_promise = init();

data_source_promise.then((ds) => {
  // @ts-ignore
  window.sv = new KlSv({
    collection_repo: ds.getRepository(KlCollectionEt),
    item_orm_repo: ds.getRepository(KlItemORMEt),
    mounted_item_repo: ds.getRepository(MountedKlItemContentEt),
    text_item_repo: ds.getRepository(TextKlItemContentEt),
  });
});
