import { Command as Cmd, CommandClient } from "detritus-client";
import { BaseCommand } from "./base-command";

import { ArgsFactory, Options, Self, Values } from "./parser";

export const CommandArgumentBuilders: Self = {} as never;

export function Command<U extends string, V extends ArgsFactory<U, unknown>>(
  syntax: U,
  options: Options<U, V>,
  run: (context: Cmd.Context, args: Values<V, U>) => unknown
) {
  const [, cmd] = /(.+?) \[/.exec(syntax)!;
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

    arg.type = builder[id as keyof typeof builder] as (
      value: string | undefined,
      context: Cmd.Context
    ) => unknown;

    console.log(name, def, isFlag);

    if (isFlag) {
      flg.push(arg);
      continue;
    }

    opt.push(arg);
  }

  return class Exec extends BaseCommand<Values<V, U>> {
    constructor(client: CommandClient) {
      super(client, {
        name: cmd!,
        metadata: options.metadata as never,
      });
    }

    run = run;
  };
}

Command(
  "help [-arg?=1]",
  { args: (self) => ({ arg: self.string() }) },
  async (context, args) => {
    context.reply(args.arg);
  }
);
