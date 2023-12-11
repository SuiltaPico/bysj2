export function display_none_or(cond: boolean, if_true = "block") {
  if (cond) return if_true;
  return "none";
}
