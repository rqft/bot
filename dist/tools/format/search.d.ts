import { Context } from "detritus-client/lib/command";
import { InteractionAutoCompleteContext, InteractionContext } from "detritus-client/lib/interaction";
import { Message } from "detritus-client/lib/structures";
import { APIs } from "pariah";
import { YoutubeSearch } from "../api";
export declare module Search {
    const youtubeInstance: YoutubeSearch.API;
    interface SearchArgs {
        query: string;
    }
    function youtube(context: Context | InteractionContext, args: SearchArgs): Promise<Message | null>;
    function image(context: Context | InteractionContext, args: SearchArgs): Promise<Message | null>;
    function web(context: Context | InteractionContext, args: SearchArgs): Promise<Message | null>;
    const DictionaryInstance: APIs.Dictionary.API;
    function define(context: Context | InteractionContext, args: SearchArgs): Promise<Message | null>;
    function definitions(context: InteractionAutoCompleteContext): Promise<unknown>;
    const UrbanInstance: APIs.Urban.API;
    function urban(context: Context | InteractionContext, args: SearchArgs): Promise<Message | null>;
    function fixUrbanLinks(data: string): string;
}
