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
import { CustomEmojis } from "../emojis";
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
  const { guild } = args;

  if (!guild) {
    throw new Error("Need to be in a guild");
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

    if (description.length) {
      embed.addField("Information", description.join("\n"), true);
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

    if (guild.members.size) {
      description.push(
        Basic.field(
          CustomEmojis.GUI_MEMBERS,
          "Members",
          guild.members.size.toLocaleString()
        )
      );
    }

    if (guild.premiumSubscriptionCount) {
      description.push(
        Basic.field(
          CustomEmojis.BADGE_NITRO,
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
    const featuresText = guild.features
      .map(
        (feature) =>
          `${
            GuildFeaturesEmojis[feature as GuildFeature] || CustomEmojis.BLANK
          } ${Markdown.Format.codestring(
            GuildFeaturesText[feature as GuildFeature] || feature
          )}`
      )
      .join("\n");
    if (featuresText.length) {
      embed.addField("Features", featuresText, false);
    }
  }

  return await editOrReply(context, { embed });
}
