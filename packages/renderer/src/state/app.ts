import { createStore } from "solid-js/store";

const [app_store, set_app_store] = createStore(() => {});

export const use_app_store = () => [app_store, set_app_store] as const;
