import { createStore } from "solid-js/store";
import { TodoItem } from "/@/domain/entity/todo/TodoItem";
import { create_TodoService } from "/@/domain/service/TodoService";
import { data_source_promise } from "/@/common/db";

export const [todo_store, set_todo_store] = createStore({
  recently_todos: [] as TodoItem[],
});
