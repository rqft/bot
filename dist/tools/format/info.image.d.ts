import { Context } from "detritus-client/lib/command";
import { InteractionContext } from "detritus-client/lib/interaction";
import { Basic } from "./basic";
export declare function image(context: Context | InteractionContext, args: Basic.ImageArgs): Promise<import("detritus-client/lib/structures").Message | null>;
