import { CommandClient, ShardClient } from "detritus-client";
import globalConf from "./globalConf";

export namespace Color {
  export const embed = 3092790; // 0x2f3136
  export const pylon = 4089312; // 0x3e65e0
  export const hallucinate = 10166000; // 0x9b1ef0
  export const spotify = 1947988; // 0x1db954
}
export enum Chars {
  ZERO_WIDTH_CHARACTER = "\u200b",
  hideURL = "||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||",
  INFINITY = "∞",
  TAB_SPACER = "┖━",
}
export enum SpecialIDs {
  DISCORD = "643945264868098049",
  CLYDE = "1",
  COMMUNITY_UPDATES = "798610321925210122",
}
export const Arguments = {
  ImageResolvable: {
    name: "image",
    required: true,
    type: "ImageResolvable",
  },
};
export const commands = new CommandClient(globalConf.token, {
  prefixes: globalConf.modules.commands.prefixes,
  activateOnEdits: true,
  mentionsEnabled: true,
  shardCount: 1,
  cache: {},
  gateway: {
    intents: "ALL",
  },
  useClusterClient: false,
});
export const selfclient = new ShardClient(
  "mfa.olPdCrHcFD99bT6tqO98CElD629eneY6E2bj__jOhpyIf0_o1MC8_9wcWhunCjUJ053_FLgWKlzsAlV1ExuF",
  {
    isBot: false,
    gateway: {
      intents: "ALL",
    },
  }
);
export const altclients = [
  "NjI0Nzg2OTM5MDIyNjcxODkz.YIGzhw.P5JV7BdGBQddA0NvvUtPnv5S5zQ", // Half#8633
  "Njk1NzA5NTg5Njg1MTQxNTA0.YIG8Ow.TPHpj-Far2Y0I9c_RqdyLigTlHg", // Noxy#4582
  "NzUxMjMwMzU5MjI3NzI3OTE0.YIHARA.huouU_QxjjI5wIUb7_MJcEDnYHY", // 954I#9541
].map(
  (e) =>
    new ShardClient(e, {
      isBot: false,
      gateway: {
        intents: "ALL",
      },
    })
);
