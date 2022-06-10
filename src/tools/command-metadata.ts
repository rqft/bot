export enum CommandType {
  IMAGE = "image",
  TOOLS = "tools",
  FUN = "fun",
  AUDIO = "audio",
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
  usage = "<target: Image>",
  examples: Array<string> = [
    "insyri",
    "insyri#7314",
    "533757461706964993",
    "https://cdn.clancy.lol/turkey.png",
  ]
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
export function AudioMetadata(
  description: string,
  usage = "<target: Audio",
  examples: Array<string> = ["test.mp3", "https://cdn.rqft.space/tiny.wav"]
) {
  return Metadata(CommandType.AUDIO, description, usage, examples);
}
