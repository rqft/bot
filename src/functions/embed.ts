import { User } from "detritus-client/lib/structures";
import { Embed } from "detritus-client/lib/utils";
import { Brand, BrandColors, BrandIcons, BrandNames } from "../enums/brands";

export function createUserEmbed(user: User, embed: Embed = new Embed()) {
  return embed.setAuthor(
    user.toString(),
    user.avatarUrlFormat(null, { size: 1024 }),
    user.jumpLink
  );
}
export function createBrandEmbed(
  brand: Brand,
  user: User,
  embed: Embed = new Embed()
) {
  return createUserEmbed(user, embed)
    .setFooter(BrandNames[brand], BrandIcons[brand])
    .setColor(BrandColors[brand]);
}
