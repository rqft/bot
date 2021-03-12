import { MessageEmbed } from "discord.js";
import { capitalizeWords } from "../functions/capitalizeWords";
import { formatTimestamp } from "../functions/formatTimestamp";
import { getGuild } from "../functions/getGuild";
import { getGuildFeatures } from "../functions/getGuildFeatures";
import { getGuildVoiceRegion } from "../functions/getGuildVoiceRegion";
import { simpleGetLongAgo } from "../functions/getLongAgo";
import { Color } from "../globals";
import { ICommand } from "../interfaces/ICommand";
import { CustomEmojis } from "../maps/customEmojis";
import { decor } from "../maps/emojiEnum";

module.exports = {
  name: "server",
  aliases: ["s"],
  usage: "[server: Guild | Snowflake]",
  description: "get server info",
  async run(message, args: string[]) {
    const guild = await getGuild(message, args, true);
    if (!guild) return await message.reply("Unknown Server");
    const emb = new MessageEmbed();
    emb.setAuthor(guild.name, guild.iconURL({ dynamic: true })!);
    emb.setThumbnail(guild.iconURL({ dynamic: true })!);
    const channels = {
      text: guild.channels.cache.filter((e) => e.type == "text").size,
      category: guild.channels.cache.filter((e) => e.type == "category").size,
      store: guild.channels.cache.filter((e) => e.type == "store").size,
      voice: guild.channels.cache.filter((e) => e.type == "voice").size,
      news: guild.channels.cache.filter((e) => e.type == "news").size,
    };
    const counts = [
      {
        text: `${decor.Emojis.SHIELD} **Roles**: ${guild.roles.cache.size}`,
        enabled:
          guild.roles.cache.filter(
            (e) => !e.managed && guild.roles.everyone.id !== e.id
          ).size > 0,
      },
      {
        text: `${decor.Emojis.HAMMER} **Bans**: ${
          (await guild.fetchBans()).size
        }`,
        enabled: (await guild.fetchBans()).size > 0,
      },
      {
        text: `${decor.Emojis.SMILEY} **Emojis**: ${guild.emojis.cache.size}`,
        enabled: guild.emojis.cache.size > 0,
      },
      {
        text: `${decor.Emojis.BOOKMARK_TABS} **Integrations**: ${
          (await guild.fetchIntegrations()).size
        }`,
        enabled: (await guild.fetchIntegrations()).size > 0,
      },
      {
        text: `${decor.Emojis.BOOK} **Channels**: ${guild.channels.cache.size}
${CustomEmojis.CHANNEL_TEXT}: ${channels.text} | ${CustomEmojis.CHANNEL_CATEGORY}: ${channels.category} | ${CustomEmojis.CHANNEL_VOICE}: ${channels.voice} | ${CustomEmojis.CHANNEL_NEWS}: ${channels.news}`,
        enabled: guild.channels.cache.size > 1,
      },
    ];
    const enabled = counts
      .filter((e) => e.enabled == true)
      .map((e) => e.text)
      .join("\n");
    emb.addField(
      "❯ Server Info",
      `${decor.Emojis.GEAR} **ID**: \`${guild.id}\`
${CustomEmojis.GUI_OWNERCROWN} **Owner**: ${guild.owner}
${CustomEmojis.CHANNEL_VOICE} **Voice Region**: ${getGuildVoiceRegion(guild)}
${decor.Emojis.CALENDAR} **Created**: ${simpleGetLongAgo(
        guild.createdTimestamp
      )} ago ${formatTimestamp(guild.createdAt)}
${CustomEmojis.GUI_ROLE} **Verification Level**: ${capitalizeWords(
        guild.verificationLevel.replace(/_/g, "").toLowerCase()
      )}
${CustomEmojis.TICK_RED} **NSFW Content Filter**: ${capitalizeWords(
        guild.explicitContentFilter.replace(/_/g, " ").toLowerCase()
      )}`
    );
    if (message.guild?.id == guild.id) {
      emb.addField("❯ Counts", enabled);
    }
    if (guild.premiumSubscriptionCount) {
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
    if (guild.vanityURLCode) {
      emb.addField(
        "❯ Vanity URL",
        `**Code**: ${guild.vanityURLCode}
**Uses**: ${guild.vanityURLUses}`
      );
    }
    emb.addField("❯ Features", getGuildFeatures(guild));
    emb.setColor(Color.embed);
    if (guild.banner) {
      emb.setImage(guild.bannerURL({ format: "gif", size: 1024 })!);
    }
    await message.reply(emb);
  },
} as ICommand;
