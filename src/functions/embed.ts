import { Context } from "detritus-client/lib/command";
import { Embed } from "detritus-client/lib/utils";
import { Brand, BrandColors, BrandIcons, BrandNames } from "../enums/brands";

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
        named && context.command ? context.command.name : ""
      }`,
      BrandIcons[brand]
    )
    .setColor(BrandColors[brand]);
}
