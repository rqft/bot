import { Context } from "detritus-client/lib/command";
import { InteractionContext } from "detritus-client/lib/interaction";
import { Member } from "detritus-client/lib/structures";
export declare module Mod {
    interface BanArgs {
        target: Member;
        reason?: string;
        days?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
    }
    function ban(context: Context | InteractionContext, args: BanArgs): Promise<import("detritus-client/lib/structures").Message | null>;
}
