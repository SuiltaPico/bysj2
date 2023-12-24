import {
  Component,
  Show,
  createMemo,
  createSignal,
  onCleanup,
  onMount,
  useTransition,
} from "solid-js";
import { Column, Row } from "../../base/Flex";
import { Icon } from "@iconify-icon/solid";
import "./TodoListPage.css";
import Editorjs, { EditorjsProps } from "../../base/editorjs/Editorjs";
import { display_none_or } from "/@/common/style";
import { Transition } from "solid-transition-group";
import { use_app_store } from "/@/app/state/app";

interface NewTodoPannelProps {}

const NewTodoPannel: Component<NewTodoPannelProps> = (
  props: NewTodoPannelProps
) => {
  const [app_store, set_app_store] = use_app_store();

  let new_todo_pannel: HTMLDivElement | undefined;

  const [new_todo_focused, set_new_todo_focused] = createSignal(false);
  const new_todo_placeholder = createMemo(() =>
    !new_todo_focused() ? "有什么想做的事情吗？" : ""
  );

  // 编辑器数据的获取器
  const [editor_data_fetcher, set_editor_data_fetcher] = createSignal<
    Parameters<EditorjsProps["onChange"]>[0]
  >(() => Promise.resolve(["", ""]));

  function handle_new_todo_pannel_focus(e: Event) {
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
  }

  onMount(() => {
    window.addEventListener("click", handle_new_todo_pannel_focus);
  });

  onCleanup(() => {
    window.removeEventListener("click", handle_new_todo_pannel_focus);
  });

  function handle_editor_change(
    data_fetcher: Parameters<EditorjsProps["onChange"]>[0]
  ) {
    set_editor_data_fetcher(() => data_fetcher);
  }

  async function handle_commit_btn_click() {
    const todo_service = await app_store.service_pms.todo;
    const document_service = await app_store.service_pms.document;

    const editor_saved_data = await editor_data_fetcher()();

    todo_service.simply_create(
      editor_saved_data[1].slice(0, 10),
      editor_saved_data[0],
      document_service
    );
  }

  return (
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
          onChange={handle_editor_change}
        ></Editorjs>
        <fluent-button
          className="min"
          style={{
            display: display_none_or(new_todo_focused(), "flex"),
          }}
          onClick={handle_commit_btn_click}
        >
          <Row items="center" gap={1}>
            <Icon class="text-base" icon="tabler-plus"></Icon>
            创建
          </Row>
        </fluent-button>
      </Row>
    </Column>
  );
};

interface TodoListPreviewProps {}

const TodoListPreview: Component<TodoListPreviewProps> = (
  props: TodoListPreviewProps
) => {
  const [app_store, set_app_store] = use_app_store();

  async function init() {
    const todo_service = await app_store.service_pms.todo;
    const todo_preview = await todo_service.todo_preview.get({
      page: 0,
      page_size: 5,
    });
  }

  init();

  return (
    <Column class="bg-zinc-100">
      <Row>待办速览</Row>
    </Column>
  );
};

interface TodoListProps {}

const TodoListPage: Component<TodoListProps> = (props: TodoListProps) => {
  return (
    <Column grow class="todo_list_container p-2 max-w-full gap-4">
      <NewTodoPannel></NewTodoPannel>
      <Row class="w-full">
        <TodoListPreview></TodoListPreview>
      </Row>
    </Column>
  );
};

export default TodoListPage;
