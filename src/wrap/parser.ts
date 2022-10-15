import { ArgumentOptions, Context } from "detritus-client/lib/command";
import {
  ChannelBase,
  ChannelDM,
  ChannelDMGroup,
  ChannelGuildBase,
  ChannelGuildCategory,
  ChannelGuildDirectory,
  ChannelGuildForum,
  ChannelGuildStageVoice,
  ChannelGuildStore,
  ChannelGuildText,
  ChannelGuildThread,
  ChannelGuildVoice,
  Emoji,
  Member,
  Role,
  User,
} from "detritus-client/lib/structures";
import { UnicodeEmoji } from "../tools/emoji";
import { CommandMetadata, CommandOptionsExtra } from "./base-command";

export type SyntaxParser<
  U extends string,
  V extends Array<string> = []
> = U extends `${string}[${infer N}]${infer R}`
  ? SyntaxParser<R, [...V, N]>
  : V;

export type RemoveSugar<T extends string> = T extends `${infer X}=${string}`
  ? RemoveSugar<X>
  : T extends `${infer X}?`
  ? RemoveSugar<X>
  : T extends `...${infer X}`
  ? RemoveSugar<X>
  : T extends `-${infer X}`
  ? X
  : T;

export interface Self {
  string(options?: StringOptions): Arg<string, string>;
  stringOptional(
    options?: OptionalOptions & StringOptions
  ): Arg<string | undefined, string | undefined>;

  number(options?: NumberOptions): Arg<string, number>;
  numberOptional(
    options?: OptionalOptions & NumberOptions
  ): Arg<string | undefined, number | undefined>;

  integer(options?: NumberOptions): Arg<string, number>;
  integerOptional(
    options?: OptionalOptions & NumberOptions
  ): Arg<string | undefined, number | undefined>;

  role(): Arg<string, Role>;
  roleOptional(
    options?: OptionalOptions
  ): Arg<string | undefined, Role | undefined>;

  user(): Arg<string, User>;
  userOptional(
    options?: OptionalOptions
  ): Arg<string | undefined, User | undefined>;

  member(): Arg<string, Member>;
  memberOptional(
    options?: OptionalOptions
  ): Arg<string | undefined, Member | undefined>;

  date(): (value: string) => Date;
  dateOptional(
    options?: OptionalOptions
  ): Arg<string | undefined, Date | undefined>;

  object<T>(): Arg<string, T>;
  objectOptional<T>(
    options: OptionalOptions
  ): Arg<string | undefined, T | undefined>;

  regexp(): Arg<string, RegExp>;
  regexpOptional(
    options?: OptionalOptions
  ): Arg<string | undefined, RegExp | undefined>;

  channel<T extends ChannelNames = ChannelNames.Base>(
    options?: ChannelOptions<T>
  ): Arg<string, ChannelFromName<T>>;
  channelOptional<T extends ChannelNames = ChannelNames.Base>(
    options?: OptionalOptions & ChannelOptions<T>
  ): Arg<string | undefined, ChannelFromName<T> | undefined>;

  url(): Arg<string, URL>;
  urlOptional(
    options?: OptionalOptions
  ): Arg<string | undefined, URL | undefined>;

  emoji(): Arg<string, Emoji>;
  emojiOptional(
    options?: OptionalOptions
  ): Arg<string | undefined, Emoji | undefined>;

  unicodeEmoji(): Arg<string, UnicodeEmoji>;
  unicodeEmojiOptional(
    options?: OptionalOptions
  ): Arg<string | undefined, UnicodeEmoji | undefined>;

  array<T = string>(options?: ArrayOptions<T>): Arg<string, Array<T>>;
  arrayOptional<T = string>(
    options?: ArrayOptions<T> & OptionalOptions
  ): Arg<string | undefined, Array<T> | undefined>;
}

export type Arg<U, T> = (value: U, context: Context) => T;

export interface OptionalOptions {
  default?: string;
}

export interface Choices<T> {
  choices?: Array<T>;
}

export interface StringOptions extends Choices<string> {
  maxLength?: number;
  minLength?: number;
}

export interface ArrayOptions<T> extends StringOptions {
  map?: (value: string) => T;
  split?: string;
}

export interface NumberOptions extends Choices<number> {
  min?: number;
  max?: number;
}

export interface ChannelOptions<T extends ChannelNames> {
  type: T;
}

export enum ChannelNames {
  Base = "Base",
  Dm = "Dm",
  GuildVoice = "GuildVoice",
  DmGroup = "DmGroup",
  GuildBase = "GuildBase",
  GuildCategory = "GuildCategory",
  GuildText = "GuildText",
  GuildStore = "GuildStore",
  GuildThread = "GuildThread",
  GuildStageVoice = "GuildStageVoice",
  GuildDirectory = "GuildDirectory",
  GuildForum = "GuildForum",
}

export type ChannelFromName<T extends ChannelNames> = {
  [ChannelNames.Base]: ChannelBase;
  [ChannelNames.Dm]: ChannelDM;
  [ChannelNames.DmGroup]: ChannelDMGroup;
  [ChannelNames.GuildBase]: ChannelGuildBase;
  [ChannelNames.GuildCategory]: ChannelGuildCategory;
  [ChannelNames.GuildDirectory]: ChannelGuildDirectory;
  [ChannelNames.GuildForum]: ChannelGuildForum;
  [ChannelNames.GuildStageVoice]: ChannelGuildStageVoice;
  [ChannelNames.GuildStore]: ChannelGuildStore;
  [ChannelNames.GuildText]: ChannelGuildText;
  [ChannelNames.GuildThread]: ChannelGuildThread;
  [ChannelNames.GuildVoice]: ChannelGuildVoice;
}[T];

export const ChannelConstructors = {
  [ChannelNames.Base]: ChannelBase,
  [ChannelNames.Dm]: ChannelDM,
  [ChannelNames.DmGroup]: ChannelDMGroup,
  [ChannelNames.GuildBase]: ChannelGuildBase,
  [ChannelNames.GuildCategory]: ChannelGuildCategory,
  [ChannelNames.GuildDirectory]: ChannelGuildDirectory,
  [ChannelNames.GuildForum]: ChannelGuildForum,
  [ChannelNames.GuildStageVoice]: ChannelGuildStageVoice,
  [ChannelNames.GuildStore]: ChannelGuildStore,
  [ChannelNames.GuildText]: ChannelGuildText,
  [ChannelNames.GuildThread]: ChannelGuildThread,
  [ChannelNames.GuildVoice]: ChannelGuildVoice,
};

export type ArgsFactory<
  U extends string,
  Z extends Record<RemoveSugar<SyntaxParser<U>[number]>, unknown>
> = (self: Self) => {
  [P in keyof Z]: Arg<string, Z[P]>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Values<T extends ArgsFactory<U, any>, U extends string> = {
  [P in keyof ReturnType<T>]: ReturnType<T>[P] extends (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ) => infer R
    ? R
    : never;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Options<U extends string, V extends ArgsFactory<U, any>>
  extends Omit<CommandOptionsExtra, keyof ArgumentOptions | "args"> {
  args?: V;
  metadata?: CommandMetadata;
}
