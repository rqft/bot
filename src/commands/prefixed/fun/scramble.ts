import { Command, CommandClient } from "detritus-client";
import { editOrReply } from "../../../functions/tools";
import { BaseCommand } from "../basecommand";
export interface ScrambleArgs {
  input: string;
}
export default class ScrambleCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "scramble",
      label: "input",
      type: "string",
      required: true,
      consume: true,
    });
  }
  async run(context: Command.Context, args: ScrambleArgs) {
    const words = args.input.split(/\s+/);
    const scrambled = words.sort(() => Math.random() - 0.5);
    return editOrReply(context, scrambled.join(" "));
  }
}
