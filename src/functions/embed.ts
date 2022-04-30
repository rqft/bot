import { Context } from "detritus-client/lib/command";
import { InteractionContext } from "detritus-client/lib/interaction";
import { Attachment } from "detritus-client/lib/structures";
import { Embed } from "detritus-client/lib/utils";
import { decode, GIF } from "imagescript";
import fetch from "node-fetch";
import { Brand, BrandColors, BrandIcons, BrandNames } from "../enums/brands";
import { Color } from "../globals";
import { capitalizeWords, storeImage } from "./tools";

export function createUserEmbed(
  context: Context | InteractionContext,
  embed: Embed = new Embed()
) {
  return embed.setAuthor(
    context.user.toString(),
    context.user.avatarUrlFormat(null, { size: 1024 }),
    context.user.jumpLink
  );
}
export function createBrandEmbed(
  brand: Brand,
  context: Context | InteractionContext,
  named: boolean = true,
  embed: Embed = new Embed()
) {
  return createUserEmbed(context, embed)
    .setFooter(
      `${BrandNames[brand]}${
        brand === Brand.VYBOSE && named && context.command
          ? " " + capitalizeWords(context.command.name)
          : ""
      }`,
      BrandIcons[brand]
    )
    .setColor(BrandColors[brand]);
}
export async function createImageEmbed(
  context: Context | InteractionContext,
  input: URL | string | Buffer | Attachment | ArrayBuffer,
  name?: string,
  brand?: Brand
) {
  if (input instanceof ArrayBuffer) {
    let buf = Buffer.alloc(input.byteLength);
    let view = new Uint8Array(input);
    for (var i = 0; i < buf.length; ++i) {
      buf[i] = view[i]!;
    }
    input = buf;
  }
  if (input.constructor == String) input = new URL(input);
  if (input instanceof URL) input = await (await fetch(input)).buffer();
  const image = await storeImage(input as Buffer, name ?? "attachment.gif");

  const embed = createUserEmbed(context);
  embed.setColor(Color.EMBED);

  embed.setImage(image.url!);
  let footer = [image.filename];

  const imagescript = decode(input as Buffer);
  if (imagescript instanceof GIF) {
    footer.push(`${imagescript.length} frames`);
  }

  if (image.size) {
    footer.push(`${image.width}x${image.height} (${formatBytes(image.size)})`);
  }

  if (brand) {
    footer.push(`Created by ${BrandNames[brand]}`);
  }
  embed.setFooter(footer.join(", "), brand ? BrandIcons[brand] : undefined);

  return embed;
}
function formatBytes(size: string | number) {
  const i = Number(size);
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  if (i === 0) return "0 Bytes";
  const n = Math.floor(Math.log(i) / Math.log(1024));
  return `${(i / Math.pow(1024, n)).toFixed(n >= 2 ? 2 : 0)} ${sizes[n]}`;
}
