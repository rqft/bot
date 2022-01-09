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
import { expandMs } from "../../functions/tools";
export class BaseCommand extends Command {
  constructor(client: CommandClient, options: CommandOptions) {
    super(
      client,
      Object.assign(
        {
          triggerTypingAfter: 1000,
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
  run(context: Context, _args: ParsedArgs = {}): Promise<void | Message> {
    return context.reply("❌ No functionality set for this command");
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
