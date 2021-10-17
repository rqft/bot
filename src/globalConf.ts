import { CustomEmojis } from "./enums/customEmojis";
import { Emojis } from "./enums/emojis";
import { Secrets } from "./secrets";

const p = {
  botOwner: {
    icon: CustomEmojis.GUI_OWNERCROWN,
    text: "Bot Owner",
    anchor: "bot",
  },
  cutie: {
    icon: Emojis.COWBOY,
    text: "Cutie",
    anchor: "bot",
  },
  gh: {
    icon: CustomEmojis.CONNECTION_GITHUB,
    text: "Access To Github",
    anchor: "bot",
  },
};
const globalConf = {
  enableRichPresence: false,
  botId: "760143615124439040",
  badges: {
    "504698587221852172": [p.botOwner, p.gh], // HighArcs
    "533757461706964993": [p.botOwner, p.cutie, p.gh], /// insyri
    "485489103870230528": [p.gh], // viirall
    "481812817628889102": [p.gh], // ClashCrafter
    "760143615124439040": [
      // bot
      {
        icon: CustomEmojis.BOT_HALLUCINATE,
        text: "System",
        anchor: "bot",
      },
    ],
    "697071919639560254": [p.cutie], // Meji
    "332741001355591680": [p.cutie], // alex_mino
    "503274209003175970": [p.cutie], // Foxo
  } as Record<
    string,
    { icon: CustomEmojis | Emojis; text: string; anchor: string }[]
  >,
  levels: {
    "760143615124439040": 999, // bot
  } as Record<string, number>,
  token: Secrets.BOT_TOKEN,
  ownerIDs: [
    "504698587221852172",
    // "760143615124439040",
    "533757461706964993",
    // "819483910692929576",
  ],
  modules: {
    commands: {
      prefixes: ["$"] as string[],
      // prefixes: [""],
      confirmation: {
        emojis: {
          yes: "✅",
          no: "❌",
        },
        defaultTimeout: 15000,
      },
    },
  },
};
export default globalConf;
