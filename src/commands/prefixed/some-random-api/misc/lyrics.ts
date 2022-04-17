import { Command, CommandClient } from "detritus-client";
import { Markup } from "detritus-client/lib/utils";
import { SomeRandomAPI } from "pariah";
import { Brand } from "../../../../enums/brands";
import { createBrandEmbed } from "../../../../functions/embed";
import { Err } from "../../../../functions/error";
import { editOrReply } from "../../../../functions/tools";
import { BaseCommand } from "../../basecommand";
export interface SRALyricsArgs {
  title: string;
}
export default class SRALyricsCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "lyrics",
      label: "title",
      type: "string",
      required: true,
    });
  }
  async run(context: Command.Context, args: SRALyricsArgs) {
    const embed = createBrandEmbed(Brand.SOME_RANDOM_API, context);
    const sra = new SomeRandomAPI();
    const lyrics = await sra.lyrics(args.title);
    if (lyrics.error) {
      throw new Err("No lyrics found", { status: 404 });
    }
    embed.setTitle(`Lyrics for ${lyrics.title} by ${lyrics.author}`);
    embed.setUrl(lyrics.links.genius);
    embed.setThumbnail(lyrics.thumbnail.genius);

    embed.setDescription(
      Markup.codeblock(lyrics.lyrics.replace(/\n{2,}/g, "\n"), {
        language: "txt",
      })
    );
    return await editOrReply(context, { embed });
  }
}
