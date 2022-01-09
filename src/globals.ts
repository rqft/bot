import {
  CommandClient,
  InteractionCommandClient,
  ShardClient,
} from "detritus-client";
import { Client as ClientRest } from "detritus-client-rest";
import { SocketOptions } from "detritus-client-socket/lib/gateway";
import { AuthTypes } from "detritus-client/lib/constants";
import { GatewayHandlerOptions } from "detritus-client/lib/gateway/handler";
import { Message } from "detritus-client/lib/structures";
import { Secrets } from "./secrets";

export enum Color {
  EMBED = 3092790, // 0x2f3136
  PYLON = 4089312, // 0x3e65e0
  VYBOSE = 11370173, // 0xad7ebd

  PRESENCE_ONLINE = 4437377, // 0x43b581
  PRESENCE_BUSY = 15746887, // 0xf04747
  PRESENCE_IDLE = 16426522, // faa61a
  PRESENCE_OFFLINE = 7634829, // 0x747f8d
  PRESENCE_STREAM = 5846677, // 0x593695
  PRESENCE_SPOTIFY = 1947988, // 0x1db954

  HOUSE_BRAVERY = 10192110, // 0x9b84ee
  HOUSE_BALANCE = 4513215, // 0x44ddbf
  HOUSE_BRILLIANCE = 16022376, // 0xf47b68

  HIGH = 16086833, // 0xf57731
  SKIN = 16370089, // 0xf9c9a9
  INFO = 4886754, // 0x4a90e2
  LINK = 45300, // 0x00b0f4
  NOTICE = 15885602, // 0xf26522

  BLURPLE_OLD = 16496712, // 0x7289da
  BLURPLE = 6321129, // 0x6073e9
  GOLD = 16496712, // 0xfbb848
  WHITE = 16777215, // 0xffffff
  GREY = 10070709, // 0x99aab5
  CHAT = 3553599, // 0x36393f
  SERVERS = 2105893, // 0x202225
}

export enum Chars {
  ZERO_WIDTH_CHARACTER = "\u200b",
  hideURL = "||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||",
  INFINITY = "∞",
  TAB_SPACER = "┠━",
  TAB_SPACER_END = "┖━",
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
export const gateway: GatewayHandlerOptions & SocketOptions = {
  intents: "ALL",
};

export const client = new ShardClient(Secrets.BOT_TOKEN, {
  gateway,
  isBot: true,
});
export const commands = new CommandClient(client, {
  prefixes: ["$"],
  activateOnEdits: true,
  mentionsEnabled: true,
  ignoreMe: true,
  gateway,
  useClusterClient: false,
  ratelimits: [
    { duration: 1000, limit: 5, type: "user" },
    { duration: 5000, limit: 20, type: "channel" },
    { duration: 10000, limit: 35, type: "guild" },
  ],
});
export const interactions = new InteractionCommandClient(commands, {
  gateway,
  useClusterClient: false,
  ratelimits: [
    { duration: 1000, limit: 5, type: "user" },
    { duration: 5000, limit: 20, type: "channel" },
    { duration: 10000, limit: 35, type: "guild" },
  ],
  checkCommands: true,
});
export const restClient = new ClientRest(commands.client.token);
export const selfclient = new ShardClient(Secrets.UserToken, {
  isBot: false,
  gateway,
});
export const restSelfClient = new ClientRest(Secrets.UserToken, {
  authType: AuthTypes.USER,
});
export const altclients = Secrets.AltTokens.map(
  (e) =>
    new ShardClient(e, {
      isBot: false,
      gateway,
    })
);
export const restAltClient = Secrets.AltTokens.map(
  (e) => new ClientRest(e, { authType: AuthTypes.USER })
);
export const enum MomentFormats {
  EVENT_LOGGING = "hh:mm:ss",
}
export namespace Regex {
  export const UNICODE_EMOJI =
    /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/gu;
  export const EMOJI = /<a?:(\w+):(\d+)>/g;
  export const JUMP_CHANNEL =
    /^(?:https?):\/\/(?:(?:(?:canary|ptb)\.)?(?:discord|discordapp)\.com\/channels\/)(\@me|\d+)\/(\d+)$/g;
  export const JUMP_CHANNEL_MESSAGE =
    /^(?:https?):\/\/(?:(?:(?:canary|ptb)\.)?(?:discord|discordapp)\.com\/channels\/)(\@me|\d+)\/(\d+)\/(\d+)$/g;
  export const MENTION_CHANNEL = /<#(\d+)>/g;
  export const MENTION_ROLE = /<@&(\d+)>/g;
  export const MENTION_USER = /<@(!?)(\d+)>/g;
  export const TEXT_BOLD = /\*\*([\s\S]+?)\*\*/g;
  export const TEXT_CODEBLOCK = /```(([a-z0-9-]+?)\n+)?\n*([^]+?)\n*```/gi;
  export const TEXT_CODESTRING = /`([\s\S]+?)`/g;
  export const TEXT_ITALICS = /_([\s\S]+?)_|\*([\s\S]+?)\*/g;
  export const TEXT_SNOWFLAKE = /(\d+)/g;
  export const TEXT_SPOILER = /\|\|([\s\S]+?)\|\|/g;
  export const TEXT_STRIKE = /~~([\s\S]+?)~~(?!_)/g;
  export const TEXT_UNDERLINE = /__([\s\S]+?)__/g;
  export const TEXT_URL = /((?:https?):\/\/[^\s<]+[^<.,:;"'\]\s])/g;
  export const VALID_URL =
    /^(?:(?:(?:https?):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
}
export class CustomError {
  message: string;
  constructor(s: string) {
    this.message = s;
  }
}
export const wolframAlphaFullResultsCache = new Map<string, any>();
export const wolframAlphaShortResponseCache = new Map<string, any>();
export const trackedMessages = new Map<string, Message>();
