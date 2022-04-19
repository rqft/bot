import { Command, CommandClient } from "detritus-client";
import { editOrReply } from "../../../functions/tools";
import { BaseCommand, FunMetadata } from "../basecommand";
export interface SayArgs {
  text: string;
}
export default class SayCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "say",
      type: String,
      label: "text",
<<<<<<< HEAD
      metadata: FunMetadata("Say something", "<text: string>"),
=======
      metadata: FunMetadata("Repeats text back to you", "<text: string>", ["hello world"])
>>>>>>> 71105518172e247128e81161bdf8e2d73b9355fb
    });
  }
  async run(context: Command.Context, args: SayArgs) {
    return editOrReply(context, args.text);
  }
}
