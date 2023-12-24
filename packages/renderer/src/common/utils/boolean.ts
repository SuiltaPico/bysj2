export function if_true<T>(bool: boolean | undefined, value:T) {
  return bool ? value : undefined
}