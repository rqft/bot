import { Command, CommandClient } from "detritus-client";
import { findMessage } from "../../functions/findMessage";
import { makeFoundMessageEmbed } from "../../functions/makeFoundMessageEmbed";
import { CustomError } from "../../globals";
import { BaseCommand } from "../basecommand";
export default class MessageCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      label: "link",
      name: "message",
      aliases: ["msg"],
    });
  }
  async run(context: Command.Context, _args: Command.ParsedArgs) {
    const message = (await findMessage(context, _args.link)) ?? context.message;
    if (!message) throw new CustomError("No messages found");
    const emb = await makeFoundMessageEmbed(context, message);
    context.editOrReply({ embed: emb });
  }
}
