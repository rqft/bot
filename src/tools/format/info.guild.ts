import { Context } from "detritus-client/lib/command";
import {
  ChannelTypes,
  VerificationLevels,
} from "detritus-client/lib/constants";
import { InteractionContext } from "detritus-client/lib/interaction";
import { Guild, Message } from "detritus-client/lib/structures";
import {
  ChannelTypesText,
  GuildExplicitContentFiltersText,
  GuildFeature,
  GuildFeaturesEmojis,
  GuildFeaturesText,
  GuildMfaLevelsText,
  GuildPublicStatesText,
  GuildVerificationLevelsText,
  GuildVoiceRegion,
  VoiceRegionsText,
} from "../../constants";
import { CustomEmojis, Emojis } from "../emojis";
import { Err } from "../error";
import { Markdown } from "../markdown";
import { editOrReply } from "../tools";
import { Basic } from "./basic";
import { Embed } from "./embed";

export interface GuildArgs {
  guild: Guild | null;
}

export async function guild(
  context: Context | InteractionContext,
  args: GuildArgs
): Promise<Message | null> {
  const guild = args.guild || context.guild;

  if (!guild) {
    throw new Err("Need to be in a server", { status: 403 });
  }

  const embed = Embed.user(context);

  {
    embed.setTitle(guild.name);
    if (guild.iconUrl) {
      embed.setThumbnail(guild.iconUrl);
    }

    if (guild.bannerUrl) {
      embed.setImage(guild.bannerUrl);
    }

    if (guild.description) {
      embed.setDescription(guild.description);
    }
  }

  {
    const description: Array<string> = [];
    description.push(
      Basic.field(
        CustomEmojis.GUI_RICH_PRESENCE,
        "ID",
        Markdown.Format.codestring(guild.id)
      )
    );

    description.push(
      Basic.field(
        Emojis.CALENDAR,
        "Created At",
        Markdown.Format.timestamp(guild.createdAt)
      )
    );

    if (guild.owner) {
      description.push(
        Basic.field(
          CustomEmojis.GUI_OWNERCROWN,
          "Owner",
          `${Markdown.Format.link(guild.owner.tag, guild.owner.jumpLink)} (${
            guild.owner.mention
          })`
        )
      );
    }

    if (guild.region) {
      description.push(
        Basic.field(
          CustomEmojis.CHANNEL_VOICE,
          "Voice Region",
          VoiceRegionsText[guild.region as GuildVoiceRegion] || guild.region
        )
      );
    }

    if (description.length) {
      embed.addField("Information", description.join("\n"), true);
    }

    // put these into a separate field

    {
      const description: Array<string> = [];
      description.push(
        Basic.field(
          "\n" + CustomEmojis.GUI_ROLE,
          "MFA Level",
          GuildMfaLevelsText[guild.mfaLevel] || "Unknown"
        )
      );

      description.push(
        Basic.field(
          CustomEmojis.CHANNEL_TEXT_NSFW,
          "Explicit Content Filter",
          GuildExplicitContentFiltersText[guild.explicitContentFilter] ||
            "Unknown"
        )
      );

      description.push(
        Basic.field(
          CustomEmojis.GUI_INVITE,
          "Verification Level",
          GuildVerificationLevelsText[
            guild.verificationLevel as VerificationLevels
          ] || "Unknown"
        )
      );

      if (guild.canHaveVanityUrl) {
        description.push(
          Basic.field(
            CustomEmojis.GUI_INVITE,
            "Vanity URL",
            guild.vanityUrlCode || "Not Set"
          )
        );
      }

      description.push(
        Basic.field(
          CustomEmojis.GUI_DISCOVERY,
          "Server Type",
          GuildPublicStatesText[String(guild.isPublic)]!
        )
      );

      description.push(
        Basic.field(
          CustomEmojis.GUI_SETTINGS,
          "Locale",
          guild.preferredLocaleText || "Unknown"
        )
      );

      if (description.length) {
        embed.addField("\u200b", description.join("\n"), true);
      }
    }
  }

  {
    const description: Array<string> = [];

    if (guild.channels.size) {
      description.push(
        Basic.field(
          CustomEmojis.CHANNEL_THREAD,
          "Channels",
          guild.channels.size.toLocaleString()
        )
      );

      const count = new Map<ChannelTypes, number>();
      for (const [, channel] of guild.channels) {
        count.set(channel.type, (count.get(channel.type) || 0) + 1);
      }

      const ChannelTypeEmojis: Record<ChannelTypes, CustomEmojis> = {
        [ChannelTypes.BASE]: CustomEmojis.CHANNEL_THREAD,
        [ChannelTypes.DM]: CustomEmojis.CHANNEL_TEXT,
        [ChannelTypes.GROUP_DM]: CustomEmojis.GUI_MEMBERS,
        [ChannelTypes.GUILD_CATEGORY]: CustomEmojis.CHANNEL_CATEGORY,
        [ChannelTypes.GUILD_DIRECTORY]: CustomEmojis.CHANNEL_CATEGORY,
        [ChannelTypes.GUILD_FORUM]: CustomEmojis.CHANNEL_THREAD,
        [ChannelTypes.GUILD_NEWS]: CustomEmojis.CHANNEL_NEWS,
        [ChannelTypes.GUILD_NEWS_THREAD]: CustomEmojis.CHANNEL_THREAD_NEW,
        [ChannelTypes.GUILD_PRIVATE_THREAD]: CustomEmojis.CHANNEL_THREAD_NEW,
        [ChannelTypes.GUILD_PUBLIC_THREAD]: CustomEmojis.CHANNEL_THREAD_NEW,
        [ChannelTypes.GUILD_STAGE_VOICE]: CustomEmojis.CHANNEL_STAGE,
        [ChannelTypes.GUILD_STORE]: CustomEmojis.CHANNEL_STORE,
        [ChannelTypes.GUILD_TEXT]: CustomEmojis.CHANNEL_TEXT,
        [ChannelTypes.GUILD_VOICE]: CustomEmojis.CHANNEL_VOICE,
      };

      for (const [key, value] of count) {
        description.push(
          Basic.field(
            CustomEmojis.BLANK,
            `${ChannelTypeEmojis[key]} ${ChannelTypesText[key]}`,
            value.toLocaleString()
          )
        );
      }
    }

    if (guild.roles.size) {
      description.push(
        Basic.field(
          "\n" + CustomEmojis.GUI_ROLE,
          "Roles",
          guild.roles.size.toLocaleString()
        )
      );
    }

    if (guild.memberCount) {
      description.push(
        Basic.field(
          CustomEmojis.GUI_MEMBERS,
          "Members",
          guild.memberCount.toLocaleString()
        )
      );
    }

    if (guild.premiumSubscriptionCount) {
      description.push(
        Basic.field(
          CustomEmojis.GUI_BOOST_LEVEL_1,
          "Boosts",
          guild.premiumSubscriptionCount.toLocaleString()
        )
      );
    }

    if (guild.emojis.size) {
      description.push(
        Basic.field(
          CustomEmojis.GUI_EMOJI,
          "Emojis",
          guild.emojis.size.toLocaleString()
        )
      );
    }

    if (guild.stickers.size) {
      description.push(
        Basic.field(
          CustomEmojis.GUI_STICKER,
          "Stickers",
          guild.stickers.size.toLocaleString()
        )
      );
    }

    if (guild.guildScheduledEvents.size) {
      description.push(
        Basic.field(
          CustomEmojis.GUI_SLOWMODE,
          "Scheduled Events",
          guild.guildScheduledEvents.size.toLocaleString()
        )
      );
    }

    if (guild.presences.size) {
      description.push(
        Basic.field(
          CustomEmojis.GUI_RICH_PRESENCE,
          "Presences",
          guild.presences.size.toLocaleString()
        )
      );
    }

    if (guild.stageInstances.size) {
      description.push(
        Basic.field(
          CustomEmojis.CHANNEL_STAGE,
          "Stage Instances",
          guild.stageInstances.size.toLocaleString()
        )
      );
    }

    if (guild.voiceStates.size) {
      description.push(
        Basic.field(
          CustomEmojis.CHANNEL_VOICE,
          "Voice States",
          guild.voiceStates.size.toLocaleString()
        )
      );
    }

    if (description.length) {
      embed.addField("Counts", description.join("\n"), true);
    }
  }

  {
    const txt: Array<string> = guild.features.map((value) => {
      const emoji = GuildFeaturesEmojis[value as GuildFeature];
      const text = GuildFeaturesText[value as GuildFeature];
      return `${emoji} ${text}`;
    });

    if (txt.length > 10) {
      for (let i = 0; i < 3; i++) {
        const d = txt.splice(0, 10);
        console.log(i, d);
        if (d.length) {
          embed.addField(i === 0 ? "Features" : "\u200b", d.join("\n"), true);
        }
      }
    }
  }

  return await editOrReply(context, { embed });
}
