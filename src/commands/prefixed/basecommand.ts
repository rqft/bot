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
import { expandMs, generateUsage, removeSecrets } from "../../functions/tools";

export class BaseCommand extends Command {
  constructor(client: CommandClient, options: CommandOptions) {
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
  }

  run(
    context: Context,
    _args: ParsedArgs = {}
  ): Promise<void | Message | null> {
    return context.reply("❌ No functionality set for this command");
  }
  onError(context: Context, _args: ParsedArgs = {}, error: Err | Error) {
    console.log(error);

    return context.editOrReply(removeSecrets(Err.from(error).toThrown()));
  }
  onRunError(context: Context, _args: ParsedArgs = {}, error: Err | Error) {
    console.log(error);
    return context.editOrReply(removeSecrets(Err.from(error).toThrown()));
  }
  onTypeError(
    context: Context,
    _args: ParsedArgs,
    errors: { [key: string]: Err }
  ) {
    const embed = createBrandEmbed(Brand.VYBOSE, context, false);

    const store: { [key: string]: string } = {};

    const description: Array<string> = ["Invalid Arguments" + "\n"];
    for (let key in errors) {
      const message = errors[key]!.message;
      if (message in store) {
        description.push(`❌ **${key}**: Same error as **${store[message]}**`);
      } else {
        description.push(`❌ **${key}**: ${message}`);
      }
      store[message] = key;
    }

    embed.setDescription(description.join("\n"));

    embed.addField(`Command Usage`, Markup.codeblock(generateUsage(this)));
    return context.editOrReply({ embed });
  }

  onRatelimit(
    context: Context,
    ratelimits: Array<CommandRatelimitInfo>,
    metadata: CommandRatelimitMetadata
  ) {
    const messages: Array<string> = [];
    for (const { ratelimit, remaining } of ratelimits) {
      let noun: string = "You are";
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
