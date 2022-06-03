import { Context } from "detritus-client/lib/command";
import { InteractionContext } from "detritus-client/lib/interaction";
import { Role } from "detritus-client/lib/structures";
export interface RoleArgs {
    role: Role;
}
export declare function role(context: Context | InteractionContext, args: RoleArgs): Promise<import("detritus-client/lib/structures").Message | null>;
