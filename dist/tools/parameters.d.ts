import { Command, Interaction, Structures } from "detritus-client";
import { Context } from "detritus-client/lib/command";
import { ChannelTypes, ImageFormats } from "detritus-client/lib/constants";
import { InteractionAutoCompleteContext, InteractionContext } from "detritus-client/lib/interaction";
export declare module Parameters {
    function array<T>(use: (value: string) => T): (value: string) => Array<T>;
    function codeblock(value: string): {
        language?: string;
        text: string;
    };
    interface NumberOptions {
        max?: number;
        min?: number;
    }
    function number(options?: NumberOptions): (valueStrOrNum: number | string) => number;
    function percentage(value: number | string): number;
    function snowflake(value: string): string;
    function url(value: string): URL;
    interface EmojiOptions {
        unicode?: boolean;
    }
    function emoji(options?: EmojiOptions): (value: string) => string;
    enum EmojiType {
        TWEMOJI = "twemoji",
        CUSTOM = "custom"
    }
    interface EmojiUrl {
        url: string;
        type: EmojiType;
        id?: string;
        raw: string;
    }
    function emojiUrl(value: string): EmojiUrl | null;
    function user(value: string, _context: Context | InteractionContext): Promise<Structures.User | undefined>;
    interface ChannelOptions {
        inGuild?: boolean;
        types?: Array<ChannelTypes>;
    }
    function channel(options?: ChannelOptions): (value: string, context: Command.Context | Interaction.InteractionContext) => Structures.Channel | null;
    function channels(options?: ChannelOptions): (value: string, context: Command.Context | Interaction.InteractionContext) => Array<Structures.Channel>;
    function role(value: string, context: Context | InteractionContext): Structures.Role | null;
    function guild(value: string, context: Context | InteractionContext): Promise<Structures.Guild | null>;
    const QuotesAll: {
        '"': string;
        "'": string;
        "\u2019": string;
        "\u201A": string;
        "\u201C": string;
        "\u201E": string;
        "\u300C": string;
        "\u300E": string;
        "\u301D": string;
        "\uFE41": string;
        "\uFE43": string;
        "\uFF02": string;
        "\uFF62": string;
        "\u00AB": string;
        "\u300A": string;
        "\u3008": string;
    };
    const Quotes: {
        END: string[];
        START: string[];
    };
    function stringArguments(value: string): Array<string>;
    function imageUrl(as?: ImageFormats): (value: string, context: Context | InteractionContext) => Promise<string | null>;
    module Default {
        function imageUrl(as?: ImageFormats): (context: Context | InteractionContext) => Promise<string | null>;
        function applications(context: Command.Context | Interaction.InteractionContext): Array<Structures.Application>;
        function author(context: Command.Context | Interaction.InteractionContext): Structures.User;
        function channel(context: Command.Context | Interaction.InteractionContext): Structures.Channel | null;
        function defaultRole(context: Command.Context | Interaction.InteractionContext): Structures.Role | null;
        function guild(context: Command.Context | Interaction.InteractionContext): Structures.Guild | null;
        function members(context: Command.Context | Interaction.InteractionContext): Promise<Array<Structures.Member | Structures.User>>;
        function noEmbed(context: Command.Context | Interaction.InteractionContext): boolean;
        function safe(context: Command.Context | Interaction.InteractionContext): boolean;
    }
    module Autocomplete {
        function choices<T>(items: Array<T>): (context: InteractionAutoCompleteContext) => Promise<unknown>;
        function guilds(context: InteractionAutoCompleteContext): Promise<unknown>;
    }
}
