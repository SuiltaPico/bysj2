/** Let Solid.js support `@fluentui/web-components` custom components types.
 * 让 Solid.js 支持 `@fluentui/web-components` 自定义组件类型。
 *
 * just run command:
 * ```shell
 * npm install solid-js @fluentui/web-components
 * npm install -D type-fest @microsoft/fast-foundation
 * ```
 */

import "solid-js";
import {
  Button,
  fluentButton,
  type allComponents,
} from "@fluentui/web-components";
import { JSX, ParentComponent, ParentProps } from "solid-js";
import { KebabCasedProperties } from "type-fest";
import { FoundationElementRegistry, Tabs } from "@microsoft/fast-foundation";

type ExactFoundationElementRegistry<T> = T extends FoundationElementRegistry<
  any,
  infer R
>
  ? R
  : never;

type ExactTypeOf<T> = T extends { new (...args): infer U } ? U : T;

type KebabAllFluentComponent = KebabCasedProperties<
  Omit<typeof allComponents, "register">
>;
type AllFluentComponent = {
  [K in keyof KebabAllFluentComponent]: ParentProps<
    Partial<
      Omit<
        ExactTypeOf<
          ExactFoundationElementRegistry<ReturnType<KebabAllFluentComponent[K]>>
        >,
        "children" | "style"
      >
    > &
      JSX.HTMLAttributes<HTMLDivElement>
  >;
};

declare module "solid-js" {
  namespace JSX {
    type ElementProps<T> = {
      [K in keyof T]: T[K] extends Component<infer P>
        ? P extends Record<string, never>
          ? boolean
          : P
        : never;
    };
    interface IntrinsicElements
      extends ElementProps<HTMLElementTagNameMap>,
        AllFluentComponent {}
  }
}

/** @author Suilta Pico */
