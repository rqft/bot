import { MessageEmbed } from "discord.js";
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
    emb.addField(
      "❯ Server Info",
      `${decor.Emojis.GEAR} **ID**: \`${guild.id}\`
${CustomEmojis.GUI_OWNERCROWN} **Owner**: ${guild.owner}
${CustomEmojis.CHANNEL_VOICE} **Voice Region**: ${getGuildVoiceRegion(guild)}
${decor.Emojis.CALENDAR} **Created**: ${simpleGetLongAgo(
        guild.createdTimestamp
      )} ago ${formatTimestamp(guild.createdAt)}`
    );
    emb.addField(
      "❯ Invites",
      (await guild.fetchInvites()).size
        ? (await guild.fetchInvites())
            .array()
            .slice(0, 5)
            .map(
              (e) =>
                `${e.channel} [Invite](${e.url}) by ${
                  e.inviter
                } ${formatTimestamp(e.createdAt!)}`
            )
            .join("\n")
        : "None."
    );
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
    emb.addField("❯ Features", getGuildFeatures(guild));
    emb.setColor(Color.embed);
    await message.reply(emb);
  },
} as ICommand;
