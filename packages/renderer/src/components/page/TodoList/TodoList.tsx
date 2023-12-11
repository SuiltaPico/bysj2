import {
  Component,
  Show,
  createMemo,
  createSignal,
  onMount,
  useTransition,
} from "solid-js";
import { Column, FlexSpace, Row } from "../../base/Flex";
import { Icon } from "@iconify-icon/solid";
import "./TodoList.css";
import Editorjs from "../../base/editorjs/Editorjs";
import { display_none_or } from "/@/common/style";
import { Transition } from "solid-transition-group";
import { if_true } from "/@/common/boolean";

interface Props {}

const TodoList: Component<Props> = (props: Props) => {
  const [new_todo_focused, set_new_todo_focused] = createSignal(false);
  const new_todo_placeholder = createMemo(() =>
    !new_todo_focused() ? "有什么想做的事情吗？" : ""
  );
  const [pending, start] = useTransition();

  let new_todo_pannel: HTMLDivElement | undefined;

  window.addEventListener("click", (e) => {
    const root_node = (e.target as HTMLDivElement).getRootNode();
    if (
      !new_todo_pannel?.contains(e.target as HTMLDivElement) &&
      !(
        root_node instanceof ShadowRoot &&
        new_todo_pannel?.contains(root_node.host)
      )
    ) {
      set_new_todo_focused(false);
    }
  });

  return (
    <Column grow class="todo_list_container p-2 max-w-full">
      <Column
        class="p-2 rounded gap-1 bg-zinc-100 shadow transition-all"
        items="center"
        ref={new_todo_pannel}
      >
        <Row class="w-full px-1 text-xs" items="center">
          <Transition
            name="item-fade"
            onExit={(el, done) => {
              // setTimeout(() => {
              done();
              // });
            }}
          >
            <Show when={!new_todo_focused()}>
              <Row class="text-gray-800 text-xs w-full" items="center" gap={1}>
                <Icon class="text-sm" icon="tabler-plus"></Icon>
                新建待办
              </Row>
            </Show>
            <Show when={new_todo_focused()}>
              <Row class="text-gray-400 text-xs w-full">
                有什么想做的事情吗？按下 Ctrl + Shift 提交。
              </Row>
            </Show>
          </Transition>
        </Row>
        <Row class="w-full">
          <Editorjs
            class="px-1 flex-grow"
            config={{
              minHeight: 0,
            }}
            placeholder={new_todo_placeholder()}
            onFocusIn={() => {
              set_new_todo_focused(true);
            }}
          ></Editorjs>
          <fluent-button
            className="min"
            style={{
              display: display_none_or(new_todo_focused(), "flex"),
            }}
          >
            <Row items="center" gap={1}>
              <Icon class="text-base" icon="tabler-plus"></Icon>
              创建
            </Row>
          </fluent-button>
        </Row>
      </Column>
    </Column>
  );
};

export default TodoList;
