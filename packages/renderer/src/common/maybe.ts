export function maybe_str_map<T>(
  str: string | undefined | null,
  mapper: ((str: string) => T) | string
) {
  if (str === undefined || str === null) return;
  if (typeof mapper === "function") {
    return mapper(str);
  }
  return mapper;
}

export function maybe_map<T, U>(
  str: T | undefined | null,
  mapper: (value: Exclude<T, undefined | null>) => U
) {
  if (str === undefined || str === null) return;
  return mapper(str as Exclude<T, undefined | null>);
}
