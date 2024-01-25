import { Component, Show } from "solid-js";
import { Row, Column } from "../../../base/Flex";
import { TodoItemEt } from "/@/domain/entity/todo/TodoItem";
import { extract_text_from_blocks } from "/@/common/utils/editorjs";

export interface TinyTodoItemProps {
  todo_item: TodoItemEt;
}

export const TinyTodoItem: Component<TinyTodoItemProps> = (
  props: TinyTodoItemProps
) => {
  function render(todo_item: TodoItemEt) {
    if (todo_item.document.content_type === "editorjs") {
      return extract_text_from_blocks(
        JSON.parse(todo_item.document.content).blocks
      );
    }
    return "";
  }

  return (
    <Row class="p-1.5 rounded cursor-pointer hover:bg-zinc-200" gap={2}>
      {/** TODO: 实现其他类型的待办的展示。 */}
      <Show
        when={
          props.todo_item.status === "InProgress" ||
          props.todo_item.status === "Finished"
        }
      >
        <fluent-checkbox
          class="items-start"
          style={{"transform": "scale(0.8)"}}
          checked={props.todo_item.status === "Finished"}
        ></fluent-checkbox>
      </Show>
      <Column class="grow" gap={1}>
        <Row class="w-full">{props.todo_item.summary}</Row>
        <Row class="w-full text-sm text-zinc-500">{render(props.todo_item)}</Row>
      </Column>
    </Row>
  );
};
