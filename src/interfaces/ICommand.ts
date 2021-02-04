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
    serverOwnerOnly?: boolean;
  };
  usesArgs?: boolean;
  run: (message: Message, args: string[]) => Promise<any>;
}
export interface ITestCommand {
  name: string;
  description: string;
  aliases: string | string[];
  args: {
    count: number;
    usage: ITestArgument[];
  };
}
export function parseArgument(arg: ITestArgument) {
  const reqL = arg.required ? "<" : "[";
  const reqR = arg.required ? ">" : "]";
  return `${reqL}${arg.name}: ${arg.type}${reqR}`;
}
export function makeCommandUsage(
  usedPrefix: string,
  command: ITestCommand,
  args: ITestArgument[]
) {
  return `${usedPrefix}${command.name} ${args
    .map((e) => parseArgument(e))
    .join(" ")}`;
}
export interface ITestArgument {
  name: string;
  required: boolean;
  type: ArgumentType;
}
export type ArgumentType =
  | "text"
  | "string"
  | "integer"
  | "User"
  | "GuildMember"
  | "Snowflake"
  | "Guild"
  | "TextChannel"
  | "custom"
  | "VoiceChannel"
  | "Emoji"
  | "Message";
