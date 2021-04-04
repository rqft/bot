import { Guild } from "discord.js";
import { CustomEmojis } from "../enums/customEmojis";
import { capitalizeWords } from "./capitalizeWords";
const add = CustomEmojis.GUI_ADD_FILE;
const other = CustomEmojis.GUI_RICH_PRESENCE;
type GuildFeature =
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
  | "WELCOME_SCREEN_ENABLED";
const guildFeatureMap = new Map<GuildFeature, CustomEmojis>([
  ["ANIMATED_ICON", add],
  ["BANNER", add],
  ["COMMERCE", CustomEmojis.CHANNEL_STORE],
  ["COMMUNITY", CustomEmojis.GUI_MEMBERS],
  ["DISCOVERABLE", other],
  ["DISCOVERABLE_DISABLED", other],
  ["ENABLED_DISCOVERABLE_BEFORE", other],
  ["FEATURABLE", other],
  ["INVITE_SPLASH", add],
  ["MEMBER_LIST_DISABLED", other],
  ["MEMBER_VERIFICATION_GATE_ENABLED", other],
  ["MORE_EMOJI", CustomEmojis.GUI_ADD_REACTION],
  ["NEWS", CustomEmojis.CHANNEL_NEWS],
  ["PARTNERED", CustomEmojis.BADGE_PARTNER],
  ["PREVIEW_ENABLED", other],
  ["PUBLIC", add],
  ["PUBLIC_DISABLED", other],
  ["RELAY_ENABLED", CustomEmojis.GUI_SLOWMODE],
  ["VANITY_URL", add],
  ["VERIFIED", CustomEmojis.BADGE_VERIFIED],
  ["VIP_REGIONS", add],
  ["WELCOME_SCREEN_ENABLED", other],
]);
export { guildFeatureMap };

export function getGuildFeatures(guild: Guild, showIcons: boolean = true) {
  const feat: string[] = [];
  guild.features.forEach((element) => {
    feat.push(
      `${showIcons ? guildFeatureMap.get(element) : ""} ${capitalizeWords(
        element.toLowerCase().replace(/_/g, " ")
      )}`
    );
  });
  return feat.length !== 0 ? feat.sort().join("\n") : "None";
}
