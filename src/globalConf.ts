import { ClientOptions, Permissions } from "discord.js";
import { CustomEmojis } from "./enums/customEmojis";
import { IElement } from "./interfaces/IElement";
import { Secrets } from "./secrets";
import { Scope } from "./utils";
type List<T> = {
  [any: string]: T;
};
const p = {
  botOwner: {
    icon: CustomEmojis.GUI_OWNERCROWN,
    text: "Bot Owner",
    anchor: "bot",
  },
  cutie: {
    icon: "🤠",
    text: "Cutie",
    anchor: "bot",
  },
  gh: {
    icon: CustomEmojis.GUI_ROLE,
    text: "Access To Github",
    anchor: "bot",
  },
};
type ResponseType = "code" | "token";
const globalConf = {
  botInvite: {
    scope: [
      Scope.ACCESS_ACTIVITIES, //
      Scope.ACCESS_EMAIL_ADDRESS, //
      Scope.ACCESS_FRIENDS, //
      Scope.ACCESS_SERVERS,
      Scope.ACCESS_THIRD_PARTY_CONNECTIONS,
      Scope.ACCESS_USERNAME_AVATAR,
      Scope.ADD_BOT,
      Scope.ADD_WEBHOOK, //
      Scope.ALTER_VOICE_SETTINGS, //
      Scope.INTERFACE_WITH_CLIENT, //
      Scope.JOIN_GROUP_DM, //
      Scope.JOIN_SERVERS, //
      Scope.LISTEN_TO_NOTIFICATIONS, //
      Scope.MANAGE_BUILDS, //
      Scope.MANAGE_ENTITLEMENTS, //
      Scope.MANAGE_STORE, //
      Scope.READ_ALL_MESSAGES, //
      Scope.READ_BUILDS, //
      Scope.READ_VOICE_SETTINGS, //
      Scope.SLASH_COMMANDS,
      Scope.UPDATE_ACTIVITY, //
    ] as Scope[],
    permissions: new Permissions([
      "SEND_MESSAGES",
      "EMBED_LINKS",
      "ADD_REACTIONS",
      "VIEW_CHANNEL",
      "VIEW_GUILD_INSIGHTS",
    ]),
    redirect_uri: "https://arcy-at.github.io/",
    guild_id: undefined,
    response_type: "code" as ResponseType,
    client_id: "760143615124439040",
    url() {
      return `https://discord.com/oauth2/authorize?client_id=${
        this.client_id
      }&scope=${this.scope.join("%20")}${
        this.scope.includes(Scope.ADD_BOT)
          ? `&permissions=${this.permissions.bitfield}`
          : ""
      }${
        this.redirect_uri
          ? `&redirect_uri=${encodeURIComponent(this.redirect_uri)}`
          : ""
      }${
        this.guild_id
          ? `&guild_id=${this.guild_id}&disable_guild_select=true`
          : ""
      }&response_type=${this.response_type}`;
    },
  },
  enableRichPresence: true,
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
  } as List<IElement[]>,
  levels: {
    "760143615124439040": 999, // bot
  } as List<number>,
  token: Secrets.BOT_TOKEN,
  allowPings: {
    repliedUser: false,
    users: [],
  } as ClientOptions["allowedMentions"],
  ownerIDs: [
    "504698587221852172",
    // "760143615124439040",
    "533757461706964993",
    // "819483910692929576",
  ],
  modules: {
    commands: {
      prefixes: ["$", "<@760143615124439040>"] as string[],
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
