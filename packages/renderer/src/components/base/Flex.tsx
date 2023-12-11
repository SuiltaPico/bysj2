import {
  Component,
  JSX,
  ParentComponent,
  mergeProps,
  splitProps,
} from "solid-js";
import { make_class } from "/@/common/jsx_utils";
import { maybe_str_map } from "/@/common/maybe";
import { if_true } from "/@/common/boolean";

type FlexRowColProps = {
  gap?: number;
  grow?: boolean;
  justify?:
    | "normal"
    | "start"
    | "end"
    | "center"
    | "between"
    | "around"
    | "evenly"
    | "stretch";
  items?: "start" | "end" | "center" | "baseline" | "stretch";
  class?: string;
};

function generate_RowCol(
  type: "col" | "row"
): ParentComponent<FlexRowColProps & JSX.HTMLAttributes<HTMLDivElement>> {
  return (props) => {
    const [p, others] = splitProps(props, [
      "gap",
      "grow",
      "class",
      "justify",
      "items",
      "children",
    ]);

    return (
      <div
        {...mergeProps(
          {
            ...{
              class: make_class([
                p.class,
                `flex flex-${type}`,
                if_true(p.grow, "flex-grow"),
                maybe_str_map(p.gap?.toString(), (it) => `gap-${it}`),
                maybe_str_map(p.justify, `justify-${p.justify}`),
                maybe_str_map(p.items, `items-${p.items}`),
              ]),
            },
          },
          others
        )}
      >
        {p.children}
      </div>
    );
  };
}

export const Row = generate_RowCol("row");
export const Column = generate_RowCol("col");

export const FlexSpace: ParentComponent<
  {
    class?: string;
  } & JSX.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const [_props, others] = splitProps(props, ["class"]);
  return (
    <div
      {...mergeProps({ ...{ class: props.class ?? "" + "flex-grow" } }, others)}
    ></div>
  );
};
