export function parse_json<T>(json_src: string) {
  return JSON.parse(json_src) as T;
}

export function stringify_json(json: any) {
  return JSON.stringify(json);
}

export const json_transformer = {
  from: parse_json,
  to: stringify_json,
};
