/// <reference types="node" />
import { Command, Interaction, Structures } from "detritus-client";
import { Context, EditOrReply } from "detritus-client/lib/command";
import { ImageFormats } from "detritus-client/lib/constants";
import { InteractionContext } from "detritus-client/lib/interaction";
import { InteractionEditOrRespond, Message } from "detritus-client/lib/structures";
import { Animation, Image } from "imagescript/v2";
import { Data } from "pariah/dist/data";
import { IO } from "wilson-kv";
export declare function editOrReply(context: Context, options: EditOrReply | string): Promise<Message>;
export declare function editOrReply(context: InteractionContext, options: InteractionEditOrRespond | string): Promise<null>;
export declare function editOrReply(context: Context | InteractionContext, options: EditOrReply | InteractionEditOrRespond | string): Promise<Message | null>;
export declare function permissionsErrorList(failed: Array<bigint>): Array<string>;
export declare function isSnowflake(data: string): boolean;
export declare function validateUrl(value: string): boolean;
export declare function toCardinalNumber(number: number): string;
export declare function fetchMemberOrUserById(context: Context | InteractionContext, userId: string, memberOnly?: boolean): Promise<Structures.Member | Structures.User>;
export declare function findMemberByChunk(context: Command.Context | Interaction.InteractionContext, username: string, discriminator?: null | string): Promise<Structures.Member | Structures.User | null>;
export declare function findMemberByChunkText(context: Command.Context | Interaction.InteractionContext, text: string): Promise<Structures.User | Structures.Member | null>;
export declare function findMembersByChunk(context: Command.Context | Interaction.InteractionContext, username: string, discriminator?: null | string): Promise<Array<Structures.Member | Structures.User>>;
export interface FindMemberByUsernameCache {
    values(): IterableIterator<Structures.Member | Structures.User | undefined>;
}
export declare function findMembersByChunkText(context: Command.Context | Interaction.InteractionContext, text: string): Promise<Array<Structures.User | Structures.Member | null>>;
export declare function findMemberByUsername(members: FindMemberByUsernameCache, username: string, discriminator?: null | string): Structures.Member | Structures.User | undefined;
export declare function findMembersByUsername(members: FindMemberByUsernameCache, username: string, discriminator?: null | string): Array<Structures.Member | Structures.User>;
export declare function splitTextToDiscordHandle(text: string): [string, string | null];
export declare function toCodePoint(unicodeSurrogates: string, separator?: string): string;
export declare function toCodePointForTwemoji(unicodeSurrogates: string): string;
export declare function validateUnicodeEmojis(emoji: string): boolean;
export declare function onlyEmoji(emoji: string): Array<string> | false;
export declare function store(value: Buffer | Data<Buffer>, filename: string): Promise<Structures.Attachment>;
export declare const ByteUnits: string[];
export declare const SIByteUnits: string[];
export declare function formatBytes(bytes: number, decimals?: number, noBiBytes?: boolean, short?: boolean): string;
export declare function mergeArrays<T>(...arrays: Array<Array<T>>): Array<T>;
export declare function buildTimestampString(unix: number | Date): string;
export declare function cutArray<T>(data: Array<T>, ...indexes: Array<number>): Array<Array<T>>;
export declare function groupArray<T>(data: Array<T>, size: number): Array<Array<T>>;
export declare function convert(uri: string, format?: ImageFormats): Promise<string>;
export declare function imagescriptOp(data: Image | Animation, callback: IO<Image>): Promise<typeof data>;
export declare function toTitleCase(payload: string): string;
export declare function padCodeBlockFromRows(strings: Array<Array<string>>, options?: {
    join?: string;
    padding?: string;
    padFunc?: (targetLength: number, padString?: string) => string;
}): Array<string>;
export declare function splitToFields(data: string, name: string, maxLength?: number, splitBy?: string): {
    name: typeof name;
    value: string;
    inline: true;
}[];
