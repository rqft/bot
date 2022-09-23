import { Command, CommandClient } from "detritus-client";
export interface CommandOptionsExtra extends Command.CommandOptions {
    metadata: CommandMetadata;
}
export declare enum CommandType {
    MISC = "Miscellaneous"
}
export interface CommandMetadata {
    category: CommandType;
    description: string;
    examples?: Array<string>;
    id?: string;
    nsfw?: boolean;
    usage: string;
}
export declare const DefaultOptions: Partial<CommandOptionsExtra>;
export declare class BaseCommand<T> extends Command.Command<T> {
    metadata: CommandMetadata;
    constructor(client: CommandClient, options: CommandOptionsExtra);
}
