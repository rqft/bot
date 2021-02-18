import Discord from "discord.js";
import { ICommand } from "./interfaces/ICommand";
import "./logging-test";
export declare const client: Discord.Client;
export declare const commands: Discord.Collection<any, ICommand>;
export declare const commandFiles: string[];
export declare function makeServerSlashCommand(id: string | undefined, data: object, response: object): Promise<void>;
