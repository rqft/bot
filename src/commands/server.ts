import { MessageEmbed } from "discord.js";
import { formatTimestamp } from "../functions/formatTimestamp";
import { getGuild } from "../functions/getGuild";
import { getGuildFeatures } from "../functions/getGuildFeatures";
import { getGuildVoiceRegion } from "../functions/getGuildVoiceRegion";
import { simpleGetLongAgo } from "../functions/getLongAgo";
import { Color } from "../globals";
import { ICommand } from "../interfaces/ICommand";
import { decor } from "../maps/emojiEnum";

module.exports = {
  name: "server",
  aliases: ["s"],
  usage: "[server: Guild | Snowflake]",
  description: "get server info",
  async run(message, args: string[]) {
    const guild = await getGuild(message, args, true);
    if (!guild) return await message.channel.send("Unknown Server");
    const emb = new MessageEmbed();
    emb.setAuthor(guild.name, guild.iconURL({ dynamic: true })!);
    emb.setThumbnail(guild.iconURL({ dynamic: true })!);
    emb.addField(
      "❯ Server Info",
      `${decor.Emojis.GEAR} **ID**: \`${guild.id}\`
<:IconGui_OwnerCrown:799657143719952415> **Owner**: ${guild.owner}
<:IconChannel_Voice:798624234732781580> **Voice Region**: ${getGuildVoiceRegion(
        guild
      )}
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
      const boosters = guild.members.cache.filter((e) => !!e.premiumSince);
      emb.addField(
        "❯ Server Boosts",
        `<:IconGui_OwnerCrown:799657143719952415> **Tier**: ${guild.premiumTier}
<:IconBadge_Nitro:798624232472051792> **Boosts**: ${
          guild.premiumSubscriptionCount
        }
<:IconGui_Members:798624241868079104> **Boosters (${
          boosters.size
        })**: ${boosters.array().slice(0, 10).join(", ")} ${
          boosters.size > 10 ? `and ${boosters.size - 10} more...` : ""
        }`
      );
    }
    emb.addField("❯ Features", getGuildFeatures(guild));
    emb.setColor(Color.embed);
    await message.channel.send(emb);
  },
} as ICommand;
