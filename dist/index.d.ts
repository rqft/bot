import Discord from "discord.js";
import { ICommand } from "./interfaces/ICommand";
export declare const client: Discord.Client;
export declare const commands: Discord.Collection<any, ICommand>;
export declare const commandFiles: string[];
