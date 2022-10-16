export namespace is {
  export type type_of =
    | "string"
    | "number"
    | "bigint"
    | "symbol"
    | "object"
    | "undefined"
    | "boolean"
    | "function";
  export function is_type(x: unknown, type: type_of) {
    return typeof x === type;
  }
  export function string(x: unknown): x is string {
    return is_type(x, "string");
  }

  export function number(x: unknown): x is number {
    return is_type(x, "number");
  }

  export function bigint(x: unknown): x is bigint {
    return is_type(x, "bigint");
  }

  export function symbol(x: unknown): x is symbol {
    return is_type(x, "symbol");
  }

  export function object<T = unknown>(x: unknown): x is T {
    return is_type(x, "object");
  }

  // eslint-disable-next-line no-shadow-restricted-names
  export function undefined(x: unknown): x is undefined {
    return is_type(x, "undefined");
  }

  export function boolean(x: unknown): x is boolean {
    return is_type(x, "boolean");
  }

  export function fn<U extends Array<unknown>, R>(
    x: unknown
  ): x is (...args: U) => R {
    return is_type(x, "function");
  }
}
