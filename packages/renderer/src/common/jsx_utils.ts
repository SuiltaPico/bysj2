import { LeftDrawerItem } from "../state/framework";

export function make_class(class_item: (string | undefined)[]) {
  return class_item.filter((it) => !!it).join(" ");
}

export function make_class_from_props(props: (string | undefined)[]) {
  return props.filter((it) => !!it).join(" ");
}

export function ldi_ref_to_raw(props: LeftDrawerItem | undefined) {
  if (props === undefined) return;

  let result = props;
  while (props.ref) {
    result = props.ref;
  }

  return result;
}
