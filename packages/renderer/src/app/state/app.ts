import { createStore } from "solid-js/store";
import { create_DocumentService } from "/@/domain/service/DocumentService";
import { data_source_promise } from "/@/common/db";
import { create_TodoService } from "/@/domain/service/TodoService";
import { DataSource } from "typeorm";
import { create_TagService } from "/@/domain/service/TagService";

function create_sevice_promise<T extends (data_source: DataSource) => any>(
  factory: T
) {
  return data_source_promise.then((it) => factory(it)) as Promise<
    T extends (data_source: DataSource) => infer U ? U : never
  >;
}

const [app_store, set_app_store] = createStore({
  service_pms: {
    todo: create_sevice_promise(create_TodoService),
    document: create_sevice_promise(create_DocumentService),
    tag: create_sevice_promise(create_TagService),
  },
});

export const use_app_store = () => [app_store, set_app_store] as const;
