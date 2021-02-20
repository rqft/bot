import { IconElement } from "../interfaces/element";
import { decor } from "./emojiEnum";

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
const guildVoiceRegionMap = new Map<VoiceRegionString, IconElement>();
guildVoiceRegionMap.set(VoiceRegionString.BRAZIL, {
  icon: decor.Emojis.FLAG_BR,
  text: "Brazil",
});
guildVoiceRegionMap.set(VoiceRegionString.EUROPE, {
  icon: decor.Emojis.FLAG_EU,
  text: "Europe",
});
guildVoiceRegionMap.set(VoiceRegionString.EU_CENTRAL, {
  icon: decor.Emojis.FLAG_EU,
  text: "Europe (Central)",
});

guildVoiceRegionMap.set(VoiceRegionString.EU_WEST, {
  icon: decor.Emojis.FLAG_EU,
  text: "Europe (West)",
});

guildVoiceRegionMap.set(VoiceRegionString.HONGKONG, {
  icon: decor.Emojis.FLAG_HK,
  text: "Hong Kong",
});

guildVoiceRegionMap.set(VoiceRegionString.INDIA, {
  icon: decor.Emojis.FLAG_IN,
  text: "India",
});
guildVoiceRegionMap.set(VoiceRegionString.JAPAN, {
  icon: decor.Emojis.FLAG_JP,
  text: "Japan",
});
guildVoiceRegionMap.set(VoiceRegionString.RUSSIA, {
  icon: decor.Emojis.FLAG_RU,
  text: "Russia",
});
guildVoiceRegionMap.set(VoiceRegionString.SINGAPORE, {
  icon: decor.Emojis.FLAG_SG,
  text: "Singapore",
});
guildVoiceRegionMap.set(VoiceRegionString.SOUTHAFRICA, {
  icon: decor.Emojis.FLAG_ZA,
  text: "South Africa",
});
guildVoiceRegionMap.set(VoiceRegionString.SOUTH_KOREA, {
  icon: decor.Emojis.FLAG_SK,
  text: "South Korea",
});
guildVoiceRegionMap.set(VoiceRegionString.SYDNEY, {
  icon: decor.Emojis.FLAG_AU,
  text: "Sydney",
});
guildVoiceRegionMap.set(VoiceRegionString.US_CENTRAL, {
  icon: decor.Emojis.FLAG_US,
  text: "United States (Central)",
});
guildVoiceRegionMap.set(VoiceRegionString.US_EAST, {
  icon: decor.Emojis.FLAG_US,
  text: "United States (East)",
});
guildVoiceRegionMap.set(VoiceRegionString.US_SOUTH, {
  icon: decor.Emojis.FLAG_US,
  text: "United States (South)",
});
guildVoiceRegionMap.set(VoiceRegionString.US_WEST, {
  icon: decor.Emojis.FLAG_US,
  text: "United States (West)",
});
export { VoiceRegionString, guildVoiceRegionMap };
