import { Guild, Message } from "discord.js";
export declare function getGuild(message: Message, args: string[], useJoin?: boolean): Promise<Guild | null | undefined>;
