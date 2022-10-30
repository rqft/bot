export namespace is {
  export type TypeOf =
    'bigint' | 'boolean' | 'function' | 'number' | 'object' | 'string' | 'symbol' | 'undefined';
  export function isType(x: unknown, type: TypeOf): boolean {
    return typeof x === type;
  }
  export function string(x: unknown): x is string {
    return isType(x, 'string');
  }

  export function number(x: unknown): x is number {
    return isType(x, 'number');
  }

  export function bigint(x: unknown): x is bigint {
    return isType(x, 'bigint');
  }

  export function symbol(x: unknown): x is symbol {
    return isType(x, 'symbol');
  }

  export function object<T = unknown>(x: unknown): x is T {
    return isType(x, 'object');
  }

  // eslint-disable-next-line no-shadow-restricted-names
  export function undefined(x: unknown): x is undefined {
    return isType(x, 'undefined');
  }

  export function boolean(x: unknown): x is boolean {
    return isType(x, 'boolean');
  }

  export function fn<U extends Array<unknown>, R>(
    x: unknown
  ): x is (...args: U) => R {
    return isType(x, 'function');
  }
}
