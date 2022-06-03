import { InteractionCommand, InteractionContext, ParsedArgs } from "detritus-client/lib/interaction";
import { BaseSet } from "detritus-utils";
import { Err } from "../../tools/error";
export declare class BaseInteraction<T = ParsedArgs> extends InteractionCommand<T> {
    error: string;
    guildIds: BaseSet<string>;
    global: boolean;
    onBeforeRun(context: InteractionContext): Promise<boolean>;
    onLoadingTrigger(context: InteractionContext): Promise<unknown> | undefined;
    onDmBlocked(context: InteractionContext): Promise<unknown>;
    onCancelRun(context: InteractionContext): Promise<unknown>;
    onPermissionsFailClient(context: InteractionContext, failed: Array<bigint>): Promise<unknown>;
    onPermissionsFail(context: InteractionContext, failed: Array<bigint>): Promise<unknown>;
    onRunError(context: InteractionContext, _args: T, error: Error | Err): Promise<null>;
}
