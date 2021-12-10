import { Context } from "detritus-client/lib/command";
import { Embed } from "detritus-client/lib/utils";
import gm from "gm";
import fetch from "node-fetch";
import { Brand, BrandColors, BrandIcons, BrandNames } from "../enums/brands";
import { Color } from "../globals";
import { capitalizeWords, storeImage } from "./tools";

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
      `${BrandNames[brand]} ${
        brand === Brand.VYBOSE && named && context.command
          ? capitalizeWords(context.command.name)
          : ""
      }`,
      BrandIcons[brand]
    )
    .setColor(BrandColors[brand]);
}
export async function createImageEmbed(
  context: Context,
  imageUrl: URL | string | Buffer,
  name?: string
) {
  if (imageUrl instanceof Buffer)
    imageUrl = (await storeImage(imageUrl, name ?? "image")).url!;
  if (imageUrl instanceof URL) imageUrl = imageUrl.toString();

  const embed = createUserEmbed(context);
  embed.setImage(imageUrl);

  const buffer = await (await fetch(imageUrl)).buffer();
  const graphics = gm(buffer);

  let value: gm.ImageInfo = {} as gm.ImageInfo;
  graphics.identify((err, _value) => {
    if (err) {
      throw new Error("Error while doing exif: " + err);
    }
    value = _value;
  });

  let footer = name ? `${name}${value.format}` : new URL(imageUrl).pathname;
  if (value.size) {
    footer += `, ${value.size.width}x${value.size.height} (${formatBytes(
      value.Filesize
    )})`;
  }

  embed.setColor(Color.EMBED);
  return embed;
}
function formatBytes(size: string) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (size === "0") return "0 Bytes";
  const i = parseInt(size);
  if (i === 0) return "0 Bytes";
  const n = Math.floor(Math.log(i) / Math.log(1024));
  return `${(i / Math.pow(1024, n)).toFixed(n >= 2 ? 2 : 0)} ${sizes[n]}`;
}
