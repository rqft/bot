import { CommandClient, ShardClient } from "detritus-client";
import { Client as ClientRest } from "detritus-client-rest";
import { SocketOptions } from "detritus-client-socket/lib/gateway";
import { AuthTypes } from "detritus-client/lib/constants";
import { GatewayHandlerOptions } from "detritus-client/lib/gateway/handler";
import { Message } from "detritus-client/lib/structures";
import globalConf from "./globalConf";
import { Secrets } from "./secrets";

export namespace Color {
  export const embed = 3092790; // 0x2f3136
  export const pylon = 4089312; // 0x3e65e0
  export const hallucinate = 10166000; // 0x9b1ef0

  export const presenceOnline = 4437377; // 0x43b581
  export const presenceDoNotDisturb = 15746887; // 0xf04747
  export const presenceIdle = 16426522; // faa61a
  export const presenceOffline = 7634829; // 0x747f8d
  export const presenceStream = 5846677; // 0x593695
  export const presenceSpotify = 1947988; // 0x1db954

  export const houseBravery = 10192110; // 0x9b84ee
  export const houseBalance = 4513215; // 0x44ddbf
  export const houseBrilliance = 16022376; // 0xf47b68

  export const high = 16086833; // 0xf57731
  export const skin = 16370089; // 0xf9c9a9
  export const info = 4886754; // 0x4a90e2
  export const link = 45300; // 0x00b0f4
  export const notice = 15885602; // 0xf26522

  export const blurple = 16496712; // 0x7289da
  export const newBlurple = 6321129; // 0x6073e9
  export const gold = 16496712; // 0xfbb848
  export const white = 16777215; // 0xffffff
  export const grey = 10070709; // 0x99aab5
  export const chat = 3553599; // 0x36393f
  export const servers = 2105893; // 0x202225
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
  disabledEvents: ["INTERACTION_CREATE"],
  loadAllMembers: true,
};
export const commands = new CommandClient(globalConf.token, {
  prefixes: globalConf.modules.commands.prefixes,
  activateOnEdits: true,
  mentionsEnabled: true,
  ignoreMe: true,
  shardCount: 2,
  gateway,
  useClusterClient: false,
  ratelimits: [
    { duration: 1000, limit: 5, type: "user" },
    { duration: 5000, limit: 20, type: "channel" },
    { duration: 10000, limit: 35, type: "guild" },
  ],
});
export const restClient = new ClientRest(globalConf.token);
export const cache = {
  enabled: true,
  limit: 20000,
};
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
