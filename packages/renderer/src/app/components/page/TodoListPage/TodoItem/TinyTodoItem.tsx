import { Component, Show } from "solid-js";
import { Row, Column } from "../../../base/Flex";
import { TodoItem } from "/@/domain/entity/todo/TodoItem";

interface TinyTodoItemProps {
  todo_item: TodoItem;
}

const TinyTodoItem: Component<TinyTodoItemProps> = (
  props: TinyTodoItemProps
) => {
  return (
    <Row>
      {/** TODO: 实现其他类型的待办的展示。 */}
      <Show
        when={
          props.todo_item.status === "InProgress" ||
          props.todo_item.status === "Finished"
        }
      >
        <fluent-checkbox
          checked={props.todo_item.status === "Finished"}
        ></fluent-checkbox>
      </Show>
      <Column class="grow">
        <Row class="w-full">{props.todo_item.summary}</Row>
        <Row class="w-full">
          {props.todo_item.document.content.slice(0, 20)}
        </Row>
      </Column>
    </Row>
  );
};
