import Discord from "discord.js";
import { ICommand } from "./interfaces/ICommand";
import "./logging-test";
export declare const client: Discord.Client;
export declare const commands: Discord.Collection<any, ICommand>;
export declare const commandFiles: string[];
export declare function getLatency(cb: (...any: any[]) => Promise<any>): Promise<number>;
