import Discord from "discord.js";
import { Sequelize } from "sequelize";
import { ICommand } from "./interfaces/ICommand";
export declare const client: Discord.Client;
export declare const commands: Discord.Collection<any, ICommand>;
export declare const commandFiles: string[];
export declare const sequelize: Sequelize;
export declare const Tags: import("sequelize/types").ModelCtor<import("sequelize/types").Model<any, any>>;
