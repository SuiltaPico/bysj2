import "./framework.css";
import { useNavigate } from "@solidjs/router";
import { For, splitProps, type ParentComponent, Show, onMount } from "solid-js";
import { Column, Row } from "../base/Flex";
import { LeftDrawerItem, use_framework_store } from "/@/app/state/framework";
import { make_class } from "../../../common/utils/jsx_utils";
import { produce } from "solid-js/store";
import { Icon } from "@iconify-icon/solid";
import { ldi_ref_to_raw } from "../../utils";

const LeftDrawer: ParentComponent<{}> = (props) => {
  const [frs, set_frs] = use_framework_store();

  const left_drawer = frs.left_drawer;

  const navigate = useNavigate();

  function gen_tab_class(it: LeftDrawerItem) {
    return make_class([
      "left_drawer_item",
      ldi_ref_to_raw(left_drawer.current_item) === it
        ? "__selected"
        : undefined,
    ]);
  }

  function gen_handle_tab_click(it: LeftDrawerItem) {
    return () => {
      set_frs(
        produce((draft) => {
          draft.left_drawer.current_item = it;
        })
      );
      it.onclick(navigate)();
    };
  }

  return (
    <fluent-tabs class="left_drawer" orientation="vertical">
      <For each={frs.left_drawer.items}>
        {(it) => {
          return (
            <Show when={it.showing}>
              <fluent-tab onClick={gen_handle_tab_click(it)}>
                <Row class={gen_tab_class(it)} items="center" gap={1}>
                  <Icon class="text-lg" icon={`tabler-${it.icon}`}></Icon>
                  {it.name}
                </Row>
              </fluent-tab>
            </Show>
          );
        }}
      </For>
      <For each={frs.left_drawer.items}>
        {(it) => {
          return (
            <Show when={it.showing}>
              <fluent-tab-panel style={{ display: "none" }}></fluent-tab-panel>
            </Show>
          );
        }}
      </For>
    </fluent-tabs>
  );
};

const Framwork: ParentComponent<{}> = (props) => {
  const [children, others] = splitProps(props, ["children"]);

  return (
    <Row class="framework_container" {...others}>
      <LeftDrawer></LeftDrawer>
      <Row class="max-w-full" grow>
        {children.children}
      </Row>
    </Row>
  );
};

export default Framwork;
