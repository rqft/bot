import { ApplicationCommandTypes } from "detritus-client/lib/constants";
import { Message } from "detritus-client/lib/structures";
import { BaseInteraction } from "../../baseinteraction";
export interface ContextMenuMessageArgs {
    message: Message;
}
export declare class BaseContextMenuMessageCommand extends BaseInteraction<ContextMenuMessageArgs> {
    error: string;
    type: ApplicationCommandTypes;
    permissionsIgnoreClientOwner: boolean;
    triggerLoadingAfter: number;
    triggerLoadingAsEphemeral: boolean;
}
