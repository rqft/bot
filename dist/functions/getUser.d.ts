import { Message, User } from "discord.js";
export declare function getUser(message: Message, args: string[], useJoin?: boolean, argument?: number): Promise<User | null>;
