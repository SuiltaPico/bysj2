import { render } from "solid-js/web";
import { customElement } from "solid-element";
import {
  fluentButton,
  fluentCheckbox,
  fluentTab,
  fluentTabPanel,
  fluentTabs,
  fluentTextArea,
  fluentTextField,
  provideFluentDesignSystem,
} from "@fluentui/web-components";

provideFluentDesignSystem().register(
  fluentButton(),
  fluentTextField(),
  fluentTextArea(),
  fluentTab(),
  fluentTabs(),
  fluentTabPanel(),
  fluentCheckbox()
);
customElement("fluent-button", {}, fluentButton);

import "./index.css";
import "virtual:uno.css";
import "@unocss/reset/tailwind.css";

import App from "./App";

const root = document.getElementById("app");

render(() => <App></App>, root!);
