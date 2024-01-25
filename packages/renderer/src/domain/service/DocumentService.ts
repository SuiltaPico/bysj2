import { DataSource, SelectQueryBuilder } from "typeorm";
import { gen_sevice_remove } from "/@/common/utils/service_generator";
import { Document } from "../entity/document/Document";
import { TodoDocument } from "../entity/todo/TodoDocument";

export function create_DocumentService(data_source: DataSource) {
  function query_build_linker(
    name: string,
    query_build: SelectQueryBuilder<any>
  ) {
    return query_build
      .leftJoinAndSelect(`${name}.tags`, "tags")
      .leftJoinAndSelect(
        `${name}.document_collections`,
        "document_collections"
      );
  }
  const result = {
    query_build_linker,
    create<T extends Partial<Document>, V extends typeof Document>(option: {
      initial?: T;
      no_save?: boolean;
      variants: V;
    }) {
      const _document = data_source.manager.create(
        option.variants,
        option?.initial
      );
      if (_document.content === undefined) {
        _document.content = "";
      }
      if (_document.content_type === undefined) {
        _document.content_type = "editorjs";
      }

      if (!option.no_save) {
        data_source.manager.save(_document);
      }

      return _document as Partial<InstanceType<V>> &
        T & { content: string; document_collections: []; tags: [] };
    },
    remove: gen_sevice_remove(data_source),
  };
  return result;
}

export type DocumentService = ReturnType<typeof create_DocumentService>;
