import { ApplicationCommandTypes } from "detritus-client/lib/constants";
import { Member, User } from "detritus-client/lib/structures";
import { BaseInteraction } from "../../baseinteraction";
export interface ContextMenuUserArgs {
    member?: Member;
    user: User;
}
export declare class BaseContextMenuUserCommand extends BaseInteraction<ContextMenuUserArgs> {
    error: string;
    type: ApplicationCommandTypes;
    permissionsIgnoreClientOwner: boolean;
    triggerLoadingAfter: number;
    triggerLoadingAsEphemeral: boolean;
}
