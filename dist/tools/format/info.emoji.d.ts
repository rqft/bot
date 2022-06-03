import { Context } from "detritus-client/lib/command";
import { InteractionContext } from "detritus-client/lib/interaction";
import { Parameters } from "../parameters";
export interface EmojiArgs {
    emoji: Parameters.EmojiUrl;
}
export declare function emoji(context: Context | InteractionContext, args: EmojiArgs): Promise<import("detritus-client/lib/structures").Message | null>;
