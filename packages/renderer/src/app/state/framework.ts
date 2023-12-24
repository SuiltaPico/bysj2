import { Navigator } from "@solidjs/router";
import { createStore } from "solid-js/store";
import { AppRouteDefinition, routes } from "../router/routes";

// 将路由的引用转换为 ldi 的引用
const route_to_ldi_map = new Map<AppRouteDefinition, LeftDrawerItem>();

export const base_left_drawer_items = routes.map((it) => {
  const result = {
    name: it.name ?? it.path,
    showing: it.showing ?? true,
    onclick: (navigate) => () => {
      navigate(it.path);
    },
    route_ref: it.ref,
    icon: it.icon,
  } as LeftDrawerItem & { route_ref?: AppRouteDefinition };

  route_to_ldi_map.set(it, result);

  return result;
});

// 绑定 ref
base_left_drawer_items.map((it) => {
  if (it.route_ref) {
    it.ref = route_to_ldi_map.get(it.route_ref);
  }
});

export type LeftDrawerItem = {
  name: string;
  icon?: string;
  showing?: boolean;
  ref?: LeftDrawerItem;
  onclick(navigate: Navigator): () => void;
};

const [framework_store, set_framework_store] = createStore({
  left_drawer: {
    current_item: base_left_drawer_items[0] as undefined | LeftDrawerItem,
    items: base_left_drawer_items as LeftDrawerItem[],
  },
});

export const use_framework_store = () =>
  [framework_store, set_framework_store] as const;
