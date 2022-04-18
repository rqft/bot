import { Command, CommandClient } from "detritus-client";
import { editOrReply } from "../../../functions/tools";
import { BaseCommand, FunMetadata } from "../basecommand";
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
      metadata: FunMetadata("Scrambles the words around in some text", "<...input: string>", ["hello world", "i am going to the park"])
    });
  }
  async run(context: Command.Context, args: ScrambleArgs) {
    const words = args.input.split(/\s+/);
    const scrambled = words.sort(() => Math.random() - 0.5);
    return editOrReply(context, scrambled.join(" "));
  }
}
