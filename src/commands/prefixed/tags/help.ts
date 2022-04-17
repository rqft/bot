import { Command, CommandClient } from "detritus-client";
import { Markup } from "detritus-client/lib/utils";
import { Brand } from "../../../enums/brands";
import { createBrandEmbed } from "../../../functions/embed";
import { Tags } from "../../../functions/tags";
import { editOrReply } from "../../../functions/tools";
import { BaseCommand } from "../basecommand";

export default class TagExecCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "tag help",
      aliases: ["t help"],
    });
  }
  async run(context: Command.Context) {
    const embed = createBrandEmbed(Brand.VYBOSE, context);

    embed.setDescription(
      "Tags are a way to store and execute code.\n\n" +
        "There are no rules, anybody can set, delete, get, whatever tag. Everything is purely anonymous, so try not to put tos violations on here (thanks)\n" +
        "Dynamic tags are ran by using user-defined scripts."
    );

    embed.addField(
      "Commands",
      [
        "`tag create <key> <value>` - Create a tag",
        "`tag delete <key>` - Delete a tag",
        "`tag get <key>` - Get a tag",
        "`tag list` - List all tags",
        "`tag raw <key>` - Get a tag in raw format",
        "`tag exec <script> [-args ...string]` - Execute a tag",
        "`tag help` - Get this message",
      ].join("\n")
    );

    embed.addField(
      "Usage",
      `${Markup.bold("Script")} ${Markup.codestring(
        `${Tags.Symbols.START}name${Tags.Symbols.FUNCTION}args${Tags.Symbols.ARGUMENT}other${Tags.Symbols.END}`
      )}`
    );

    return await editOrReply(context, { embed });
  }
}
