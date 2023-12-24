import { DataSource, DeepPartial } from "typeorm";
import { TodoDocument } from "../entity/todo/TodoDocument";
import { TodoItem } from "../entity/todo/TodoItem";
import { gen_sevice_remove } from "/@/common/utils/service_generator";
import { DocumentService } from "/@/domain/service/DocumentService";

export function create_TodoService(data_source: DataSource) {
  const result = {
    create(
      doument_service: DocumentService,
      option?: { value: DeepPartial<TodoItem> }
    ) {
      const todo_item = data_source.manager.create(TodoItem, option?.value);
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
        page_size: number;
        /** 从 0 开始 */
        page: number;
      }) {
        
      },
    },
  };
  return result;
}

export type TodoService = ReturnType<typeof create_TodoService>;
