import { DataSource } from "typeorm";
import { ServiceRemoveOption } from "../service";

export function gen_sevice_remove<T>(data_source: DataSource) {
  return function remove(item: T | T[], options: ServiceRemoveOption) {
    return data_source.manager.remove(item, options.typeorm);
  }
}