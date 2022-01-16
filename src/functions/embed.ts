import { Context } from "detritus-client/lib/command";
import { Attachment } from "detritus-client/lib/structures";
import { Embed } from "detritus-client/lib/utils";
import fetch from "node-fetch";
import { Brand, BrandColors, BrandIcons, BrandNames } from "../enums/brands";
import { Color } from "../globals";
import { capitalizeWords, simpleGetLongAgo, storeImage } from "./tools";

export function createUserEmbed(context: Context, embed: Embed = new Embed()) {
  return embed.setAuthor(
    context.user.toString(),
    context.user.avatarUrlFormat(null, { size: 1024 }),
    context.user.jumpLink
  );
}
export function createBrandEmbed(
  brand: Brand,
  context: Context,
  named: boolean = true,
  embed: Embed = new Embed()
) {
  return createUserEmbed(context, embed)
    .setFooter(
      `${BrandNames[brand]}${
        brand === Brand.VYBOSE && named && context.command
          ? " " + capitalizeWords(context.command.name)
          : ""
      }, Done in ${simpleGetLongAgo(context.message.createdAtUnix)}`,
      BrandIcons[brand]
    )
    .setColor(BrandColors[brand]);
}
export async function createImageEmbed(
  context: Context,
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
  if (image.size) {
    footer.push(`${image.width}x${image.height} (${formatBytes(image.size)})`);
  }

  footer.push(
    `Took ${simpleGetLongAgo(context.message.createdAtUnix)} to complete`
  );
  if (brand) {
    footer.push(`Created by ${BrandNames[brand]}`);
  }
  embed.setFooter(footer.join(", "), brand ? BrandIcons[brand] : undefined);

  return embed;
}
function formatBytes(size: string | number) {
  const i = Number(size);
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (i === 0) return "0 Bytes";
  const n = Math.floor(Math.log(i) / Math.log(1024));
  return `${(i / Math.pow(1024, n)).toFixed(n >= 2 ? 2 : 0)} ${sizes[n]}`;
}
