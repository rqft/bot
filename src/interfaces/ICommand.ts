import { Message, PermissionString } from "discord.js";
export interface IArgument {
  name: string;
  required: boolean;
  type: string;
}
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
  args: IArgument[];
  run(message: Message, args: string[]): Promise<void | Message>;
}
