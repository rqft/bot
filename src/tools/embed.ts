import { Context, EditOrReply } from "detritus-client/lib/command";
import { Embed } from "detritus-client/lib/utils";
import { decode, GIF } from "imagescript";
import { Colours } from "../constants";
import { formatBytes } from "./util";

export module Embeds {
  export function user(context: Context, embed: Embed = new Embed()) {
    embed.setColor(Colours.EMBED);
    embed.setAuthor(context.user.tag, context.user.avatarUrl);
    return embed;
  }

  export async function image(
    context: Context,
    value: Buffer,
    filename: string
  ): Promise<EditOrReply> {
    const out: EditOrReply = {};
    const content = await decode(value);
    const footer = [];

    footer.push(formatBytes(Buffer.byteLength(value.buffer)));

    footer.push(`${content.width}x${content.height}`);

    if (content instanceof GIF) {
      footer.push(`${content.length} frames`);
    }

    const embed = user(context);
    embed.setImage(`attachment://${filename}`);
    embed.setFooter(footer.join(", "));

    out.embeds = [embed];
    out.files = [{ filename, value }];

    return out;
  }
}
