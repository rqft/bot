import Discord from "discord.js";
import "./logging-test";
export declare const client: Discord.Client;
export declare const commands: Discord.Collection<unknown, unknown>;
export declare const commandFiles: string[];
export declare const enum LoggingEmojis {
    DEPLOYED = "\uD83D\uDCE6",
    DEBUG = "\uD83D\uDC1B",
    ERROR = "\u26D4",
    DISCONNECT = "\uD83D\uDD27",
    WARNING = "\u26A0\uFE0F"
}
