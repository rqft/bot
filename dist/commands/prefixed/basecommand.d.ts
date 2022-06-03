import { CommandClient } from "detritus-client";
import { Command, CommandOptions, CommandRatelimitInfo, Context, ParsedArgs, ParsedErrors } from "detritus-client/lib/command";
import { CommandMetadata } from "../../tools/command-metadata";
import { Err } from "../../tools/error";
export interface CommandOptionsExtra extends CommandOptions {
    metadata: CommandMetadata;
}
export declare const DefaultOptions: Partial<CommandOptionsExtra>;
export declare class BaseCommand<T = ParsedArgs> extends Command<T> {
    protected use: Date;
    protected expensive: boolean;
    metadata: CommandMetadata;
    constructor(client: CommandClient, options: CommandOptionsExtra);
    private get commandUsage();
    onBefore(): Promise<boolean>;
    onBeforeRun(context: Context): Promise<boolean>;
    onCancelRun(context: Context): Promise<unknown>;
    onPermissionsFail(context: Context, failed: Array<bigint>): Promise<unknown>;
    onPermissionsFailClient(context: Context, failed: Array<bigint>): Promise<unknown>;
    onRatelimit(context: Context, ratelimits: Array<CommandRatelimitInfo>): Promise<unknown>;
    onRunError(context: Context, _args: T, error: Error | Err): Promise<void>;
    onError(context: Context, _args: T, error: Error | Err): Promise<void>;
    onTypeError(context: Context, _args: T, errors: ParsedErrors): Promise<unknown>;
}
