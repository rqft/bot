import { IconElement } from "../interfaces/element";

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
  icon: ":flag_br:",
  text: "Brazil",
});
guildVoiceRegionMap.set(VoiceRegionString.EUROPE, {
  icon: ":flag_eu:",
  text: "Europe",
});
guildVoiceRegionMap.set(VoiceRegionString.EU_CENTRAL, {
  icon: ":flag_eu:",
  text: "Europe (Central)",
});

guildVoiceRegionMap.set(VoiceRegionString.EU_WEST, {
  icon: ":flag_eu:",
  text: "Europe (West)",
});

guildVoiceRegionMap.set(VoiceRegionString.HONGKONG, {
  icon: ":flag_hk:",
  text: "Hong Kong",
});

guildVoiceRegionMap.set(VoiceRegionString.INDIA, {
  icon: ":flag_in:",
  text: "India",
});
guildVoiceRegionMap.set(VoiceRegionString.JAPAN, {
  icon: ":flag_jp:",
  text: "Japan",
});
guildVoiceRegionMap.set(VoiceRegionString.RUSSIA, {
  icon: ":flag_ru:",
  text: "Russia",
});
guildVoiceRegionMap.set(VoiceRegionString.SINGAPORE, {
  icon: ":flag_sg:",
  text: "Singapore",
});
guildVoiceRegionMap.set(VoiceRegionString.SOUTHAFRICA, {
  icon: ":flag_za:",
  text: "South Africa",
});
guildVoiceRegionMap.set(VoiceRegionString.SOUTH_KOREA, {
  icon: ":flag_sk:",
  text: "South Korea",
});
guildVoiceRegionMap.set(VoiceRegionString.SYDNEY, {
  icon: ":flag_au:",
  text: "Sydney",
});
guildVoiceRegionMap.set(VoiceRegionString.US_CENTRAL, {
  icon: ":flag_us:",
  text: "United States (Central)",
});
guildVoiceRegionMap.set(VoiceRegionString.US_EAST, {
  icon: ":flag_us:",
  text: "United States (East)",
});
guildVoiceRegionMap.set(VoiceRegionString.US_SOUTH, {
  icon: ":flag_us:",
  text: "United States (South)",
});
guildVoiceRegionMap.set(VoiceRegionString.US_WEST, {
  icon: ":flag_us:",
  text: "United States (West)",
});
export { VoiceRegionString, guildVoiceRegionMap };
