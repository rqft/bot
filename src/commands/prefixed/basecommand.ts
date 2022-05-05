import { CommandClient } from "detritus-client";
import {
  Command,
  CommandOptions,
  CommandRatelimitInfo,
  CommandRatelimitMetadata,
  Context,
  ParsedArgs,
  ParsedErrors,
} from "detritus-client/lib/command";
import { CommandRatelimitTypes } from "detritus-client/lib/constants";
import { CommandMetadata } from "../../tools/command-metadata";
import { Err } from "../../tools/error";
import { Markdown } from "../../tools/markdown";
import { editOrReply, permissionsErrorList } from "../../tools/tools";

export interface CommandOptionsExtra extends CommandOptions {
  metadata: CommandMetadata;
}

export const DefaultOptions: Partial<CommandOptionsExtra> = {
  triggerTypingAfter: 1000,
  ratelimits: [
    { duration: 2500, limit: 3, type: CommandRatelimitTypes.USER },
    { duration: 5000, limit: 10, type: CommandRatelimitTypes.CHANNEL },
    { duration: 10000, limit: 20, type: CommandRatelimitTypes.GUILD },
  ],
};
export class BaseCommand<T = ParsedArgs> extends Command<T> {
  readonly createdAtUnix: number = Date.now();
  readonly createdAt: Date = new Date(this.createdAtUnix);
  protected expensive: boolean = false;
  public metadata: CommandMetadata;
  constructor(client: CommandClient, options: CommandOptionsExtra) {
    super(client, Object.assign(DefaultOptions, options));
    this.metadata = options.metadata;
  }

  private get commandUsage() {
    const metadata = this.metadata;
    if (typeof metadata.usage === "string") {
      return `${this.fullName} ${metadata.usage}`.trim();
    }
    return this.fullName;
  }

  async onBeforeRun(context: Context, _args: unknown) {
    await editOrReply(
      context,
      "ok, processing" + (this.expensive ? " (this may take a while)" : "")
    );
    return true;
  }

  async onCancelRun(context: Context, _args: unknown) {
    return await editOrReply(
      context,
      Markdown.Format.codeblock(this.commandUsage).toString()
    );
  }

  async onPermissionsFail(context: Context, failed: Array<bigint>) {
    const permissions = permissionsErrorList(failed);

    return await editOrReply(
      context,
      `hey you need ${permissions.join(", ")} to run this`
    );
  }

  async onPermissionsFailClient(context: Context, failed: Array<bigint>) {
    const permissions = permissionsErrorList(failed);

    return await editOrReply(
      context,
      `hey i need ${permissions.join(", ")} to run this`
    );
  }

  async onRatelimit(
    context: Context,
    ratelimits: Array<CommandRatelimitInfo>,
    _metadata: CommandRatelimitMetadata
  ) {
    if (!context.canReply) {
      return;
    }

    let replied: boolean = false;

    for (const { item, ratelimit, remaining } of ratelimits) {
      if (remaining < 1000 || replied || item.replied) {
        // skip replying
        item.replied = true;
        continue;
      }

      replied = item.replied = true;

      let noun: string = "you funny people are";
      switch (ratelimit.type) {
        case CommandRatelimitTypes.CHANNEL: {
          noun = "this channel is";
          break;
        }

        case CommandRatelimitTypes.GUILD: {
          noun = "this server is";
          break;
        }

        case CommandRatelimitTypes.USER: {
          noun = "you are";
          break;
        }
      }

      let content: string = `${noun} going really fast please slow down :( (wait ${Markdown.toTimeString(
        remaining,
        undefined,
        false
      )})`;

      return await editOrReply(context, content);
    }
  }

  async onRunError(context: Context, _args: T, error: Error | Err) {
    return await editOrReply(context, Err.from(error).toThrown());
  }

  async onTypeError(context: Context, _args: T, errors: ParsedErrors) {
    const description: Array<string> = [
      "hey u have some wrong inputs, might want to fix them :D",
      "\n",
    ];

    const store: Record<string, string> = {};
    for (const key in errors) {
      const value = errors[key];
      const message = value.message;

      if (message in store) {
        description.push(`${key}: same as ${store[message]}`);
      } else {
        description.push(`${key}: ${message}`);
      }

      store[message] = key;
    }

    return await editOrReply(context, description.join("\n"));
  }
}
