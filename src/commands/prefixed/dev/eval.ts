import { Command, CommandClient } from "detritus-client";
import { BaseCommand } from "../basecommand";

export interface EvalArgs {
  code: string;
  jsonspacing: number;
}
export default class EvalCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      label: "code",
      name: "eval",
      priority: 4587,
      required: true,
      args: [{ default: 2, name: "jsonspacing", type: "number" }],
      onBefore: (context) => context.user.isClientOwner,
      onCancel: (context) => context.editOrReply(`❌ no`),
      onError: (_context, _args, error) => console.error(error),
    });
  }
  async run(_context: Command.Context, _args: EvalArgs) {}
}
