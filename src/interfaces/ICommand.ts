import { Message, PermissionString } from "discord.js";

export interface ICommand {
  name: string;
  aliases?: string[];
  restrictions?: {
    permissions: PermissionString[];
    botPermissions: PermissionString[];
    level?: number;
    serverOwnerOnly?: boolean;
    ownerOnly?: boolean;
  };
  args: {
    enabled: boolean;
    usage: string;
  };
  run(message: Message, args?: string[]): Promise<void | Message>;
}
