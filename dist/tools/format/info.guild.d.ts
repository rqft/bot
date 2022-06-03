import { Context } from "detritus-client/lib/command";
import { InteractionContext } from "detritus-client/lib/interaction";
import { Guild, Message } from "detritus-client/lib/structures";
export interface GuildArgs {
    guild: Guild | null;
}
export declare function guild(context: Context | InteractionContext, args: GuildArgs): Promise<Message | null>;
