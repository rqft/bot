import { ApplicationCommandOptionTypes, ApplicationCommandTypes } from "detritus-client/lib/constants";
import { InteractionCommandOption, ParsedArgs } from "detritus-client/lib/interaction";
import { BaseInteraction } from "../baseinteraction";
export declare class BaseSlashCommand<T = ParsedArgs> extends BaseInteraction<T> {
    error: string;
    permissionsIgnoreClientOwner: boolean;
    type: ApplicationCommandTypes;
    triggerLoadingAfter: number;
}
export declare class BaseSlashSubCommand<T = ParsedArgs> extends InteractionCommandOption<T> {
    error: string;
    type: ApplicationCommandOptionTypes;
}
export declare class BaseSlashCommandGroup<T = ParsedArgs> extends InteractionCommandOption<T> {
    error: string;
    type: ApplicationCommandOptionTypes;
}
