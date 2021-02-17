import { IconElement } from "../interfaces/element";
declare const enum VoiceRegionString {
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
    US_WEST = "us-west"
}
declare const guildVoiceRegionMap: Map<VoiceRegionString, IconElement>;
export { VoiceRegionString, guildVoiceRegionMap };
