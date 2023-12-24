import { LeftDrawerItem } from "./state/framework";

export function ldi_ref_to_raw(props: LeftDrawerItem | undefined) {
  if (props === undefined) return;

  let result = props;
  while (props.ref) {
    result = props.ref;
  }

  return result;
}
