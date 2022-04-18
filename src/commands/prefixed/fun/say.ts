import { Command, CommandClient } from "detritus-client";
import { editOrReply } from "../../../functions/tools";
import { BaseCommand } from "../basecommand";
export interface SayArgs {
  text: string;
}
export default class SayCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "say",
      type: String,
      label: "text",
    });
  }
  async run(context: Command.Context, args: SayArgs) {
    return editOrReply(context, args.text);
  }
}
