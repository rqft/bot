import { Message, PermissionString } from "discord.js";

export interface ICommand {
  name: string;
  description?: string;
  aliases?: string[];
  usage?: string;
  cooldown?: number;
  restrictions?: {
    ownerOnly?: boolean;
    guildOnly?: boolean;
    permissions?: PermissionString[];
    serverOwnerOnly?: boolean;
  };
  usesArgs?: boolean;
  run: (message: Message, args: string[]) => Promise<Message | void>;
}
