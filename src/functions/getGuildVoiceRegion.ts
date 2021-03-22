import { Guild } from "discord.js";
import { Emojis } from "../enums/emojis";
import { IElement } from "../interfaces/IElement";

const enum VoiceRegionString {
  BRAZIL = "brazil",
  EU_CENTRAL = "eu-central",
  EU_WEST = "eu-west",
  EUROPE = "europe",
  HONGKONG = "hongkong",
  INDIA = "india",
  JAPAN = "japan",
  RUSSIA = "russia",
  SINGAPORE = "singapore",
  SOUTHAFRICA = "southafrica",
  SYDNEY = "sydney",
  SOUTH_KOREA = "south-korea",
  US_CENTRAL = "us-central",
  US_EAST = "us-east",
  US_SOUTH = "us-south",
  US_WEST = "us-west",
}
const guildVoiceRegionMap = new Map<VoiceRegionString, IElement>();
guildVoiceRegionMap.set(VoiceRegionString.BRAZIL, {
  icon: Emojis.FLAG_BR,
  text: "Brazil",
});
guildVoiceRegionMap.set(VoiceRegionString.EUROPE, {
  icon: Emojis.FLAG_EU,
  text: "Europe",
});
guildVoiceRegionMap.set(VoiceRegionString.EU_CENTRAL, {
  icon: Emojis.FLAG_EU,
  text: "Europe (Central)",
});

guildVoiceRegionMap.set(VoiceRegionString.EU_WEST, {
  icon: Emojis.FLAG_EU,
  text: "Europe (West)",
});

guildVoiceRegionMap.set(VoiceRegionString.HONGKONG, {
  icon: Emojis.FLAG_HK,
  text: "Hong Kong",
});

guildVoiceRegionMap.set(VoiceRegionString.INDIA, {
  icon: Emojis.FLAG_IN,
  text: "India",
});
guildVoiceRegionMap.set(VoiceRegionString.JAPAN, {
  icon: Emojis.FLAG_JP,
  text: "Japan",
});
guildVoiceRegionMap.set(VoiceRegionString.RUSSIA, {
  icon: Emojis.FLAG_RU,
  text: "Russia",
});
guildVoiceRegionMap.set(VoiceRegionString.SINGAPORE, {
  icon: Emojis.FLAG_SG,
  text: "Singapore",
});
guildVoiceRegionMap.set(VoiceRegionString.SOUTHAFRICA, {
  icon: Emojis.FLAG_ZA,
  text: "South Africa",
});
guildVoiceRegionMap.set(VoiceRegionString.SOUTH_KOREA, {
  icon: Emojis.FLAG_SK,
  text: "South Korea",
});
guildVoiceRegionMap.set(VoiceRegionString.SYDNEY, {
  icon: Emojis.FLAG_AU,
  text: "Sydney",
});
guildVoiceRegionMap.set(VoiceRegionString.US_CENTRAL, {
  icon: Emojis.FLAG_US,
  text: "United States (Central)",
});
guildVoiceRegionMap.set(VoiceRegionString.US_EAST, {
  icon: Emojis.FLAG_US,
  text: "United States (East)",
});
guildVoiceRegionMap.set(VoiceRegionString.US_SOUTH, {
  icon: Emojis.FLAG_US,
  text: "United States (South)",
});
guildVoiceRegionMap.set(VoiceRegionString.US_WEST, {
  icon: Emojis.FLAG_US,
  text: "United States (West)",
});
export { VoiceRegionString, guildVoiceRegionMap };

export function getGuildVoiceRegion(guild: Guild, showFlag: boolean = true) {
  const reg = guildVoiceRegionMap.get(
    (guild.region as unknown) as VoiceRegionString
  );
  if (!reg) return "Unknown Voice Region";
  return `${showFlag ? reg.icon : ""} ${reg.text}`;
}
