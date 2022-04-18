import { Command, CommandClient } from "detritus-client";
import { Markup } from "detritus-client/lib/utils";
import { createUserEmbed } from "../../../functions/embed";
import { editOrReply } from "../../../functions/tools";
import { KV } from "../../../globals";
import { BaseCommand, CommandTypes } from "../basecommand";
export default class TagRawCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "tag inspect",
      aliases: ["t inspect"],
      metadata: {
        description: "Get the entire tags database",
        type: CommandTypes.TOOLS,
        usage: "",
        examples: [],
      },
    });
  }
  async run(context: Command.Context) {
    const embed = createUserEmbed(context);

    const value = JSON.stringify(KV.tags.read(), null, 2);
    let file = false;
    if (value.length > 2000) {
      file = true;
    }
    embed.setDescription(Markup.codeblock(value, { language: "json" }));
    if (file) {
      return await editOrReply(context, {
        files: [{ filename: "tags.json", value }],
      });
    }
    return await editOrReply(context, { embed });
  }
}
