export enum CommandType {
  IMAGE = "image",
  TOOLS = "tools",
  FUN = "fun",
}
export interface CommandMetadata {
  category: CommandType;
  description: string;
  examples?: Array<string>;
  id?: string;
  nsfw?: boolean;
  usage: string;
}
export function Metadata(
  type: CommandType,
  description: string,
  usage = "",
  examples: Array<string> = []
): CommandMetadata {
  return {
    category: type,
    description,
    examples,
    usage,
  };
}
export function ImageMetadata(
  description: string,
  usage = "",
  examples: Array<string> = []
) {
  return Metadata(CommandType.IMAGE, description, usage, examples);
}
export function ToolsMetadata(
  description: string,
  usage = "",
  examples: Array<string> = []
) {
  return Metadata(CommandType.TOOLS, description, usage, examples);
}
export function FunMetadata(
  description: string,
  usage = "",
  examples: Array<string> = []
) {
  return Metadata(CommandType.FUN, description, usage, examples);
}
