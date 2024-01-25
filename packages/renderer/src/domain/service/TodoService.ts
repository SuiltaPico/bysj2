import { DataSource, DeepPartial, SelectQueryBuilder } from "typeorm";
import { TodoDocument } from "../entity/todo/TodoDocument";
import { TodoItemEt } from "../entity/todo/TodoItem";
import { gen_sevice_remove } from "/@/common/utils/service_generator";
import { DocumentService } from "/@/domain/service/DocumentService";

export function create_TodoService(data_source: DataSource) {
  function query_build_linker(
    name: string,
    query_build: SelectQueryBuilder<any>
    // doument_service: DocumentService
  ) {
    return query_build
      .leftJoinAndSelect(`${name}.document`, "document")
      .leftJoinAndSelect(`${name}.tags`, "tags")
      .leftJoinAndSelect(`${name}.children`, "children")
      .leftJoinAndSelect(`${name}.parent`, "parent")
      .leftJoinAndSelect(`${name}.enable_conditions`, "enable_conditions")
      .leftJoinAndSelect(`${name}.trigger_events`, "trigger_events");
  }

  const result = {
    query_build_linker,
    create(
      doument_service: DocumentService,
      option?: { value: DeepPartial<TodoItemEt> }
    ) {
      const todo_item = data_source.manager.create(TodoItemEt, option?.value);
      if (todo_item.status === undefined) {
        todo_item.status = "InProgress";
      }
      if (todo_item.pinned_level === undefined) {
        todo_item.pinned_level = 0;
      }
      if (todo_item.document === undefined) {
        // 创建不保存的文档，否则级联会导致文档创建两次
        const todo_document = doument_service.create({
          variants: TodoDocument,
          no_save: true,
        });
        todo_item.document = todo_document;
      }
      data_source.manager.save(todo_item);
      return todo_item;
    },
    simply_create(
      summary: string,
      document_content: string,
      doument_service: DocumentService
    ) {
      // 创建不保存的文档，否则级联会导致文档创建两次
      const todo_document = doument_service.create({
        variants: TodoDocument,
        no_save: true,
      });
      todo_document.content = document_content;
      const todo_item = result.create(doument_service, {
        value: {
          summary: summary,
          document: todo_document,
        },
      });
      return todo_item;
    },
    remove: gen_sevice_remove(data_source),
    todo_preview: {
      get(option: {
        // document_service: DocumentService;
        page_size: number;
        /** 从 0 开始 */
        page: number;
      }) {
        const name = "todo_item";
        const query = query_build_linker(
          name,
          data_source.getRepository(TodoItemEt).createQueryBuilder(name)
          // option.document_service
        )
          .orderBy(`${name}.pinned_level`, "DESC")
          .addOrderBy(`${name}.create_date`, "DESC")
          .skip(option.page * option.page_size)
          .take(option.page_size);
        return query.getMany();
      },
    },
  };
  return result;
}

export type TodoService = ReturnType<typeof create_TodoService>;
