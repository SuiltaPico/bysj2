import { JSX, ParentComponent, mergeProps, splitProps } from "solid-js";

export const Row: ParentComponent<
  {
    gap?: number;
    class?: string;
  } & JSX.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const [_props, others] = splitProps(props, ["gap", "class"]);

  return (
    <div
      {...mergeProps(
        {
          ...{
            class: [
              `flex flex-row`,
              _props.gap ? "gap-" + _props.gap : "",
              _props.class ?? "",
            ].join(" "),
          },
        },
        others
      )}
    />
  );
};

export const Column: ParentComponent<
  {
    gap?: number;
    class?: string;
  } & JSX.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const [_props, others] = splitProps(props, ["gap", "class"]);
  return (
    <div
      {...mergeProps(
        {
          ...{
            class: [
              `flex flex-col`,
              _props.gap ? "gap-" + _props.gap : "",
              _props.class ?? "",
            ].join(" "),
          },
        },
        others
      )}
    />
  );
};
