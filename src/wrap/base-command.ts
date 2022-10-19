import { Command, CommandClient } from 'detritus-client/lib';
import { CommandRatelimitTypes } from 'detritus-client/lib/constants';
import { respond } from '../tools/util';
import { Warning } from '../tools/warning';

export interface CommandOptionsExtra extends Command.CommandOptions {
  metadata: CommandMetadata;
}

export enum CommandType {
  MISC = 'Miscellaneous',
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
  constructor(
    client: CommandClient,
    options: CommandOptionsExtra,
    public syntax: string
  ) {
    super(client, Object.assign({}, DefaultOptions, options));
    this.metadata = options.metadata;
  }

  onTypeError(context: Command.Context, _: T, errors: Record<string, Error>) {
    const text = [];
    for (const key in errors) {
      const value = errors[key];

      if (value === undefined) {
        continue;
      }
      const { message } = value;

      let head = this.syntax;
      head +=
        '\n' +
        ' '.repeat(this.syntax.indexOf('[' + key + ']') + 1) +
        '^' +
        '-'.repeat(key.length - 1) +
        ' ' +
        message;

      text.push(head);
    }

    if (text.length) {
      return respond.fmt(context, '```lua\n{text}\n```', {
        text: text.join('\n'),
      });
    }
  }

  onError(context: Command.Context, _args: unknown, error: Error) {
    if (error instanceof Warning) {
      return respond.fmt(context, ':warning: `{content}`', {
        content: error.content,
      });
    }
    return respond.fmt(context, ':x: `{message}`', { message: error.stack });
  }

  onRunError(context: Command.Context, args: T, error: Error) {
    return this.onError(context, args, error);
  }
}
