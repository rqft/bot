import { Command, CommandClient } from "detritus-client";
import { makeFoundMessageEmbed } from "../../functions/makeFoundMessageEmbed";
import { CustomError, trackedMessages } from "../../globals";
import { BaseCommand } from "../basecommand";
export default class SnipeCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "snipe",
    });
  }
  async run(context: Command.Context, _args: Command.ParsedArgs) {
    const message = trackedMessages.get(context.channelId);
    if (!message) throw new CustomError("No messages have been deleted.");
    const emb = await makeFoundMessageEmbed(context, message);
    context.editOrReply({ embed: emb });
  }
}
