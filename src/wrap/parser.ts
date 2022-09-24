import { Context } from "detritus-client/lib/command";
import { CommandMetadata } from "./base-command";

export type SyntaxParser<
  U extends string,
  V extends Array<string> = []
> = U extends `${string}[${infer N}]${infer R}`
  ? SyntaxParser<R, [...V, N]>
  : V;

export interface Self {
  string(options?: StringOptions): (value: string) => string;
  stringOptional(
    options?: OptionalOptions & StringOptions
  ): (value: string | undefined) => string | undefined;

  number(options?: NumberOptions): (value: string) => number;
  numberOptional(
    options?: OptionalOptions & NumberOptions
  ): (value: string | undefined) => number | undefined;
}

export interface OptionalOptions {
  default?: string;
}

export interface Choices<T> {
  choices?: Array<T>;
}

export interface StringOptions extends Choices<string> {
  maxLength?: number;
  minLength?: number;
}

export interface NumberOptions extends Choices<number> {
  min?: number;
  max?: number;
}

export type ArgsFactory<
  U extends string,
  Z extends Record<SyntaxParser<U>[number], unknown>
> = (self: Self) => {
  [P in SyntaxParser<U>[number] as P extends `${infer X}=${string}`
    ? X extends `${infer Q}?`
      ? Q extends `-${infer M}`
        ? M
        : Q
      : X extends `-${infer M}`
      ? M
      : X
    : P extends `${infer Q}?`
    ? Q extends `-${infer M}`
      ? M
      : Q
    : P extends `-${infer M}`
    ? M
    : P]: `${P}?` extends SyntaxParser<U>[number]
    ? (value: string | undefined, context: Context) => Z[P] | undefined
    : (value: string, context: Context) => Z[P];
};

export type Values<T extends ArgsFactory<U, unknown>, U extends string> = {
  [P in keyof ReturnType<T>]: ReturnType<T>[P] extends (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ) => infer R
    ? R
    : never;
};

export interface Options<U extends string, V extends ArgsFactory<U, unknown>> {
  args: V;
  metadata?: CommandMetadata;
}
