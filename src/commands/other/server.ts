import * as Structures from "detritus-client/lib/structures";
import { Guild, MessageEmbed } from "discord.js";
import { client, userBotGuilds } from "../..";
import { CustomEmojis } from "../../enums/customEmojis";
import { Emojis } from "../../enums/emojis";
import { capitalizeWords } from "../../functions/capitalizeWords";
import { formatTimestamp } from "../../functions/formatTimestamp";
import { getGuildFeatures } from "../../functions/getGuildFeatures";
import { getGuildVoiceRegion } from "../../functions/getGuildVoiceRegion";
import { simpleGetLongAgo } from "../../functions/getLongAgo";
import { search_guild } from "../../functions/searching/guild";
import { Color } from "../../globals";
import { reply } from "../../handlers/command";
import { ICommand } from "../../interfaces/ICommand";
module.exports = {
  name: "server",
  aliases: ["guild", "s"],
  restrictions: {
    botPermissions: ["BAN_MEMBERS"],
  },
  args: [
    {
      name: "server",
      required: false,
      type: "string",
    },
  ],
  async run(message, args) {
    const guild = args[0] ? await search_guild(args.join(" ")) : message.guild!;
    if (!guild) return await reply(message, "Unknown Server");
    var marked = false;
    if (client.guilds.cache.has(guild.id) || userBotGuilds.has(guild.id))
      marked = true;
    const emb = new MessageEmbed();
    emb.setAuthor(guild.name, guild.iconURL({ dynamic: true, size: 4096 })!);
    emb.setThumbnail(
      guild instanceof Structures.Guild
        ? guild.iconUrl!
        : guild.iconURL({ dynamic: true, size: 4096 })!
    );
    var tick = Emojis.X;
    if (
      guild instanceof Guild &&
      guild.explicitContentFilter === "MEMBERS_WITHOUT_ROLES"
    )
      tick = Emojis.CYCLONE;
    if (
      guild instanceof Guild &&
      guild.explicitContentFilter === "MEMBERS_WITHOUT_ROLES"
    )
      tick = Emojis.WHITE_CHECK_MARK;
    emb.addField(
      "❯ Server Info",
      `${Emojis.GEAR} **ID**: \`${guild.id}\`${
        guild instanceof Guild && marked
          ? `\n${CustomEmojis.GUI_OWNERCROWN} **Owner**: ${
              guild.owner
                ? guild.owner.toString()
                : "Unable to fetch guild owner"
            }`
          : ""
      }${
        marked && guild instanceof Guild
          ? `\n${
              CustomEmojis.CHANNEL_VOICE
            } ** Voice Region **: ${getGuildVoiceRegion(guild)}`
          : ""
      }
${Emojis.LINK} **Links**: [\`Icon\`](${guild.iconURL({
        dynamic: true,
        size: 4096,
      })}) ${
        guild instanceof Guild && guild.bannerURL()
          ? `| [\`Banner\`](${guild.bannerURL({ size: 4096 })})`
          : ""
      }${
        guild.discoverySplashURL()
          ? ` | [\`Discovery Splash\`](${guild.discoverySplashURL({
              size: 4096,
            })})`
          : ""
      }${
        guild.splashURL()
          ? ` | [\`Invite Splash\`](${guild.splashURL({ size: 4096 })})`
          : ""
      }
${
  guild instanceof Guild
    ? `\n${Emojis.CALENDAR} **Created**: ${simpleGetLongAgo(
        guild.createdTimestamp
      )} ago ${formatTimestamp(guild.createdAt)}`
    : ""
}${
        guild instanceof Guild
          ? `${CustomEmojis.GUI_ROLE} **Verification Level**: ${capitalizeWords(
              guild.verificationLevel.replace(/_/g, " ").toLowerCase()
            )}${guild.mfaLevel === 1 ? " (Elevated)" : ""}`
          : ""
      }${
        guild instanceof Guild && marked
          ? `\n${tick} **NSFW Content Filter**: ${capitalizeWords(
              guild.explicitContentFilter.replace(/_/g, " ").toLowerCase()
            )}`
          : ""
      }`
    );
    if (guild instanceof Guild) {
      const channels = {
        text: guild.channels.cache.filter((e) => e.type == "text").size,
        category: guild.channels.cache.filter((e) => e.type == "category").size,
        store: guild.channels.cache.filter((e) => e.type == "store").size,
        voice: guild.channels.cache.filter((e) => e.type == "voice").size,
        news: guild.channels.cache.filter((e) => e.type == "news").size,
      };
      const counts = [
        {
          text: `${Emojis.CYCLONE} **Members**: ${
            guild.members.cache.filter((e) => !e.user.bot).size
          } (${guild.members.cache.filter((e) => e.user.bot).size} bots)`,
          enabled: guild.members.cache.size > 0,
        },
        {
          text: `${Emojis.SHIELD} **Roles**: ${guild.roles.cache.size}`,
          enabled:
            guild.roles.cache.filter(
              (e) => !e.managed && guild.roles.everyone.id !== e.id
            ).size > 0,
        },
        marked
          ? {
              text: `${Emojis.HAMMER} **Bans**: ${
                (await guild.fetchBans()).size
              }`,
              enabled: (await guild.fetchBans()).size > 0,
            }
          : { text: ``, enabled: false },
        {
          text: `${Emojis.SMILEY} **Emojis**: ${guild.emojis.cache.size}`,
          enabled: guild.emojis.cache.size > 0,
        },
        marked
          ? {
              text: `${Emojis.BOOKMARK_TABS} **Integrations**: ${
                (await guild.fetchIntegrations()).size
              }`,
              enabled: (await guild.fetchIntegrations()).size > 0,
            }
          : { text: ``, enabled: false },
        {
          text: `${Emojis.BOOK} **Channels**: ${guild.channels.cache.size}
${CustomEmojis.CHANNEL_TEXT}: ${channels.text} | ${CustomEmojis.CHANNEL_CATEGORY}: ${channels.category} | ${CustomEmojis.CHANNEL_VOICE}: ${channels.voice} | ${CustomEmojis.CHANNEL_NEWS}: ${channels.news}`,
          enabled: guild.channels.cache.size > 1,
        },
      ];
      const enabled = counts
        .filter((e) => e.enabled == true)
        .map((e) => e.text);

      if (enabled.length) emb.addField("❯ Counts", enabled.join("\n"));
    }

    if (guild instanceof Guild && guild.premiumSubscriptionCount) {
      const boosters = guild.members.cache
        .filter((e) => !!e.premiumSince)
        .array();
      emb.addField(
        "❯ Server Boosts",
        `${CustomEmojis.GUI_OWNERCROWN} **Tier**: ${guild.premiumTier}
${CustomEmojis.BADGE_NITRO} **Boosts**: ${guild.premiumSubscriptionCount}
${CustomEmojis.GUI_MEMBERS} **Boosters (${boosters.length})**:
${boosters
  .map((e) => `${e} for ${simpleGetLongAgo(e.premiumSinceTimestamp!)}`)
  .slice(0, 10)
  .join("\n")} ${
          boosters.length > 10 ? `and ${boosters.length - 10} more...` : ""
        }`
      );
    }
    if (guild instanceof Guild && guild.vanityURLCode) {
      emb.addField(
        "❯ Vanity URL",
        `**Code**: [\`${guild.vanityURLCode}\`](https://discord.com/invite/${
          guild.vanityURLCode
        })
**Uses**: ${guild.vanityURLUses ?? "Unknown"}`
      );
    }
    if (guild.features.length)
      emb.addField(
        "❯ Features",
        getGuildFeatures(guild as Guild)
          .map((e) => `\`${e.text}\``)
          .join(", ")
      );
    emb.setColor(Color.embed);
    if (guild.splashURL()) emb.setImage(guild.splashURL({ size: 4096 })!);
    emb.setDescription(guild.description);
    // console.log(emb);
    await reply(message, emb);
  },
} as ICommand;
