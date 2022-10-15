import { Command as Cmd, CommandClient } from "detritus-client/lib";
import { UnicodeEmoji } from "../tools/emoji";
import { BaseCommand } from "./base-command";

import {
  ArgsFactory,
  ArrayOptions,
  ChannelConstructors,
  OptionalOptions,
  Options,
  RemoveSugar,
  Self,
  SyntaxParser,
  Values,
} from "./parser";

export const CommandArgumentBuilders: Self = {
  string(options) {
    return (value) => {
      if (value === undefined || value === "") {
        throw new RangeError("must provide a value");
      }

      if (options) {
        if (options.choices && options.choices.length) {
          if (options.choices.includes(value)) {
            return value;
          }

          throw new RangeError(
            `must be one of [ ${options.choices.join(", ")} ]`
          );
        }

        if (options.maxLength && value.length > options.maxLength) {
          throw new RangeError(
            `must be less than ${options.maxLength} characters`
          );
        }

        if (options.minLength && value.length < options.minLength) {
          throw new RangeError(
            `must be more than ${options.maxLength} characters`
          );
        }
      }

      return value;
    };
  },

  stringOptional(options) {
    return (value, context) => {
      if (value === undefined) {
        value = options?.default;
      }

      if (value) {
        return this.string(options)(value, context);
      }
      return undefined;
    };
  },

  number(options) {
    return (value) => {
      if (value === undefined || value === "") {
        throw new RangeError("must provide a value");
      }

      const float = Number.parseFloat(value);
      if (options) {
        if (options.choices && options.choices.length) {
          if (options.choices.includes(float)) {
            return float;
          }

          throw new RangeError(
            `must be one of [ ${options.choices.join(", ")} ]`
          );
        }

        if (options.min && float < options.min) {
          throw new RangeError(`must be more than ${options.min}`);
        }

        if (options.max && float > options.max) {
          throw new RangeError(`must be less than ${options.max}`);
        }
      }

      return float;
    };
  },

  numberOptional(options) {
    return (value, context) => {
      if (value === undefined) {
        value = options?.default;
      }

      if (value) {
        return this.number(options)(value, context);
      }

      return undefined;
    };
  },

  integer(options) {
    return (value, context) => {
      if (value === undefined || value === "") {
        throw new RangeError("must provide a value");
      }

      const float = this.number(options)(value, context);
      const int = float | 0;

      if (float !== int) {
        throw new RangeError("must be an integer");
      }

      return int;
    };
  },

  integerOptional(options) {
    return (value, context) => {
      if (value === undefined) {
        value = options?.default;
      }

      if (value) {
        return this.integer(options)(value, context);
      }

      return undefined;
    };
  },

  channel(options) {
    return (value, context) => {
      if (value === undefined || value === "") {
        throw new RangeError("must provide a value");
      }

      const { guild } = context;

      if (guild) {
        const found = guild.channels.find((channel) => {
          if (options && options.type) {
            if (channel.constructor !== ChannelConstructors[options.type]) {
              return false;
            }
          }

          return channel.id === value.replace(/\D/g, "");
        });

        if (found) {
          return found as never;
        }

        throw new RangeError("no channels found");
      }

      return context.channel! as never;
    };
  },

  channelOptional(options) {
    return (value, context) => {
      if (value === undefined) {
        value = options?.default;
      }

      if (value) {
        return this.channel(options)(value, context);
      }

      return undefined;
    };
  },

  date() {
    return (value) => {
      if (value === undefined || value === "") {
        throw new RangeError("must provide a value");
      }

      return new Date(value);
    };
  },

  dateOptional(options) {
    return (value) => {
      if (value === undefined) {
        value = options?.default;
      }

      if (value) {
        return this.date()(value);
      }

      return undefined;
    };
  },

  object<T>() {
    return (value) => {
      if (value === undefined || value === "") {
        throw new RangeError("must provide a value");
      }

      return JSON.parse(value) as T;
    };
  },

  objectOptional<T>(options: OptionalOptions) {
    return (value, context) => {
      if (value === undefined) {
        value = options?.default;
      }

      if (value) {
        return this.object<T>()(value, context);
      }

      return undefined;
    };
  },

  regexp() {
    return (value) => {
      if (value === undefined || value === "") {
        throw new RangeError("must provide a value");
      }

      return new RegExp(value);
    };
  },

  regexpOptional(options) {
    return (value, context) => {
      if (value === undefined) {
        value = options?.default;
      }

      if (value) {
        return this.regexp()(value, context);
      }

      return undefined;
    };
  },

  url() {
    return (value) => {
      if (value === undefined || value === "") {
        throw new RangeError("must provide a value");
      }

      return new URL(value);
    };
  },

  urlOptional(options) {
    return (value, context) => {
      if (value === undefined) {
        value = options?.default;
      }

      if (value) {
        return this.url()(value, context);
      }

      return undefined;
    };
  },

  user() {
    return (value, context) => {
      if (value === undefined || value === "") {
        throw new RangeError("must provide a value");
      }

      const found = context.client.users.find(
        (user) => user.tag === value || user.id === value.replace(/\D/g, "")
      );

      if (found === undefined) {
        throw new RangeError("user not found");
      }

      return found;
    };
  },

  userOptional(options) {
    return (value, context) => {
      if (value === undefined) {
        value = options?.default;
      }

      if (value) {
        return this.user()(value, context);
      }

      return undefined;
    };
  },

  member() {
    return (value, context) => {
      if (value === undefined || value === "") {
        throw new RangeError("must provide a value");
      }

      const { guild } = context;
      if (guild) {
        const found = guild.members.find(
          (user) => user.tag === value || user.id === value.replace(/\D/g, "")
        );

        if (found === undefined) {
          throw new RangeError("member not found");
        }

        return found;
      }

      throw new RangeError("must be in a guild");
    };
  },

  memberOptional(options) {
    return (value, context) => {
      if (value === undefined) {
        value = options?.default;
      }

      if (value) {
        return this.member()(value, context);
      }
    };
  },

  role() {
    return (value, context) => {
      if (value === undefined || value === "") {
        throw new RangeError("must provide a value");
      }

      const { guild } = context;
      if (guild) {
        const found = guild.roles.find(
          (user) => user.name === value || user.id === value.replace(/\D/g, "")
        );

        if (found === undefined) {
          throw new RangeError("role not found");
        }

        return found;
      }

      throw new RangeError("must be in a guild");
    };
  },

  roleOptional(options) {
    return (value, context) => {
      if (value === undefined) {
        value = options?.default;
      }

      if (value) {
        return this.role()(value, context);
      }
    };
  },

  emoji() {
    return (value, context) => {
      if (value === undefined || value === "") {
        throw new RangeError("must provide a value");
      }

      console.log(value, value.replace(/\D/g, ""));

      const found = context.client.emojis.find(
        (emoji) => emoji.id === value.replace(/\D/g, "")
      );

      if (found === undefined) {
        throw new RangeError("emoji not found");
      }

      return found;
    };
  },

  emojiOptional(options) {
    return (value, context) => {
      if (value === undefined) {
        value = options?.default;
      }

      if (value) {
        return this.emoji()(value, context);
      }

      return undefined;
    };
  },

  unicodeEmoji() {
    return (value) => {
      return new UnicodeEmoji(value);
    };
  },

  unicodeEmojiOptional(options?: OptionalOptions) {
    return (value, context) => {
      if (value === undefined) {
        value = options?.default;
      }

      if (value) {
        return this.unicodeEmoji()(value, context);
      }

      return undefined;
    };
  },

  array<T>(options?: ArrayOptions<T>) {
    return (value) => {
      const sliced = value.split(options?.split || " ");

      if (options?.choices && options?.choices.length) {
        if (!sliced.every((x) => options?.choices?.includes(x))) {
          throw new RangeError(
            `must be one of [ ${options.choices.join(", ")} ]`
          );
        }
      }

      const data = sliced.map(options?.map || ((x) => x as unknown as T));

      if (options) {
        if (options.maxLength && data.length > options.maxLength) {
          throw new RangeError(`must be less than ${options.maxLength} items`);
        }

        if (options.minLength && data.length < options.minLength) {
          throw new RangeError(`must be more than ${options.maxLength} items`);
        }
      }

      return data;
    };
  },

  arrayOptional<T>(options?: ArrayOptions<T> & OptionalOptions) {
    return (value, context) => {
      if (value === undefined) {
        value = options?.default;
      }

      if (value) {
        return this.array(options)(value, context);
      }

      return undefined;
    };
  },
};

export const DefaultArgs = new Proxy(
  {},
  {
    get() {
      return CommandArgumentBuilders.string();
    },
  }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Command<
  U extends string,
  V extends ArgsFactory<U, Z>,
  Z extends Record<RemoveSugar<SyntaxParser<U, []>[number]>, unknown>
>(
  syntax: U,
  options: Options<U, V>,
  run: (context: Cmd.Context, args: Values<V, U>) => unknown
) {
  const [, cmd] = /^(.+?)(?: \[|$)/.exec(syntax)!;
  const ids = syntax.match(/\[.+?\]/g) || [];
  console.log(ids);
  const opt: Array<Cmd.ArgumentOptions> = [];
  const flg: Array<Cmd.ArgumentOptions> = [];

  const builder = (options.args || (() => DefaultArgs))(
    CommandArgumentBuilders
  );

  for (const id of ids) {
    // console.log(id);
    const id2 = id.replace(/\[|\]/g, "");
    const [, name, def] = /^\[(?:\.{3})?-?(.+?)\??(?:=(.*?))?\]$/.exec(id)!;
    let arg: Cmd.ArgumentOptions = { name: name!, required: true };
    const isFlag = /^\[(?:\.{3})?-/.test(id);

    if (/^\[(?:\.{3})?-?(.+?)\?/.test(id)) {
      arg.required = false;
    }

    if (def) {
      arg.default = def;
    }

    arg.type = builder[id2 as never];

    if (/^\[\.{3}/.test(id)) {
      arg.consume = true;
    }

    if (isFlag) {
      flg.push(arg);
      continue;
    }

    // console.log(arg);

    opt.push(arg);
  }

  return class Exec extends BaseCommand<Values<V, U>> {
    constructor(client: CommandClient) {
      super(
        client,
        {
          name: cmd!,
          metadata: options.metadata as never,
          ...options,
          type: opt,
          args: flg,
        },
        syntax
      );
    }

    public run(context: Cmd.Context, args: Values<V, U>): unknown {
      return run(context, args);
    }
  };
}
