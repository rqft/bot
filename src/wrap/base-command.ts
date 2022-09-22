import { Command, CommandClient } from "detritus-client";
import { CommandRatelimitTypes } from "detritus-client/lib/constants";

export interface CommandOptionsExtra extends Command.CommandOptions {
  metadata: CommandMetadata;
}

export enum CommandType {
  MISC = "Miscellaneous",
}

export interface CommandMetadata {
  category: CommandType;
  description: string;
  examples?: Array<string>;
  id?: string;
  nsfw?: boolean;
  usage: string;
}

export const DefaultOptions: Partial<CommandOptionsExtra> = {
  triggerTypingAfter: 1000,
  ratelimits: [
    { duration: 2500, limit: 3, type: CommandRatelimitTypes.USER },
    { duration: 5000, limit: 10, type: CommandRatelimitTypes.CHANNEL },
    { duration: 10000, limit: 20, type: CommandRatelimitTypes.GUILD },
  ],
};

export class BaseCommand<T> extends Command.Command<T> {
  public metadata: CommandMetadata;
  constructor(client: CommandClient, options: CommandOptionsExtra) {
    super(client, Object.assign({}, DefaultOptions, options));
    this.metadata = options.metadata;
  }
}
