import { Message, PermissionString } from "discord.js";

export interface ICommand {
  name: string;
  description?: string;
  aliases?: string[];
  usage?: string;
  restrictions?: {
    ownerOnly?: boolean;
    guildOnly?: boolean;
    permissions?: PermissionString[];
  };
  usesArgs?: boolean;
  run: (message: Message, args: string[]) => Promise<any>;
}
