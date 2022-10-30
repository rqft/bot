import type { CommandClient } from 'detritus-client/lib';
import { Command } from 'detritus-client/lib';
import { CommandRatelimitTypes } from 'detritus-client/lib/constants';
import type { Message } from 'detritus-client/lib/structures';
import { respond } from '../tools/util';
import { Warning } from '../tools/warning';
import type { ArgsFactory, Values } from './parser';

export interface CommandOptionsExtra extends Command.CommandOptions {
  metadata: CommandMetadata;
}

export enum CommandType {
  DualImage = 'dual-image',
  Image = 'image',
  Miscellaneous = 'miscellaneous',
  Search = 'search',
  Audio = 'audio',
}

export interface CommandMetadata {
  description: string;
  examples: Array<string>;
  id?: string;
  nsfw?: boolean;
  type: CommandType | `${CommandType}`;
}

export const DefaultOptions: Partial<CommandOptionsExtra> = {
  triggerTypingAfter: 1000,
  ratelimits: [
    { duration: 2500, limit: 3, type: CommandRatelimitTypes.USER },
    { duration: 5000, limit: 10, type: CommandRatelimitTypes.CHANNEL },
    { duration: 10000, limit: 20, type: CommandRatelimitTypes.GUILD },
  ],
};

export const DualImageExamples: Array<string> = [
  '504698587221852172 533757461706964993',
  'arcs @insyri#7314',
  '@Arcs#4587 https://thowoee.me/finland.gif',
];

export const ImageExamples: Array<string> = [
  '504698587221852172',
  '@Arcs#4587',
  'arcs',
  'https://thowoee.me/finland.gif',
];

export function img(
  description: string,
  apply?: Array<string>
): CommandMetadata {
  return {
    type: 'image',
    description,
    examples: ImageExamples.map((x, i) => (apply ? x + ' ' + apply[i] : x)),
  };
}

export function dimg(description: string): CommandMetadata {
  return { type: 'dual-image', description, examples: DualImageExamples };
}

export class BaseCommand<
  T extends Values<ArgsFactory<string, Record<never, unknown>>, string>
> extends Command.Command<T> {
  public metadata: CommandMetadata;
  constructor(
    client: CommandClient,
    options: CommandOptionsExtra,
    public syntax: string
  ) {
    super(client, Object.assign({}, DefaultOptions, options));
    this.metadata = options.metadata;
  }

  onTypeError(
    context: Command.Context,
    _: T,
    errors: Record<string, Error>
  ): Promise<Message> | void {
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

  onError(
    context: Command.Context,
    _args: unknown,
    error: Error | null
  ): Promise<Message> | void {
    if (error === null) {
      return;
    }

    if (error instanceof Warning) {
      return respond.fmt(context, ':warning: `{content}`', {
        content: error.content,
      });
    }
    return respond.fmt(context, ':x: `{message}`', { message: error.stack });
  }

  onRunError(
    context: Command.Context,
    args: T,
    error: Error | null
  ): Promise<Message> | void {
    return this.onError(context, args, error);
  }
}
