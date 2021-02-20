import { GuildFeatures } from "discord.js";
import { IconElement } from "../interfaces/element";
import { CustomEmojis } from "./customEmojis";

const guildFeatureMap = new Map<
  GuildFeatures | "PREVIEW_ENABLED" | "MEMBER_VERIFICATION_GATE_ENABLED",
  IconElement
>();
guildFeatureMap.set("ANIMATED_ICON", {
  icon: CustomEmojis.GUI_GIF,
  text: "Animated Server Icon",
});
guildFeatureMap.set("BANNER", {
  icon: CustomEmojis.GUI_ADD_FILE,
  text: "Server Banner",
});
guildFeatureMap.set("COMMERCE", {
  icon: CustomEmojis.CHANNEL_STORE,
  text: "Store Channels",
});
guildFeatureMap.set("COMMUNITY", {
  icon: CustomEmojis.GUI_INVITE,
  text: "Community",
});
guildFeatureMap.set("DISCOVERABLE", {
  icon: CustomEmojis.GUI_RICH_PRESENCE,
  text: "Discoverable",
});
guildFeatureMap.set("FEATURABLE", {
  icon: CustomEmojis.GUI_RICH_PRESENCE,
  text: "Featurable",
});
guildFeatureMap.set("INVITE_SPLASH", {
  icon: CustomEmojis.GUI_ADD_FILE,
  text: "Invite Background",
});
guildFeatureMap.set("NEWS", {
  icon: CustomEmojis.CHANNEL_NEWS,
  text: "Announcement Channels",
});
guildFeatureMap.set("PARTNERED", {
  icon: CustomEmojis.BADGE_PARTNER,
  text: "Discord Partner",
});
guildFeatureMap.set("RELAY_ENABLED", {
  icon: CustomEmojis.GUI_SLOWMODE,
  text: "Relay Enabled",
});
guildFeatureMap.set("VANITY_URL", {
  icon: CustomEmojis.GUI_RICH_PRESENCE,
  text: "Vanity URL",
});
guildFeatureMap.set("VERIFIED", {
  icon: CustomEmojis.BADGE_VERIFIED,
  text: "Verified",
});
guildFeatureMap.set("VIP_REGIONS", {
  icon: CustomEmojis.GUI_ADD_FILE,
  text: "VIP Voice Regions",
});
guildFeatureMap.set("WELCOME_SCREEN_ENABLED", {
  icon: CustomEmojis.GUI_RICH_PRESENCE,
  text: "Welcome Screen Enabled",
});
guildFeatureMap.set("MEMBER_VERIFICATION_GATE_ENABLED", {
  icon: CustomEmojis.GUI_RICH_PRESENCE,
  text: "Member Verification Gate Enabled",
});
guildFeatureMap.set("PREVIEW_ENABLED", {
  icon: CustomEmojis.GUI_RICH_PRESENCE,
  text: "Preview Enabled",
});
export { guildFeatureMap };
