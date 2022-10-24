export function Formatter<T extends string>(
  data: Record<T, string>,
  use: (codes: Array<string>, text: string) => string = (_, t): string => t
): ApplyFn<T> {
  class Format {
    constructor(private code: Array<T> = []) {
      for (const k in data) {
        Object.defineProperty(this, k, {
          get() {
            const t: Format = Format.new([...this.code, data[k]]);
            return t;
          },
        });
      }
    }

    public use(text: string): string {
      return use(this.code, text);
    }

    public static new(code: Array<T> = []): Format {
      return new Format(code);
    }
  }

  for (const k in data) {
    Object.defineProperty(Format, k, {
      get() {
        const t: Format = Format.new([data[k] as T]);

        return t;
      },
    });
  }

  return Format as never;
}

export namespace Ansi {
  export const Identifier = '\u001b[';
  export enum FormattingCodes {
    Black = '30',
    Red = '31',
    Green = '32',
    Yellow = '33',
    Blue = '34',
    Magenta = '35',
    Cyan = '36',
    White = '37',

    BackgroundBlack = '40',
    BackgroundRed = '41',
    BackgroundGreen = '42',
    BackgroundYellow = '43',
    BackgroundBlue = '44',
    BackgroundMagenta = '45',
    BackgroundCyan = '46',
    BackgroundWhite = '47',

    BrightBlack = '30;1',
    BrightRed = '31;1',
    BrightGreen = '32;1',
    BrightYellow = '33;1',
    BrightBlue = '34;1',
    BrightMagenta = '35;1',
    BrightCyan = '36;1',
    BrightWhite = '37;1',

    BrightBackgroundBlack = '40;1',
    BrightBackgroundRed = '41;1',
    BrightBackgroundGreen = '42;1',
    BrightBackgroundYellow = '43;1',
    BrightBackgroundBlue = '44;1',
    BrightBackgroundMagenta = '45;1',
    BrightBackgroundCyan = '46;1',
    BrightBackgroundWhite = '47;1',

    Bold = '1',
    Underline = '4',
    Reversed = '7',
    Reset = '0',
  }

  export function use(codes: Array<string>, text: string): string {
    return `${Identifier}${FormattingCodes.Reset}m${codes
      .map((x) => Identifier + x + 'm')
      .join('')}${text}${Identifier}${FormattingCodes.Reset}m`;
  }

  export const Fmt = Formatter(FormattingCodes, use);
}
type ApplyFn<Z extends string> = {
  [P in Z]: Omit<ApplyFn<Z>, P>;
} & {
  use(text: string): string;
};
