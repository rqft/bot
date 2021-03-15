import { CustomEmojis } from "./enums/customEmojis";
import { Secrets } from "./secrets";
type List<T> = {
  [any: string]: T;
};
export const globalConf = {
  badges: {
    "504698587221852172": [`${CustomEmojis.GUI_OWNERCROWN} Bot Owner`],
  } as List<string[]>,
  levels: {} as List<number>,
  token: Secrets.BOT_TOKEN,
  ownerIDs: ["504698587221852172"],
  modules: {
    commands: {
      prefixes: [] as string[],
      mentionPrefix: true,
    },
  },
};
