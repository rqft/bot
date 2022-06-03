import { Context } from "detritus-client/lib/command";
import { InteractionContext } from "detritus-client/lib/interaction";
import { Member, Message, User } from "detritus-client/lib/structures";
export interface UserArgs {
    user: User | Member;
}
export declare function user(context: Context | InteractionContext, args: UserArgs): Promise<Message | null>;
