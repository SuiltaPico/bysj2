export function make_class(class_item: (string | undefined)[]) {
  return class_item.filter((it) => !!it).join(" ");
}

export function make_class_from_props(props: (string | undefined)[]) {
  return props.filter((it) => !!it).join(" ");
}