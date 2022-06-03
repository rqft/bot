export declare module Markdown {
    export enum TimestampStyles {
        BOTH_LONG = "F",
        BOTH_SHORT = "f",
        DATE_LONG = "D",
        DATE_SHORT = "d",
        RELATIVE = "R",
        TIME_LONG = "T",
        TIME_SHORT = "t"
    }
    export function trueSlice(text: string, limit?: number): string;
    export const Strings: {
        BOLD: string;
        CODEBLOCK: string;
        CODESTRING: string;
        CODESTRING_DOUBLE: string;
        ESCAPE: string;
        ITALICS: string;
        SPOILER: string;
        STRIKE: string;
        UNDERLINE: string;
    };
    export function EscapeBasic(raw: string, key: keyof typeof Strings): string;
    export const Escape: Record<keyof typeof Strings, typeof EscapeBasic>;
    interface Timestamp {
        raw: number;
        month: string;
        month_short: string;
        date: string;
        year: string;
        second: string;
        meridian: "AM" | "PM";
        hour: string;
        minute: string;
        day: string;
        relative: string;
    }
    export function formatDate(date: Date): Timestamp;
    export function multiplyLarge(...nums: Array<number | bigint>): bigint;
    export function bigintAbs(int: bigint): bigint;
    export function toTimeString<T extends string | number | symbol>(unix: bigint | number, units?: {
        myriad: bigint;
        millenium: bigint;
        century: bigint;
        decade: bigint;
        year: bigint;
        month: bigint;
        week: bigint;
        day: bigint;
        hour: bigint;
        minute: bigint;
        second: bigint;
        millisecond: bigint;
    }, isFromNow?: boolean, limit?: number): string;
    export function freezeUnix(unix: number, style: TimestampStyles): string;
    class FormatInner {
        raw: string;
        static: typeof FormatInner;
        constructor(raw: string | FormatInner);
        toString(): string;
        valueOf(): string;
        italics(): FormatInner;
        bold(): FormatInner;
        codestring(): FormatInner;
        codestringDouble(): FormatInner;
        codestringSingle(): FormatInner;
        codeblock(language?: string): FormatInner;
        spoiler(): FormatInner;
        strike(): FormatInner;
        underline(): FormatInner;
        build(key: keyof typeof Strings, w: string): FormatInner;
        static wrap(raw: string, what: string): string;
        [Symbol.toStringTag](): string;
    }
    export class Format extends FormatInner {
        static bold(text: string): FormatInner;
        static build(text: string, key: keyof typeof Strings): FormatInner;
        static codeblock(text: string, language?: string): FormatInner;
        static codestring(text: string): FormatInner;
        static codestringSingle(text: string): FormatInner;
        static codestringDouble(text: string): FormatInner;
        static italics(text: string): FormatInner;
        static spoiler(text: string): FormatInner;
        static strike(text: string): FormatInner;
        static underline(text: string): FormatInner;
        static timestamp(unix: number | Date | string, format?: TimestampStyles, isSeconds?: boolean): FormatInner;
        static date(unix: number | Date | string, format?: TimestampStyles, isSeconds?: boolean): FormatInner;
        static link(text: string, url: string | URL): FormatInner;
    }
    export enum DiscordRegexNames {
        EMOJI = "EMOJI",
        JUMP_CHANNEL = "JUMP_CHANNEL",
        JUMP_CHANNEL_MESSAGE = "JUMP_CHANNEL_MESSAGE",
        MENTION_CHANNEL = "MENTION_CHANNEL",
        MENTION_ROLE = "MENTION_ROLE",
        MENTION_USER = "MENTION_USER",
        TEXT_BOLD = "TEXT_BOLD",
        TEXT_CODEBLOCK = "TEXT_CODEBLOCK",
        TEXT_CODESTRING = "TEXT_CODESTRING",
        TEXT_ITALICS = "TEXT_ITALICS",
        TEXT_SNOWFLAKE = "TEXT_SNOWFLAKE",
        TEXT_SPOILER = "TEXT_SPOILER",
        TEXT_STRIKE = "TEXT_STRIKE",
        TEXT_UNDERLINE = "TEXT_UNDERLINE",
        TEXT_URL = "TEXT_URL"
    }
    export const DiscordRegex: {
        EMOJI: RegExp;
        JUMP_CHANNEL: RegExp;
        JUMP_CHANNEL_MESSAGE: RegExp;
        MENTION_CHANNEL: RegExp;
        MENTION_ROLE: RegExp;
        MENTION_USER: RegExp;
        TEXT_BOLD: RegExp;
        TEXT_CODEBLOCK: RegExp;
        TEXT_CODESTRING: RegExp;
        TEXT_ITALICS: RegExp;
        TEXT_SNOWFLAKE: RegExp;
        TEXT_SPOILER: RegExp;
        TEXT_STRIKE: RegExp;
        TEXT_UNDERLINE: RegExp;
        TEXT_URL: RegExp;
    };
    export interface DiscordRegexMatch {
        animated?: boolean;
        channelId?: string;
        guildId?: string;
        id?: string;
        language?: string;
        matched: string;
        mentionType?: string;
        messageId?: string;
        name?: string;
        text?: string;
        species: DiscordRegexNames;
    }
    export interface DiscordRegexPayload<T extends DiscordRegexMatch> {
        match: {
            regex: RegExp;
            type: string;
        };
        matches: Array<T>;
    }
    export interface EmojiMatch extends DiscordRegexMatch {
        name: string;
        id: string;
        animated: boolean;
        species: DiscordRegexNames.EMOJI;
    }
    export interface JumpMatch extends DiscordRegexMatch {
        guildId: string;
        species: DiscordRegexNames.JUMP_CHANNEL | DiscordRegexNames.JUMP_CHANNEL_MESSAGE;
    }
    export interface JumpChannelMatch extends JumpMatch {
        channelId: string;
        species: DiscordRegexNames.JUMP_CHANNEL;
    }
    export interface JumpChannelMessageMatch extends JumpMatch {
        channelId: string;
        messageId: string;
        species: DiscordRegexNames.JUMP_CHANNEL_MESSAGE;
    }
    export interface MentionableMatch extends DiscordRegexMatch {
        id: string;
        species: DiscordRegexNames.MENTION_CHANNEL | DiscordRegexNames.MENTION_ROLE | DiscordRegexNames.MENTION_USER;
    }
    export interface MentionChannelMatch extends MentionableMatch {
        species: DiscordRegexNames.MENTION_CHANNEL;
    }
    export interface MentionRoleMatch extends MentionableMatch {
        species: DiscordRegexNames.MENTION_ROLE;
    }
    export interface MentionUserMatch extends MentionableMatch {
        mentionType: string;
        species: DiscordRegexNames.MENTION_USER;
    }
    export interface TextMatch extends DiscordRegexMatch {
        text: string;
        species: DiscordRegexNames.TEXT_BOLD | DiscordRegexNames.TEXT_CODEBLOCK | DiscordRegexNames.TEXT_CODESTRING | DiscordRegexNames.TEXT_ITALICS | DiscordRegexNames.TEXT_SNOWFLAKE | DiscordRegexNames.TEXT_SPOILER | DiscordRegexNames.TEXT_STRIKE | DiscordRegexNames.TEXT_UNDERLINE | DiscordRegexNames.TEXT_URL;
    }
    export interface TextCodeblockMatch extends TextMatch {
        language: string;
        species: DiscordRegexNames.TEXT_CODEBLOCK;
    }
    export interface TextBoldMatch extends TextMatch {
        species: DiscordRegexNames.TEXT_BOLD;
    }
    export interface TextCodestringMatch extends TextMatch {
        species: DiscordRegexNames.TEXT_CODESTRING;
    }
    export interface TextItalicsMatch extends TextMatch {
        species: DiscordRegexNames.TEXT_ITALICS;
    }
    export interface TextSnowflakeMatch extends TextMatch {
        species: DiscordRegexNames.TEXT_SNOWFLAKE;
    }
    export interface TextSpoilerMatch extends TextMatch {
        species: DiscordRegexNames.TEXT_SPOILER;
    }
    export interface TextStrikeMatch extends TextMatch {
        species: DiscordRegexNames.TEXT_STRIKE;
    }
    export interface TextUnderlineMatch extends TextMatch {
        species: DiscordRegexNames.TEXT_UNDERLINE;
    }
    export interface TextUrlMatch extends TextMatch {
        species: DiscordRegexNames.TEXT_URL;
    }
    class MatchInner {
        raw: string;
        static: typeof MatchInner;
        constructor(raw: string);
        emoji(): DiscordRegexPayload<EmojiMatch>;
        jumpChannel(): DiscordRegexPayload<JumpChannelMatch>;
        jumpChannelMessage(): DiscordRegexPayload<JumpChannelMessageMatch>;
        mentionChannel(): DiscordRegexPayload<MentionChannelMatch>;
        mentionRole(): DiscordRegexPayload<MentionRoleMatch>;
        mentionUser(): DiscordRegexPayload<MentionUserMatch>;
        codeblock(): DiscordRegexPayload<TextCodeblockMatch>;
        bold(): DiscordRegexPayload<TextBoldMatch>;
        codestring(): DiscordRegexPayload<TextCodestringMatch>;
        italics(): DiscordRegexPayload<TextItalicsMatch>;
        snowflake(): DiscordRegexPayload<TextSnowflakeMatch>;
        spoiler(): DiscordRegexPayload<TextSpoilerMatch>;
        strike(): DiscordRegexPayload<TextStrikeMatch>;
        underline(): DiscordRegexPayload<TextUnderlineMatch>;
        url(): DiscordRegexPayload<TextUrlMatch>;
        match<T extends DiscordRegexMatch>(type: DiscordRegexNames, onlyFirst?: boolean): DiscordRegexPayload<T>;
    }
    export class Match extends MatchInner {
        static bold(raw: string): DiscordRegexPayload<TextBoldMatch>;
        static codeblock(raw: string): DiscordRegexPayload<TextCodeblockMatch>;
        static codestring(raw: string): DiscordRegexPayload<TextCodestringMatch>;
        static emoji(raw: string): DiscordRegexPayload<EmojiMatch>;
        static italics(raw: string): DiscordRegexPayload<TextItalicsMatch>;
        static jumpChannel(raw: string): DiscordRegexPayload<JumpChannelMatch>;
        static jumpChannelMessage(raw: string): DiscordRegexPayload<JumpChannelMessageMatch>;
        static match(raw: string, what: DiscordRegexNames, onlyFirst?: boolean): DiscordRegexPayload<DiscordRegexMatch>;
        static mentionChannel(raw: string): DiscordRegexPayload<MentionChannelMatch>;
        static mentionRole(raw: string): DiscordRegexPayload<MentionRoleMatch>;
        static mentionUser(raw: string): DiscordRegexPayload<MentionUserMatch>;
        static snowflake(raw: string): DiscordRegexPayload<TextSnowflakeMatch>;
        static spoiler(raw: string): DiscordRegexPayload<TextSpoilerMatch>;
        static strike(raw: string): DiscordRegexPayload<TextStrikeMatch>;
        static underline(raw: string): DiscordRegexPayload<TextUnderlineMatch>;
        static url(raw: string): DiscordRegexPayload<TextUrlMatch>;
    }
    export {};
}
