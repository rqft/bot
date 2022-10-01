import { Context } from "detritus-client/lib/command";
import { MarkupTimestampStyles } from "detritus-client/lib/constants";
import {
  Channel,
  Guild,
  Member,
  Role,
  User,
} from "detritus-client/lib/structures";
import { Embed, Markup, Snowflake } from "detritus-client/lib/utils";
import { Snowflake as SnowFlake } from "detritus-utils/lib/snowflake";
import { derive, emojis, tab, tail } from "../constants";
import { Embeds } from "../tools/embed";
import { CustomEmoji, Emoji, UnicodeEmoji } from "../tools/emoji";
import { Paginator } from "../tools/paginator";
import { fmt } from "../tools/util";
import { Warning } from "../tools/warning";
import { Command } from "../wrap/builder";

export default Command(
  "info [noun?]",
  { args: (self) => ({ noun: self.stringOptional() }) },
  async (context, args) => {
    console.log("a");
    args.noun ||= context.userId;

    const { noun } = args;
    const pages = identify(context, noun);

    if (!pages.length) {
      throw new Warning("Nothing was found");
    }

    const paginator = new Paginator(context, {
      pageLimit: pages.length,
      async onPage(page) {
        const embed = Embeds.user(context);
        const data = pages[page - 1]!;
        if (isSnowflake(data)) {
          return await snowflake(context, data, embed);
        }

        if (data instanceof UnicodeEmoji) {
          return await unicodeEmoji(context, data, embed);
        }

        if (data instanceof CustomEmoji) {
          return await customEmoji(context, data, embed);
        }

        if (data instanceof Role) {
          return await role(context, data, embed);
        }

        embed.setTitle(`${tail} ${data.constructor.name} Information`);
        embed.setDescription("No further details.");
        return embed;
      },
    });

    return await paginator.start();
  }
);

export function identify(
  context: Context,
  noun: string
): Array<User | Member | Guild | Role | Channel | Emoji | SnowFlake> {
  const out: Array<User | Member | Guild | Role | Channel | Emoji | SnowFlake> =
    [];
  if (/^<a?:(\w{2,32}):(\d{16,20})>$/.test(noun)) {
    out.push(new CustomEmoji(noun));
  }

  const cemoji = context.client.emojis.filter(
    (x) =>
      x.name.toLowerCase() === noun.toLowerCase() ||
      x.id === noun.replace(/\D/g, "")
  );

  if (cemoji.length) {
    out.push(...cemoji.map((x) => new CustomEmoji(x.format)));
  }

  const uemoji = emojis.filter(
    (x) => x.name.toLowerCase() === noun.toLowerCase() || x.emoji === noun
  );

  if (uemoji.length) {
    out.push(...uemoji.map((x) => new UnicodeEmoji(x.emoji)));
  }

  const user = context.client.users.find(
    (x) =>
      x.tag.toLowerCase() === noun.toLowerCase() ||
      x.id === noun.replace(/\D/g, "")
  );

  a: if (user) {
    if (context.guild) {
      if (context.guild.members.has(user.id)) {
        out.push(context.guild.members.get(user.id)!);
        break a;
      }
    }

    out.push(user);
  }

  const channels = context.client.channels.filter(
    (x) =>
      x.id === noun.replace(/\D/g, "") ||
      "#" + x.name.toLowerCase() === noun.toLowerCase()
  );

  if (channels.length) {
    out.push(...channels);
  }

  const roles = context.client.roles.filter(
    (x) =>
      x.id === noun.replace(/\D/g, "") ||
      (x.id === context.guildId && noun === "@everyone") ||
      x.name.toLowerCase() === noun.toLowerCase()
  );

  if (roles.length) {
    out.push(...roles);
  }

  const guilds = context.client.guilds.filter(
    (x) =>
      x.id === noun.replace(/\D/g, "") ||
      x.name.toLowerCase() === noun.toLowerCase()
  );

  if (guilds.length) {
    out.push(...guilds);
  }

  if (/\d{16,21}/g.test(noun)) {
    out.push(
      Object.assign(Snowflake.deconstruct(noun), {
        species: "@data/snowflake",
      })
    );
  }

  console.log(out);

  return out;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isSnowflake(value: any): value is SnowFlake {
  return value["species"] === "@data/snowflake";
}

// formatters

export async function snowflake(_: Context, data: SnowFlake, embed: Embed) {
  embed.setTitle(`${tail} Snowflake Information`);

  {
    const description: Array<string> = [];

    const { id, processId, sequence, timestamp, workerId } = data;

    description.push(fmt("**Id**: `{id}`", { id }));
    description.push(fmt("**Process Id**: `{processId}`", { processId }));
    description.push(fmt("**Sequence**: `{sequence}`", { sequence }));
    description.push(
      fmt("**Timestamp**: {f} ({r})", {
        f: Markup.timestamp(timestamp, MarkupTimestampStyles.BOTH_SHORT),
        r: Markup.timestamp(timestamp, MarkupTimestampStyles.RELATIVE),
      })
    );
    description.push(
      fmt("{tab} {derive} **Unix**: `{timestamp}`", { timestamp, tab, derive })
    );
    description.push(fmt("**Worker Id**: {workerId}", { workerId }));

    embed.setDescription(description.join("\n"));
  }

  embed.setThumbnail(new UnicodeEmoji("❄").url());

  return embed;
}

export async function unicodeEmoji(
  _: Context,
  data: UnicodeEmoji,
  embed: Embed
) {
  embed.setTitle(`${tail} Emoji Information (Unicode)`);
  embed.setThumbnail(data.url());

  const { category, keywords, name, sub_category, children } = data.info();

  {
    const description: Array<string> = [];

    description.push(fmt("**Name**: `{name}`", { name }));
    description.push(
      fmt("**Category**: {category}: {sub}", {
        category: category.name,
        sub: sub_category.name,
      })
    );

    description.push(
      fmt("**Codepoints**: `{codepoints}`", { codepoints: data.codepoints() })
    );

    if (keywords && keywords.length) {
      description.push(
        fmt("**Key Words**: {kw}", {
          kw: keywords.map((x) => Markup.codestring(x)).join(", "),
        })
      );
    }

    embed.setDescription(description.join("\n"));
  }

  if (children && children.length) {
    embed.addField(
      `${tail} Children`,
      children.map((x) => `${x.emoji} ${x.name}`).join("\n")
    );
  }

  return embed;
}

export async function customEmoji(_: Context, data: CustomEmoji, embed: Embed) {
  embed.setTitle(`${tail} Emoji Information (Custom)`);
  embed.setThumbnail(data.url());

  {
    const description: Array<string> = [];

    description.push(fmt("**Id**: `{id}`", { id: data.id }));
    description.push(
      fmt("**Name**: [{name}]({url})", { name: data.name, url: data.url() })
    );

    if (data.animated) {
      description.push("**Animated**: Yes");
    }

    const unix = Snowflake.timestamp(data.id);

    description.push(
      fmt("**Created**: {f} ({r})", {
        f: Markup.timestamp(unix, MarkupTimestampStyles.BOTH_SHORT),
        r: Markup.timestamp(unix, MarkupTimestampStyles.RELATIVE),
      })
    );

    const discord = data.data();

    if (discord) {
      if (discord.guild) {
        description.push(
          fmt("**Server**: [{guild}]({url})", {
            guild: discord.guild.name,
            url: discord.guild.jumpLink,
          })
        );
      }
    }

    embed.setDescription(description.join("\n"));
  }

  return embed;
}

export async function role(_: Context, data: Role, embed: Embed) {
  embed.setTitle(`${tail} Role Information`);

  const {
    id,
    color,
    createdAtUnix,
    name,
    managed,
    isBoosterRole,
    isDefault,
    hoist,
    mentionable,
  } = data;

  {
    const description: Array<string> = [];

    description.push(
      fmt("**Name**: {name}", { name: Markup.codestring(name) })
    );

    description.push(fmt("**Id**: `{id}`", { id }));

    if (color) {
      const hex = color.toString(16).padStart(6);
      description.push(fmt("**Color**: `#{color}`", { color: hex }));
      embed.setThumbnail(
        fmt("https://api.clancy.lol/image/color/256x256/{hex}", { hex })
      );
    }

    description.push(
      fmt("**Created**: {f} ({r})", {
        f: Markup.timestamp(createdAtUnix, MarkupTimestampStyles.BOTH_SHORT),
        r: Markup.timestamp(createdAtUnix, MarkupTimestampStyles.RELATIVE),
      })
    );

    description.push(
      fmt("**Server**: [{guild}]({guildUrl})", {
        guild: data.guild?.name,
        guildUrl: data.guild?.jumpLink,
      })
    );

    const tags: Array<string> = [];

    if (managed) {
      tags.push("Managed");
    }

    if (isBoosterRole) {
      tags.push("Booster Role");
    }

    if (isDefault) {
      tags.push("Default Role");
    }

    if (hoist) {
      tags.push("Hoisted");
    }

    if (mentionable) {
      tags.push("Mentionable");
    }

    if (tags.length) {
      description.push(fmt("**Tags**: {tags}", { tags: tags.join(", ") }));
    }

    embed.setDescription(description.join("\n"));
  }

  return embed;
}
