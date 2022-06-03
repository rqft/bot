import { Context } from "detritus-client/lib/command";
import { InteractionContext } from "detritus-client/lib/interaction";
import { Channel } from "detritus-client/lib/structures";
export interface ChannelArgs {
    channel: Channel;
}
export declare function channel(context: Context | InteractionContext, args: ChannelArgs): Promise<import("detritus-client/lib/structures").Message | null>;
