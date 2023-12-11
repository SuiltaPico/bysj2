import { useNavigate } from "@solidjs/router";
import { For, splitProps, type ParentComponent, Show } from "solid-js";
import { Column, Row } from "../base/Flex";
import "./framework.css";
import { use_framework_store } from "/@/state/framework";
import { ldi_ref_to_raw, make_class } from "/@/common/jsx_utils";
import { produce } from "solid-js/store";
import { Icon } from "@iconify-icon/solid";

const LeftDrawer: ParentComponent<{}> = (props) => {
  const [frs, set_frs] = use_framework_store();
  const left_drawer = frs.left_drawer;

  const navigate = useNavigate();

  return (
    <fluent-tabs class="left_drawer" orientation="vertical">
      <For each={frs.left_drawer.items}>
        {(it) => {
          return (
            <Show when={it.showing}>
              <fluent-tab
                onClick={() => {
                  set_frs(
                    produce((draft) => {
                      draft.left_drawer.current_item = it;
                    })
                  );
                  it.onclick(navigate)();
                }}
              >
                <Row
                  class={make_class([
                    "left_drawer_item",
                    ldi_ref_to_raw(left_drawer.current_item) === it
                      ? "__selected"
                      : undefined,
                  ])}
                  items="center"
                  gap={1}
                >
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
              <fluent-tab-panel></fluent-tab-panel>
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
