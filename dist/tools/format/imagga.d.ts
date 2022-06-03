import { Context } from "detritus-client/lib/command";
import { InteractionContext } from "detritus-client/lib/interaction";
import { Message } from "detritus-client/lib/structures";
import { APIs } from "pariah";
import { Basic } from "./basic";
export declare module Imagga {
    function tags(context: Context | InteractionContext, args: Basic.ImageArgs): Promise<Message | null>;
    function colorsTable(colors: Array<APIs.Imagga.Color>): string;
    function colors(context: Context | InteractionContext, args: Basic.ImageArgs): Promise<Message | null>;
    function categories(context: Context | InteractionContext, args: Basic.ImageArgs): Promise<Message | null>;
    function readText(context: Context | InteractionContext, args: Basic.ImageArgs): Promise<Message | null>;
}
