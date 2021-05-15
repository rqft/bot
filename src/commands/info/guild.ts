import { Command, CommandClient } from "detritus-client";
import { MfaLevels } from "detritus-client/lib/constants";
import { Guild, Invite } from "detritus-client/lib/structures";
import { BaseCollection } from "detritus-utils";
import { CustomEmojis } from "../../enums/customEmojis";
import { Emojis } from "../../enums/emojis";
import { VerificationLevelArray } from "../../enums/utils";
import { findGuild } from "../../functions/findGuild";
import { formatTimestamp } from "../../functions/formatTimestamp";
import { generateEmbed } from "../../functions/generateEmbedTemplate";
import { getGuildFeatures } from "../../functions/getGuildFeatures";
import { getGuildVoiceRegion } from "../../functions/getGuildVoiceRegion";
import { simpleGetLongAgo } from "../../functions/getLongAgo";
import { CustomError } from "../../globals";
import { BaseCommand } from "../basecommand";

export default class GuildCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      label: "guild",
      name: "server",
      aliases: ["s", "guild"],
      args: [
        {
          name: "features",
          default: false,
          type: Boolean,
        },
      ],
    });
  }
  async run(context: Command.Context, args: Command.ParsedArgs) {
    const guild = findGuild(args.guild || context.guildId);
    if (!guild) throw new CustomError("I can't find that guild");
    const emb = generateEmbed({ user: context.user });
    emb.setTitle(
      `${guild.unavailable ? Emojis.X : ""} ${
        guild.isPublic || guild.isDiscoverable ? CustomEmojis.GUI_DISCOVERY : ""
      } ${guild.isVerified ? CustomEmojis.BADGE_VERIFIED : ""} ${
        guild.isPartnered ? CustomEmojis.BADGE_PARTNER : ""
      } ${guild.name}`
    );
    emb.setUrl(guild.jumpLink);
    emb.setThumbnail(guild.iconUrl!);

    // Basic Server Info
    const basicData = [];

    // The Server ID
    basicData.push(`${Emojis.GEAR} **ID**: \`${guild.id}\``);

    // Server Owner
    if (guild.owner)
      basicData.push(
        `${CustomEmojis.GUI_OWNERCROWN} **Owner**: ${guild.owner.mention}`
      );

    // Server Voice Region
    if (guild.region)
      basicData.push(
        `${CustomEmojis.CHANNEL_VOICE} **Voice Region**: ${getGuildVoiceRegion(
          guild,
          true
        )}`
      );

    // Image links
    basicData.push(
      `${Emojis.LINK} **Links**: [\`Icon\`](${guild.iconUrl}) ${
        guild.bannerUrl ? `| [\`Banner\`](${guild.bannerUrl})` : ""
      } ${guild.splashUrl ? `| [\`Invite Splash\`](${guild.splashUrl})` : ""} ${
        guild.discoverySplashUrl
          ? `| [\`Discovery Splash\`](${guild.discoverySplashUrl})`
          : ""
      }`
    );
    // When the server was created
    basicData.push(
      `${Emojis.CALENDAR_SPIRAL} **Created**: ${simpleGetLongAgo(
        guild.createdAtUnix
      )} ago ${formatTimestamp(guild.createdAt)}`
    );

    // Verification Requirement to join the server
    const Verification = VerificationLevelArray[guild.verificationLevel];
    basicData.push(
      `${Verification?.icon} **Verification Level**: ${Verification?.text} ${
        guild.mfaLevel === MfaLevels.ELEVATED ? "(Elevated)" : ""
      }`
    );
    emb.addField("❯ Server Info", basicData.join("\n"));

    const counts = [];
    const channels: string[] = [];
    if (guild.textChannels.length)
      channels.push(
        `${CustomEmojis.CHANNEL_TEXT}: **${guild.textChannels.length}**`
      );
    if (guild.storeChannels.length)
      channels.push(
        `${CustomEmojis.CHANNEL_STORE}: **${guild.storeChannels.length}**`
      );
    if (guild.voiceChannels.length)
      channels.push(
        `${CustomEmojis.CHANNEL_VOICE}: **${guild.voiceChannels.length}**`
      );
    if (guild.categoryChannels.length)
      channels.push(
        `${CustomEmojis.CHANNEL_CATEGORY}: **${guild.categoryChannels.length}**`
      );
    if (channels.length)
      counts.push(
        `${Emojis.SPIRAL_NOTE_PAD} **Channels**: ${guild.channels.length}
        ${CustomEmojis.BLANK.repeat(2)}${channels.join(" | ")}`
      );
    if (guild.roles.length)
      counts.push(`${Emojis.CYCLONE} **Roles**: ${guild.roles.length}`);
    const emojis = guild.emojis;
    if (emojis.length)
      counts.push(
        `${Emojis.SMILEY} **Emojis**: ${emojis.length} (max ${guild.maxEmojis})`
      );
    emb.addField("❯ Counts", counts.join("\n"));

    if (guild.premiumSubscriptionCount) {
      const BOOSTER_SHOW_LIMIT = 10;
      const members = guild.members.filter((v) => v.isBoosting);
      emb.addField(
        "❯ Boosts",
        `${calculateBoostEmoji(guild)} **Boosts**: ${
          guild.premiumSubscriptionCount
        } (Tier ${guild.premiumTier})
        ${
          members.length
            ? `${CustomEmojis.BADGE_NITRO} **Boosters**: ${
                members
                  .map((v) => v.mention)
                  .slice(0, BOOSTER_SHOW_LIMIT)
                  .join(", ") +
                (members.length > BOOSTER_SHOW_LIMIT
                  ? ` and ${members.length - BOOSTER_SHOW_LIMIT} more...`
                  : "")
              }`
            : ""
        }`
      );
    }

    const inviteData = [];

    var invites = new BaseCollection<string, Invite>();
    try {
      invites = await guild.fetchInvites();
    } catch {}
    console.log("ok, running");
    if (invites.size) {
      inviteData.push(
        `${CustomEmojis.GUI_JOIN_ARROW} **Known Invites**: ${invites
          .map((v) => `[${v.code}](${v.url})`)
          .slice(0, 8)
          .join(" | ")}`
      );
      if (guild.canHaveVanityUrl) {
        if (guild.vanityUrlCode)
          inviteData.push(
            `${CustomEmojis.GUI_NAME_EDITED} **Vanity Code**: https://discord.gg/${guild.vanityUrlCode}`
          );
        else
          inviteData.push(
            `${Emojis.X} This server has not enabled a Vanity URL yet`
          );
      }
      emb.addField("❯ Invite Data", inviteData.join("\n"));
    }
    const features = getGuildFeatures(guild);
    if (features.length && args.features)
      emb.addField(
        "❯ Features",
        features.map((v) => `${v.icon} \`${v.text}\``).join("\n")
      );
    context.editOrReply({ embed: emb });
  }
}
function calculateBoostEmoji({ premiumTier }: Guild) {
  return premiumTier === 0
    ? CustomEmojis.GUI_BOOST_LEVEL_1
    : premiumTier === 1
    ? CustomEmojis.GUI_BOOST_LEVEL_2
    : premiumTier === 2
    ? CustomEmojis.GUI_BOOST_LEVEL_3
    : premiumTier === 3
    ? CustomEmojis.GUI_BOOST_LEVEL_4
    : CustomEmojis.BLANK;
}
