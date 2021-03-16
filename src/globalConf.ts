import { CustomEmojis } from "./enums/customEmojis";
import { Secrets } from "./secrets";
type List<T> = {
  [any: string]: T;
};
const globalConf = {
  badges: {
    "504698587221852172": [`${CustomEmojis.GUI_OWNERCROWN} Bot Owner`],
  } as List<string[]>,
  levels: {
    "760143615124439040": 999,
  } as List<number>,
  token: Secrets.BOT_TOKEN,
  ownerIDs: ["504698587221852172", "760143615124439040"],
  modules: {
    commands: {
      prefixes: ["$"] as string[],
      mentionPrefix: true,
    },
  },
};
export default globalConf;
