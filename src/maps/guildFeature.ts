import { GuildFeatures } from "discord.js";
import { IconElement } from "../handlers/element";

const guildFeatureMap = new Map<GuildFeatures, IconElement>();
guildFeatureMap.set("ANIMATED_ICON", {
  icon: "<:IconGui_GIF:799642414431207496>",
  text: "Animated Server Icon",
});
guildFeatureMap.set("BANNER", {
  icon: "<:IconGui_AddFile:799643046614007838>",
  text: "Server Banner",
});
guildFeatureMap.set("COMMERCE", {
  icon: "<:IconChannel_Str:798624234745757727>",
  text: "Store Channels",
});
guildFeatureMap.set("COMMUNITY", {
  icon: "<:IconGui_Invite:798624241347198987>",
  text: "Community",
});
guildFeatureMap.set("DISCOVERABLE", {
  icon: "<:IconGui_RichPresence:798624241351655514>",
  text: "Discoverable",
});
guildFeatureMap.set("FEATURABLE", {
  icon: "<:IconGui_RichPresence:798624241351655514>",
  text: "Featurable",
});
guildFeatureMap.set("INVITE_SPLASH", {
  icon: "<:IconGui_AddFile:799643046614007838>",
  text: "Invite Background",
});
guildFeatureMap.set("NEWS", {
  icon: "<:IconChannel_News:798624238793261109>",
  text: "Store Channels",
});
guildFeatureMap.set("PARTNERED", {
  icon: "<:IconBadge_Partner:798624238939406416>",
  text: "Discord Partner",
});
guildFeatureMap.set("RELAY_ENABLED", {
  icon: "<:IconGui_Slowmode:798624247337058354>",
  text: "Relay Enabled",
});
guildFeatureMap.set("VANITY_URL", {
  icon: "<:IconGui_RichPresence:798624241351655514>",
  text: "Vanity URL",
});
guildFeatureMap.set("VERIFIED", {
  icon: "<:IconBadge_Verified:801248680476016671>",
  text: "Verified",
});
guildFeatureMap.set("VIP_REGIONS", {
  icon: "<:IconGui_AddFile:799643046614007838>",
  text: "VIP Voice Regions",
});
guildFeatureMap.set("WELCOME_SCREEN_ENABLED", {
  icon: "<:IconGui_RichPresence:798624241351655514>",
  text: "Welcome Screen Enabled",
});
export { guildFeatureMap };
