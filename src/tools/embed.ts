import type { Context, EditOrReply } from 'detritus-client/lib/command';
import { Embed } from 'detritus-client/lib/utils';
import { decode, GIF } from 'imagescript';
import { Colours } from '../constants';
import { formatBytes } from './util';

export namespace Embeds {
  export function user(context: Context, embed: Embed = new Embed()): Embed {
    embed.setColor(Colours.Embed);
    embed.setAuthor(context.user.tag, context.user.avatarUrl);
    return embed;
  }

  export async function image(
    context: Context,
    value: Buffer,
    filename: string,
    embed: Embed = Embeds.user(context)
  ): Promise<EditOrReply> {
    const out: EditOrReply = {};
    const content = await decode(value);
    const footer = [];

    footer.push(formatBytes(Buffer.byteLength(value.buffer)));

    footer.push(`${content.width}x${content.height}`);

    let fmt = 'png';

    if (content instanceof GIF) {
      fmt = 'gif';
      footer.push(`${content.length} frames`);
    }

    const name = `${filename}.${fmt}`;

    footer.unshift(name);

    embed.setImage(`attachment://${name}`);
    embed.setFooter(footer.join(', '));

    out.embeds = [embed];
    out.files = [{ filename: name, value }];
    console.log(out);

    return out;
  }
}
