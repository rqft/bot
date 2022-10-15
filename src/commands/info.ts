import { Context } from "detritus-client/lib/command";
import {
  ChannelTypes,
  MarkupTimestampStyles,
  PresenceStatuses,
  UserFlags,
  VerificationLevels,
} from "detritus-client/lib/constants";
import {
  Channel,
  ChannelBase,
  ChannelDM,
  Guild,
  Member,
  Message,
  Role,
  User,
} from "detritus-client/lib/structures";
import { Embed, Markup, Snowflake } from "detritus-client/lib/utils";
import { Snowflake as SnowFlake } from "detritus-utils/lib/snowflake";
import {
  bar,
  ChannelTypesText,
  delve,
  derive,
  emojis,
  GuildExplicitContentFiltersText,
  GuildMfaLevelsText,
  GuildNsfwLevelsText,
  GuildVerificationLevelsText,
  StagePrivacyLevelsText,
  StatusEmojis,
  StatusesText,
  tab,
  tail,
  UserBadges,
  VideoQualityModesText,
} from "../constants";
import { CustomEmojis, Emojis } from "../emojis";
import { Embeds } from "../tools/embed";
import { CustomEmoji, Emoji, UnicodeEmoji } from "../tools/emoji";
import { Markdown } from "../tools/markdown";
import { Paginator } from "../tools/paginator";
import { fmt, formatBytes, permissionsText } from "../tools/util";
import { Warning } from "../tools/warning";
import { Command } from "../wrap/builder";

export default Command(
  "info [...noun?]",
  { args: (self) => ({ noun: self.stringOptional() }) },
  async (context, args) => {
    const { noun } = args;
    const pages: ReturnType<typeof identify> = noun
      ? identify(context, noun)
      : [
          context.member || context.user,
          context.guild!,
          context.channel!,
          context.message,
        ].filter((x) => x !== null);

    if (!pages.length) {
      throw new Warning("Nothing was found");
    }

    const paginator = new Paginator(context, {
      pageLimit: pages.length,
      async onPage(page) {
        const embed = Embeds.user(context);
        embed.setFooter(`Page ${page}/${pages.length}`);

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

        if (data instanceof ChannelBase) {
          return await channel(context, data, embed);
        }

        if (data instanceof Message) {
          return await message(context, data, embed);
        }

        if (data instanceof Guild) {
          return await guild(context, data, embed);
        }

        if (data instanceof User || data instanceof Member) {
          return await user(context, data, embed);
        }

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
): Array<User | Member | Guild | Role | Channel | Emoji | SnowFlake | Message> {
  const out: Array<
    User | Member | Guild | Role | Channel | Emoji | SnowFlake | Message
  > = [];
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
      x.tag.toLowerCase().includes(noun.toLowerCase()) ||
      x.id === noun.replace(/\D/g, "") ||
      x.jumpLink === noun
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
      x.name.toLowerCase().includes(noun.toLowerCase()) ||
      x.jumpLink === noun
  );

  if (channels.length) {
    out.push(...channels);
  }

  const roles = context.client.roles.filter(
    (x) =>
      x.id === noun.replace(/\D/g, "") ||
      (x.id === context.guildId && noun === "@everyone") ||
      x.name.toLowerCase().includes(noun.toLowerCase())
  );

  if (roles.length) {
    out.push(...roles);
  }

  const guilds = context.client.guilds.filter(
    (x) =>
      x.id === noun.replace(/\D/g, "") ||
      x.name.toLowerCase().includes(noun.toLowerCase()) ||
      x.jumpLink === noun
  );

  if (guilds.length) {
    out.push(...guilds);
  }

  const messages = context.client.messages.filter(
    (x) =>
      x.id === noun.replace(/\D/g, "") ||
      x.id === context.message.referencedMessage?.id ||
      x.jumpLink === noun
  );

  if (messages.length) {
    out.push(...messages);
  }

  if (/^\d{16,21}$/g.test(noun)) {
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
    mention,
  } = data;

  {
    const description: Array<string> = [];

    description.push(
      fmt("**Name**: {name} ({mention})", {
        name: Markup.codestring(name),
        mention,
      })
    );

    description.push(fmt("**Id**: `{id}`", { id }));

    if (color) {
      const hex = color.toString(16).padStart(6);
      description.push(fmt("**Color**: `#{color}`", { color: hex }));
      embed.setThumbnail(
        fmt("https://api.clancy.lol/image/color/256x256/{hex}", { hex })
      );
    } else {
      embed.setThumbnail(new UnicodeEmoji("❔").url());
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

  const permissions = permissionsText(data);

  if (permissions.length) {
    embed.addField(`${tail} Permissions`, permissions.join(", "));
  }

  return embed;
}

export async function channel(_: Context, data: Channel, embed: Embed) {
  embed.setTitle(`${tail} Channel Information`);

  const {
    name,
    mention,
    id,
    createdAtUnix,
    position,
    parent,
    jumpLink,
    guild,
  } = data;

  {
    const description: Array<string> = [];

    description.push(
      fmt("**Name**: [{name}]({jumpLink}) ({mention})", {
        name,
        mention,
        jumpLink,
      })
    );

    description.push(fmt("**Id**: `{id}`", { id }));

    description.push(
      fmt("**Created At**: {f} ({r})", {
        f: Markup.timestamp(createdAtUnix, MarkupTimestampStyles.BOTH_SHORT),
        r: Markup.timestamp(createdAtUnix, MarkupTimestampStyles.RELATIVE),
      })
    );

    description.push(fmt("**Position**: `{position}`", { position }));

    if (parent) {
      description.push(
        fmt("**Parent Channel**: [{name}]({jumpLink}) ({mention})", {
          name: parent.name,
          jumpLink: parent.jumpLink,
          mention: parent.mention,
        })
      );
    }

    if (data.threads.size) {
      description.push(
        fmt("**Threads**: {threads}", { threads: data.threads.size })
      );
    }

    if (guild) {
      description.push(
        fmt("**Server**: [{name}]({jumpLink})", {
          name: guild.name,
          jumpLink: guild.jumpLink,
        })
      );
    }

    embed.setDescription(description.join("\n"));
  }

  {
    const description: Array<string> = [];

    switch (data.type) {
      case ChannelTypes.DM:
      case ChannelTypes.GROUP_DM:
      case ChannelTypes.GUILD_NEWS:
      case ChannelTypes.GUILD_NEWS_THREAD:
      case ChannelTypes.GUILD_PRIVATE_THREAD:
      case ChannelTypes.GUILD_PUBLIC_THREAD:
      case ChannelTypes.GUILD_TEXT: {
        if (data.nsfw) {
          description.push("**Nsfw**: Yes");
        }

        if (data.rateLimitPerUser) {
          description.push(
            fmt("**Slowmode**: {slowmode}", {
              slowmode: Markdown.toTimeString(data.rateLimitPerUser * 1000),
            })
          );
        }

        if (data.lastMessage) {
          description.push(
            fmt("**Last Message**: [here]({jumpLink})", {
              jumpLink: data.lastMessage.jumpLink,
            })
          );
        }

        if (data.owner) {
          description.push(
            fmt("**Owner**: [{tag}]({jumpLink}) ({mention})", {
              tag: data.owner.tag,
              jumpLink: data.owner.jumpLink,
              mention: data.owner.mention,
            })
          );
        }

        if (data.recipients.size) {
          description.push(
            fmt("**Recipients**: {users}", {
              users: data.recipients.map((x) => x.mention).join(", "),
            })
          );
        }

        break;
      }

      case ChannelTypes.GUILD_STAGE_VOICE:
      case ChannelTypes.GUILD_VOICE: {
        description.push(
          fmt("**Bitrate**: {bytes}/second", {
            bytes: formatBytes(data.bitrate || 0, undefined, undefined),
          })
        );

        description.push(
          fmt("**User Limit**: {current}/{max}", {
            current: data.voiceStates.size,
            max: data.userLimit,
          })
        );

        if (data.videoQualityMode) {
          description.push(
            fmt("Video Quality: {quality}", {
              quality: VideoQualityModesText[data.videoQualityMode],
            })
          );
        }

        if (data.stageInstance) {
          description.push(
            fmt("**Privacy**: {privacy}", {
              privacy: StagePrivacyLevelsText[data.stageInstance.privacyLevel],
            })
          );

          description.push(
            fmt("**Moderators**: {count}", {
              count: data.stageInstance.moderators.size,
            })
          );

          description.push(
            fmt("**Speakers**: {count}", {
              count: data.stageInstance.speakers.size,
            })
          );

          description.push(
            fmt("**Listeners**: {count}", {
              count: data.stageInstance.listeners.size,
            })
          );
        }

        break;
      }

      case ChannelTypes.GUILD_CATEGORY: {
        description.push(
          fmt("**Children**: {count}", { count: data.children.size })
        );
        break;
      }

      case ChannelTypes.GUILD_FORUM: {
        if (data.defaultAutoArchiveDuration) {
          description.push(
            fmt("**Default Auto Archive Duration**: {s} seconds", {
              s: data.defaultAutoArchiveDuration / 1000,
            })
          );
        }

        if (data.template) {
          description.push(
            fmt("**Template**: `{template}`", { template: data.template })
          );
        }

        if (data.availableTags.size) {
          description.push(
            fmt("**Available Tags**: {tags}", {
              tags: data.availableTags
                .map((x) => {
                  const title = Markup.codestring(
                    x.emojiId ? x.name : `${x.emojiName} \`${x.name}\``
                  );
                  if (x.emojiId) {
                    return `<:${x.emojiName}:${x.emojiId}> ${title}`;
                  } else {
                    return title;
                  }
                })
                .join(", "),
            })
          );
        }

        break;
      }
    }

    if (description.length) {
      embed.addField(
        `${tail} ${ChannelTypesText[data.type]} Channel Information`,
        description.join("\n")
      );
    }
  }

  embed.setThumbnail(getChannelIcon(data));

  return embed;
}

function getChannelIcon(channel: Channel) {
  if (channel instanceof ChannelDM) {
    return (
      channel.iconUrl || channel.defaultIconUrl || new UnicodeEmoji("❔").url()
    );
  }

  switch (channel.type) {
    case ChannelTypes.BASE:
      return CustomEmoji.url(CustomEmojis.RichActivity);
    case ChannelTypes.DM:
    case ChannelTypes.GROUP_DM:
    case ChannelTypes.GUILD_TEXT:
      if (channel.nsfw) {
        return CustomEmoji.url(CustomEmojis.ChannelTextNSFW);
      }
      return CustomEmoji.url(CustomEmojis.ChannelText);
    case ChannelTypes.GUILD_CATEGORY:
      return CustomEmoji.url(CustomEmojis.Synced);
    case ChannelTypes.GUILD_DIRECTORY:
      return CustomEmoji.url(CustomEmojis.ChannelDirectory);
    case ChannelTypes.GUILD_NEWS:
      if (channel.nsfw) {
        return CustomEmoji.url(CustomEmojis.MegaphoneNSFW);
      }
      return CustomEmoji.url(CustomEmojis.Megaphone);
    case ChannelTypes.GUILD_NEWS_THREAD:
      if (channel.nsfw) {
        return CustomEmoji.url(CustomEmojis.NSFWAnnouncementThreadIcon);
      }
      return CustomEmoji.url(CustomEmojis.AnnouncementThreadIcon);
    case ChannelTypes.GUILD_PUBLIC_THREAD:
      if (channel.nsfw) {
        return CustomEmoji.url(CustomEmojis.NSFWThreadIcon);
      }
      return CustomEmoji.url(CustomEmojis.ThreadIcon);
    case ChannelTypes.GUILD_PRIVATE_THREAD:
      return CustomEmoji.url(CustomEmojis.PrivateThreadIcon);

    case ChannelTypes.GUILD_STAGE_VOICE:
      return CustomEmoji.url(CustomEmojis.StageEvents);

    case ChannelTypes.GUILD_STORE:
      return CustomEmoji.url(CustomEmojis.StoreTag);

    case ChannelTypes.GUILD_VOICE:
      return CustomEmoji.url(CustomEmojis.Speaker);

    default:
      return new UnicodeEmoji("❔").url();
  }
}

export async function user(
  _: Context,
  data: User | Member,
  embed: Embed
): Promise<Embed> {
  // const isMember = data instanceof Member;
  embed.setTitle(`${tail} User Information`);

  const {
    id,
    avatarUrl,
    isClientOwner,
    isSystem,
    isWebhook,
    bot,
    createdAtUnix,
    defaultAvatarUrl,
    jumpLink,
    mention,
    presence,
    tag,
  } = data;

  {
    const description: Array<string> = [];

    const flags: Array<CustomEmojis | Emojis> = [];

    for (const flag of Object.values(UserFlags)) {
      if (typeof flag === "string") {
        continue;
      }

      if (data.hasFlag(flag)) {
        flags.push(UserBadges[flag]);
      }
    }

    if (flags.length) {
      description.push(flags.join(""));
    }

    description.push(fmt("**Id**: `{id}`", { id }));
    description.push(
      fmt("**Profile**: [{tag}]({jumpLink}) ({mention})", {
        tag,
        jumpLink,
        mention,
      })
    );

    description.push(
      fmt("**Avatar**: [Main]({avatarUrl}) ([Default]({defaultAvatarUrl}))", {
        avatarUrl,
        defaultAvatarUrl,
      })
    );

    description.push(
      fmt("**Created At**: {f} ({r})", {
        f: Markup.timestamp(createdAtUnix, MarkupTimestampStyles.BOTH_SHORT),
        r: Markup.timestamp(createdAtUnix, MarkupTimestampStyles.RELATIVE),
      })
    );

    {
      const tags: Array<string> = [];

      if (isClientOwner) {
        tags.push("Bot Owner");
      }

      if (isSystem) {
        tags.push("System");
      }

      if (isWebhook) {
        tags.push("Webhook");
      }

      if (bot) {
        tags.push("Bot");
      }

      if (tags.length) {
        description.push(fmt("**Tags**: {tags}", { tags: tags.join(", ") }));
      }
    }

    embed.setDescription(description.join("\n"));
  }

  if (presence) {
    const description: Array<string> = [];

    description.push(
      fmt("{emoji} {text}", {
        emoji: StatusEmojis[presence.status as PresenceStatuses],
        text: StatusesText[presence.status as PresenceStatuses],
      })
    );

    let i = 0;
    for (const [, activity] of presence.activities) {
      i++;
      if (activity.isCustomStatus) {
        description.push(
          fmt(`{emoji} {state}`, {
            state: Markup.italics(activity.state || ""),
            emoji: activity.emoji?.toString(),
          })
        );
        continue;
      }
      let c = i === presence.activities.length ? derive : delve;
      description.push(
        fmt(`{c} {type} **{name}**`, {
          c,
          type: activity.typeText,
          name: activity.name,
        })
      );

      if (activity.details) {
        description.push(
          fmt(`{bar}${tab}${derive} {details}`, {
            bar: i === presence.activities.length ? tab : bar,
            details: activity.details,
          })
        );
      }
    }

    embed.addField(`${tail} Presence`, description.join("\n"));
  }

  if (data instanceof Member) {
    const description: Array<string> = [];

    const { nick, roles, pending, premiumSinceUnix, voiceState } = data as Omit<
      Member,
      keyof User
    >;

    if (nick !== null) {
      description.push(
        fmt("**Nickname**: {nick}", { nick: Markup.codestring(nick) })
      );
    }

    if (roles.size) {
      description.push(
        fmt("**Roles**: {roles}", {
          roles: roles.map((x) => x?.mention).join(", "),
        })
      );
    }

    if (premiumSinceUnix) {
      description.push(
        fmt("**Boosting Since**: {f} ({r})", {
          f: Markup.timestamp(
            premiumSinceUnix,
            MarkupTimestampStyles.BOTH_SHORT
          ),
          r: Markup.timestamp(premiumSinceUnix, MarkupTimestampStyles.RELATIVE),
        })
      );
    }

    if (pending) {
      description.push("**Pending Membership**: Yes");
    }

    if (voiceState) {
      const emojis: Array<CustomEmojis> = [];

      const {
        deaf,
        isAudience,
        isSpeaking,
        mute,
        requestToSpeakTimestampUnix,
        selfDeaf,
        selfMute,
        selfStream,
        selfVideo,
        suppress,
        channel,
        isSpeaker,
      } = voiceState;

      if (isSpeaker) {
        if (isSpeaking) {
          emojis.push(CustomEmojis.Online);
        } else {
          emojis.push(CustomEmojis.Offline);
        }
      }

      if (selfMute || mute) {
        emojis.push(CustomEmojis.SpeakerMuted);
      }

      if (selfDeaf || deaf) {
        emojis.push(CustomEmojis.NoiseCancellationDisabled);
      }

      if (isAudience) {
        emojis.push(CustomEmojis.GoToAudience);
      }

      if (requestToSpeakTimestampUnix) {
        emojis.push(CustomEmojis.StageEvents);
      }

      if (selfStream) {
        emojis.push(CustomEmojis.Stream);
      }

      if (selfVideo) {
        emojis.push(CustomEmojis.CallVideoCamera);
      }

      if (suppress) {
        emojis.push(CustomEmojis.SpeakerLimited);
      }

      if (emojis.length) {
        description.push(
          fmt("**Voice State**: {emojis} in {channel}", {
            emojis: emojis.join(""),
            channel: channel?.mention || "(unknown)",
          })
        );
      }
    }

    if (description.length) {
      embed.addField(
        `${tail} Member Information`,
        "\u200b" + tab + description.join(`\n${tab}`)
      );
    }

    const permissions = permissionsText(data);

    if (permissions.length) {
      embed.addField(`${tail} Permissions`, permissions.join(", "));
    }
  }

  embed.setThumbnail(avatarUrl || defaultAvatarUrl);

  return embed;
}

export async function guild(
  _: Context,
  data: Guild,
  embed: Embed
): Promise<Embed> {
  embed.setTitle(`${tail} Server Information`);

  const {
    name,
    id,
    bannerUrl,
    createdAtUnix,
    defaultMessageNotifications,
    description: gdescription,
    explicitContentFilter,
    iconUrl,
    isDiscoverable,
    isPartnered,
    isPublic,
    isVerified,
    jumpLink,
    maxAttachmentSize,
    maxBitrate,
    maxEmojis,
    maxMembers,
    maxPresences,
    maxVideoChannelUsers,
    mfaLevel,
    nsfwLevel,
    owner,
    preferredLocaleText,
    vanityUrlCode,
    verificationLevel,
  } = data;

  {
    const description: Array<string> = [];

    if (gdescription) {
      description.push(Markup.italics(gdescription) + "\n");
    }

    description.push(fmt("**Id**: `{id}`", { id }));

    description.push(
      fmt("**Created At**: {f} ({r})", {
        f: Markup.timestamp(createdAtUnix, MarkupTimestampStyles.BOTH_SHORT),
        r: Markup.timestamp(createdAtUnix, MarkupTimestampStyles.RELATIVE),
      })
    );

    if (owner) {
      description.push(
        fmt("**Owner**: [{tag}]({jumpLink}) ({mention})", {
          jumpLink: owner.jumpLink,
          tag: owner.tag,
          mention: owner.mention,
        })
      );
    }

    description.push(fmt("**Link**: [{name}]({jumpLink})", { jumpLink, name }));

    if (vanityUrlCode) {
      description.push(
        fmt("**Vanity URL**: <https://discord.gg/{vanityUrlCode}>", {
          vanityUrlCode,
        })
      );
    }

    description.push(
      fmt("**Locale**: {preferredLocaleText}", { preferredLocaleText })
    );

    {
      const tags: Array<string> = [];

      if (isDiscoverable) {
        tags.push("Discoverable");
      }

      if (isPartnered) {
        tags.push("Partnered");
      }

      if (isVerified) {
        tags.push("Verified");
      }

      if (isPublic) {
        tags.push("Public");
      }

      if (tags.length) {
        description.push(fmt("**Tags**: {tags}", { tags: tags.join(", ") }));
      }
    }

    embed.setDescription(description.join("\n"));
  }

  {
    const description: Array<string> = [];
    description.push(
      fmt("\n**MFA Level**: {text}", { text: GuildMfaLevelsText[mfaLevel] })
    );

    description.push(
      fmt("**NSFW Level**: {text}", { text: GuildNsfwLevelsText[nsfwLevel] })
    );

    description.push(
      fmt("**Content Filter**: {text}", {
        text: GuildExplicitContentFiltersText[explicitContentFilter],
      })
    );

    description.push(
      fmt("**Verification Level**: {text}", {
        text: GuildVerificationLevelsText[
          verificationLevel as VerificationLevels
        ],
      })
    );

    description.push(
      fmt("**Default Message Notifications**: {text}", {
        text: defaultMessageNotifications === 1 ? "Mentions" : "All Messages",
      })
    );

    if (description.length) {
      embed.addField(`${tail} Settings`, description.join("\n"));
    }
  }

  {
    const description: Array<string> = [];

    if (maxAttachmentSize) {
      description.push(
        fmt("**Attachment Size**: {bytes}", {
          bytes: formatBytes(maxAttachmentSize),
        })
      );
    }

    if (maxBitrate) {
      description.push(
        fmt("**Bitrate**: {bytes}/s", {
          bytes: formatBytes(maxBitrate),
        })
      );
    }

    if (maxEmojis) {
      description.push(
        fmt("**Emojis**: {maxEmojis}", {
          maxEmojis,
        })
      );
    }

    if (maxMembers) {
      description.push(
        fmt("**Members**: {maxMembers}", {
          maxMembers,
        })
      );
    }

    if (maxPresences) {
      description.push(
        fmt("**Presences**: {maxPresences}", {
          maxPresences,
        })
      );
    }

    if (maxVideoChannelUsers) {
      description.push(
        fmt("**Video Channel Users**: {maxVideoChannelUsers}", {
          maxVideoChannelUsers,
        })
      );
    }

    if (description.length) {
      embed.addField(`${tail} Limits`, description.join("\n"));
    }
  }

  {
    const {
      channels,
      emojis,
      members,
      roles,
      stageInstances,
      stickers,
      voiceStates,
      premiumSubscriptionCount,
    } = data;

    const counts: Array<[CustomEmojis, number]> = [];

    if (channels.size) {
      counts.push([CustomEmojis.ChannelText, channels.size]);
    }

    if (emojis.size) {
      counts.push([CustomEmojis.EmojiSmile, emojis.size]);
    }

    if (stickers.size) {
      counts.push([CustomEmojis.Sticker, stickers.size]);
    }

    if (members.size) {
      counts.push([CustomEmojis.Person, members.size]);
    }

    if (roles.size) {
      counts.push([CustomEmojis.ShieldStar, roles.size]);
    }

    if (stageInstances.size) {
      counts.push([CustomEmojis.StageEvents, stageInstances.size]);
    }

    if (voiceStates.size) {
      counts.push([CustomEmojis.Speaker, voiceStates.size]);
    }

    if (premiumSubscriptionCount > 0) {
      counts.push([
        CustomEmojis.PremiumGuildSubscriberBadge,
        premiumSubscriptionCount,
      ]);
    }

    let txt = "";

    for (let i = 0; i < counts.length; i++) {
      let [e, t] = counts[i]!;

      if (i % 8 === 0 && i > 0) {
        txt += "\n";
      }

      txt += `${e} ${t}${tab}`;
    }

    if (counts.length) {
      embed.addField("\u200b", txt);
    }
  }

  if (bannerUrl) {
    embed.setImage(bannerUrl);
  }

  embed.setThumbnail(iconUrl || new UnicodeEmoji("❔").url());

  return embed;
}

export async function message(
  _: Context,
  data: Message,
  embed: Embed
): Promise<Embed> {
  embed.setTitle(`${tail} Message Information`);

  const {
    author,
    createdAtUnix,
    editedAtUnix,
    deleted,
    pinned,
    reactions,
    id,
    referencedMessage,
    jumpLink,
    thread,

    fromBot,
    fromMe,
    fromSystem,
    fromUser,
    fromWebhook,

    hasFlagCrossposted,
    hasFlagEphemeral,
    hasFlagFailedToMentionSomeRolesInThread,
    hasFlagHasThread,
    hasFlagIsCrossposted,
    hasFlagLoading,
    hasFlagSourceMessageDeleted,
    hasFlagSuppressEmbeds,
    hasFlagUrgent,
  } = data;

  {
    const description: Array<string> = [];

    description.push(fmt("**Id**: `{id}`", { id }));

    description.push(
      fmt("**Author**: [{tag}]({jumpLink}) ({mention})", {
        jumpLink: author.jumpLink,
        mention: author.mention,
        tag: author.tag,
      })
    );

    description.push(
      fmt("**Created At**: {f} ({r})", {
        f: Markup.timestamp(createdAtUnix, MarkupTimestampStyles.BOTH_SHORT),
        r: Markup.timestamp(createdAtUnix, MarkupTimestampStyles.RELATIVE),
      })
    );

    if (editedAtUnix) {
      description.push(
        fmt("**Last Edited At**: {f} ({r})", {
          f: Markup.timestamp(editedAtUnix, MarkupTimestampStyles.BOTH_SHORT),
          r: Markup.timestamp(editedAtUnix, MarkupTimestampStyles.RELATIVE),
        })
      );
    }

    if (deleted) {
      description.push("**Deleted**: Yes");
    }

    if (pinned) {
      description.push("**Pinned**: Yes");
    }

    if (thread) {
      description.push(
        fmt("**Attached Thread**: [{name}]({jumpLink}) ({mention})", {
          name: thread.name,
          jumpLink: thread.jumpLink,
          mention: thread.mention,
        })
      );
    }

    {
      const tags: Array<string> = [];

      if (fromBot) {
        tags.push("From Bot");
      }

      if (fromMe) {
        tags.push("From Me");
      }

      if (fromSystem) {
        tags.push("From System");
      }

      if (fromUser) {
        tags.push("From User");
      }

      if (fromWebhook) {
        tags.push("From Webhook");
      }

      if (hasFlagCrossposted) {
        tags.push("Cross-Posted");
      }

      if (hasFlagEphemeral) {
        tags.push("Ephemeral");
      }

      if (hasFlagFailedToMentionSomeRolesInThread) {
        tags.push("Failed to mention some roles in thread");
      }

      if (hasFlagHasThread) {
        tags.push("Has Thread");
      }

      if (hasFlagIsCrossposted) {
        tags.push("Is Cross-Posted");
      }

      if (hasFlagLoading) {
        tags.push("Loading");
      }

      if (hasFlagSourceMessageDeleted) {
        tags.push("Source Message Deleted");
      }

      if (hasFlagSuppressEmbeds) {
        tags.push("Suppress Embeds");
      }

      if (hasFlagUrgent) {
        tags.push("Urgent");
      }

      if (tags.length) {
        description.push(fmt("**Tags**: {tags}", { tags: tags.join(", ") }));
      }
    }

    if (referencedMessage) {
      description.push(
        fmt("**Replying to**: [here]({jumpLink})", {
          jumpLink: referencedMessage.jumpLink,
        })
      );
    }

    if (jumpLink) {
      description.push(fmt("**Jump Link**: [here]({jumpLink})", { jumpLink }));
    }

    if (description.length) {
      embed.setDescription(description.join("\n"));
    }
  }

  if (reactions.size) {
    embed.addField(
      `${tail} Reactions`,
      reactions
        .map((x) => `${x.emoji.toString()} \`${x.count.toLocaleString()}\``)
        .join(" ")
    );
  }

  embed.setThumbnail(CustomEmoji.url(CustomEmojis.ChatBubble));

  return embed;
}
