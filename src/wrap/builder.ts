import { Command as Cmd, CommandClient } from "detritus-client/lib";
import { BaseCommand } from "./base-command";

import { ArgsFactory, Options, Self, Values } from "./parser";

export const CommandArgumentBuilders: Self = {
  string(options) {
    return (value) => {
      if (options) {
        if (options.choices && options.choices.length) {
          if (options.choices.includes(value)) {
            return value;
          }

          throw new RangeError(
            `must be one of [ ${options.choices.join(", ")} ]`
          );
        }

        if (options.maxLength && value.length > options.maxLength) {
          throw new RangeError(
            `must be less than ${options.maxLength} characters`
          );
        }

        if (options.minLength && value.length < options.minLength) {
          throw new RangeError(
            `must be more than ${options.maxLength} characters`
          );
        }
      }

      return value;
    };
  },

  stringOptional(options) {
    return (value: string | undefined) => {
      if (value) {
        return this.string(options)(value);
      }
      return undefined;
    };
  },

  number(options) {
    return (value) => {
      const float = Number.parseFloat(value);
      if (options) {
        if (options.choices && options.choices.length) {
          if (options.choices.includes(float)) {
            return float;
          }

          throw new RangeError(
            `must be one of [ ${options.choices.join(", ")} ]`
          );
        }

        if (options.min && float < options.min) {
          throw new RangeError(`must be more than ${options.min}`);
        }

        if (options.max && float > options.max) {
          throw new RangeError(`must be less than ${options.max}`);
        }
      }

      return float;
    };
  },

  numberOptional(options) {
    return (value) => {
      if (value) {
        return this.numberOptional(options)(value);
      }

      return undefined;
    };
  },
};

export function Command<U extends string, V extends ArgsFactory<U, unknown>>(
  syntax: U,
  options: Options<U, V>,
  run: (context: Cmd.Context, args: Values<V, U>) => unknown
) {
  const [, cmd] = /^(.+?)(?: \[|$)/.exec(syntax)!;
  const ids = /\[\w+\??\]/g.exec(syntax) || [];
  const opt: Array<Cmd.ArgumentOptions> = [];
  const flg: Array<Cmd.ArgumentOptions> = [];

  const builder = options.args(CommandArgumentBuilders);

  for (const id of ids) {
    const [, name, def] = /^\[-?(.+?)\??(?:=(.*?))?\]$/.exec(id)!;
    let arg: Cmd.ArgumentOptions = { name: name! };
    const isFlag = /^\[-/.test(id);
    if (/^\[-?(.+?)\?/.test(id)) {
      arg.required = false;
    }

    if (def) {
      arg.default = def;
    }

    arg.type = (builder[id as keyof typeof builder] ||
      CommandArgumentBuilders.string()) as never;

    if (isFlag) {
      flg.push(arg);
      continue;
    }

    opt.push(arg);
  }

  return class Exec extends BaseCommand<Values<V, U>> {
    constructor(client: CommandClient) {
      console.log("test");
      console.log(cmd);
      super(client, {
        name: cmd!,
        metadata: options.metadata as never,
        type: opt,
        args: flg,
      });
    }

    public run(context: Cmd.Context, args: Values<V, U>): unknown {
      void 0;
      return run(context, args);
    }
  };
}
