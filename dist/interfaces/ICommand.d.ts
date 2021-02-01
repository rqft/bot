import { Message, PermissionResolvable } from "discord.js";
export interface ICommand {
    name: string;
    description?: string;
    aliases?: string[];
    usage?: string;
    restrictions?: {
        ownerOnly?: boolean;
        guildOnly?: boolean;
        permissions?: PermissionResolvable[];
    };
    usesArgs?: boolean;
    run: (message: Message, args: string[]) => Promise<any>;
}
