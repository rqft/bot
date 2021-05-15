import { Guild } from "detritus-client/lib/structures";
import { CustomEmojis } from "../enums/customEmojis";
import { IElement } from "../interfaces/IElement";
import { capitalizeWords } from "./capitalizeWords";
const add = CustomEmojis.GUI_ADD_FILE;
const other = CustomEmojis.GUI_RICH_PRESENCE;
export type GuildFeature =
  | "ANIMATED_ICON"
  | "BANNER"
  | "COMMERCE"
  | "COMMUNITY"
  | "DISCOVERABLE"
  | "DISCOVERABLE_DISABLED"
  | "ENABLED_DISCOVERABLE_BEFORE"
  | "FEATURABLE"
  | "INVITE_SPLASH"
  | "MEMBER_LIST_DISABLED"
  | "MEMBER_VERIFICATION_GATE_ENABLED"
  | "MORE_EMOJI"
  | "NEWS"
  | "PARTNERED"
  | "PREVIEW_ENABLED"
  | "PUBLIC"
  | "PUBLIC_DISABLED"
  | "RELAY_ENABLED"
  | "VANITY_URL"
  | "VERIFIED"
  | "VIP_REGIONS"
  | "WELCOME_SCREEN_ENABLED"
  | "LURKABLE";
const guildFeatureMap = new Map<GuildFeature, CustomEmojis>([
  ["ANIMATED_ICON", add],
  ["BANNER", add],
  ["COMMERCE", CustomEmojis.CHANNEL_STORE],
  ["COMMUNITY", CustomEmojis.GUI_MEMBERS],
  ["DISCOVERABLE", CustomEmojis.GUI_DISCOVERY],
  ["DISCOVERABLE_DISABLED", other],
  ["ENABLED_DISCOVERABLE_BEFORE", CustomEmojis.GUI_DISCOVERY],
  ["FEATURABLE", CustomEmojis.GUI_DISCOVERY],
  ["INVITE_SPLASH", add],
  ["MEMBER_LIST_DISABLED", other],
  ["MEMBER_VERIFICATION_GATE_ENABLED", other],
  ["MORE_EMOJI", CustomEmojis.GUI_ADD_REACTION],
  ["NEWS", CustomEmojis.CHANNEL_NEWS],
  ["PARTNERED", CustomEmojis.BADGE_PARTNER],
  ["PREVIEW_ENABLED", other],
  ["PUBLIC", CustomEmojis.GUI_DISCOVERY],
  ["PUBLIC_DISABLED", other],
  ["RELAY_ENABLED", CustomEmojis.GUI_SLOWMODE],
  ["VANITY_URL", add],
  ["VERIFIED", CustomEmojis.BADGE_VERIFIED],
  ["VIP_REGIONS", add],
  ["WELCOME_SCREEN_ENABLED", other],
  ["LURKABLE", other],
]);
export { guildFeatureMap };

export function getGuildFeatures(guild: Guild, showIcons: boolean = true) {
  const feat: IElement[] = [];
  guild.features.forEach((element) => {
    feat.push({
      icon: showIcons ? guildFeatureMap.get(element as GuildFeature) ?? "" : "",
      text: capitalizeWords(element.toLowerCase().replace(/_/g, " ")),
    });
  });
  return feat.sort() ?? [];
}
