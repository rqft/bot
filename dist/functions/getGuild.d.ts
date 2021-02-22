import { Guild, Message } from "discord.js";
export declare function getGuild(message: Message, args: string[], useJoin?: boolean, argument?: number): Promise<Guild | null | undefined>;
