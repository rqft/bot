import { CommandClient } from "detritus-client/lib";
import {
  Command,
  CommandOptions,
  CommandRatelimitInfo,
  CommandRatelimitMetadata,
  Context,
  ParsedArgs,
} from "detritus-client/lib/command";
import { Message } from "detritus-client/lib/structures";
import { Markup } from "detritus-client/lib/utils";
import { GIF, Image } from "imagescript";
import { Brand } from "../../enums/brands";
import { createBrandEmbed } from "../../functions/embed";
import { Err } from "../../functions/error";
import { editOrReply, expandMs, removeSecrets } from "../../functions/tools";
export enum CommandTypes {
  IMAGE = "image",
  FUN = "fun",
  UTILITY = "utility",
  TOOLS = "tools",
  OTHER = "other",
}
export interface CommandMetadata {
  usage: string;
  examples: Array<string>;
  nsfw?: boolean;
  type?: CommandTypes;
  description: string;
}
export interface CommandOptionsExtra extends CommandOptions {
  metadata: CommandMetadata;
}
export class BaseCommand extends Command {
  public metadata: CommandMetadata;
  constructor(client: CommandClient, options: CommandOptionsExtra) {
    super(
      client,
      Object.assign(
        {
          triggerTypingAfter: 0,
          ratelimits: [
            { duration: 2500, limit: 3, type: "user" },
            { duration: 5000, limit: 10, type: "channel" },
            { duration: 10000, limit: 20, type: "guild" },
          ],
        },
        options
      )
    );
    this.metadata = Object.assign<CommandMetadata, CommandMetadata>(
      {
        usage: "",
        examples: [],
        nsfw: false,
        type: CommandTypes.OTHER,
        description: "",
      },
      options.metadata
    );
  }

  run(
    _context: Context,
    _args: ParsedArgs = {}
  ): Promise<void | Message | null> {
    throw new Err("Command not implemented", { status: 501 });
  }
  onError(context: Context, _args: ParsedArgs = {}, error: Err | Error) {
    console.log(error);

    return editOrReply(context, removeSecrets(Err.from(error).toThrown()));
  }
  onRunError(context: Context, _args: ParsedArgs = {}, error: Err | Error) {
    console.log(error);
    return editOrReply(context, removeSecrets(Err.from(error).toThrown()));
  }
  onTypeError(
    context: Context,
    _args: ParsedArgs,
    errors: Record<string, Error>
  ) {
    const embed = createBrandEmbed(Brand.VYBOSE, context, false);

    const store: Record<string, string> = {};

    const description: Array<string> = ["Invalid Arguments" + "\n"];
    for (const key in errors) {
      const message = errors[key]!.message;
      if (message in store) {
        description.push(`❌ **${key}**: Same error as **${store[message]}**`);
      } else {
        description.push(`❌ **${key}**: ${message}`);
      }
      store[message] = key;
    }

    embed.setDescription(description.join("\n"));

    embed.addField("Command Usage", Markup.codeblock(this.metadata.usage));
    return editOrReply(context, { embed });
  }

  onRatelimit(
    context: Context,
    ratelimits: Array<CommandRatelimitInfo>,
    metadata: CommandRatelimitMetadata
  ) {
    const messages: Array<string> = [];
    for (const { ratelimit, remaining } of ratelimits) {
      let noun = "You are";
      switch (ratelimit.type) {
        case "channel":
          noun = "This channel is";
          break;
        case "guild":
          noun = "This guild is";
          break;
        case "user":
          noun = "You are";
          break;
      }
      let content: string;
      if (metadata.global) {
        content = `${noun} using commands too fast, wait ${expandMs(
          remaining
        )}`;
      } else {
        content = `${noun} using ${this.fullName} too fast, wait ${expandMs(
          remaining
        )}`;
      }
      messages.push(`❌ ${content}`);
    }
    if (messages.length) return context.reply(messages.join("\n"));
  }
}
export interface ImageArgs {
  image: Buffer;
}
export interface ImageUrlArgs {
  image: string;
}
export interface ImageScriptAnimationArgs {
  animation: GIF;
}
export interface ImageScriptFrameArgs {
  image: Image;
}
export function Metadata(
  type: CommandTypes,
  description: string,
  usage: string,
  examples: Array<string>
): CommandMetadata {
  return {
    type,
    description,
    usage,
    examples,
  };
}
export function ImageMetadata(
  description: string,
  usage = "<image: Image>",
  examples: Array<string> = ["", "insyri", "533757461706964993"]
) {
  return Metadata(CommandTypes.IMAGE, description, usage, examples);
}
export function ToolsMetadata(
  description: string,
  usage = "",
  examples: Array<string> = []
) {
  return Metadata(CommandTypes.TOOLS, description, usage, examples);
}
export function FunMetadata(
  description: string,
  usage = "",
  examples: Array<string> = []
) {
  return Metadata(CommandTypes.FUN, description, usage, examples);
}
export function UtilityMetadata(
  description: string,
  usage = "",
  examples: Array<string> = []
) {
  return Metadata(CommandTypes.UTILITY, description, usage, examples);
}
