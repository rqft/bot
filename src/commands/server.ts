import { Guild, MessageEmbed } from "discord.js";
import { client } from "..";
import { formatTimestamp } from "../functions/formatTimestamp";
import { getGuildFeatures } from "../functions/getGuildFeatures";
import { getGuildVoiceRegion } from "../functions/getGuildVoiceRegion";
import { simpleGetLongAgo } from "../functions/getLongAgo";
import { Color } from "../globals";
import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "server",
  aliases: ["s"],
  usage: "[server: Guild | Snowflake]",
  async run(message, args: string[]) {
    if (!args[0] && !message.guild)
      return await message.channel.send("You need to provide a server!");
    const s = args[0] ? args[0].replace(/\D/g, "") : message.guild!.id;
    var guild: Guild | null = null;
    try {
      guild = await client.guilds.fetch(s);
    } catch {
      return await message.channel.send("Unknown server");
    }
    if (!guild) return;
    const emb = new MessageEmbed();
    emb.setAuthor(guild.name, guild.iconURL({ dynamic: true })!);
    emb.setThumbnail(guild.iconURL({ dynamic: true })!);
    emb.addField(
      "❯ Server Info",
      `:gear: **ID**: \`${guild.id}\`
<:IconGui_OwnerCrown:799657143719952415> **Owner**: ${guild.owner}
<:IconChannel_Voice:798624234732781580> **Voice Region**: ${getGuildVoiceRegion(
        guild
      )}
:calendar_spiral: **Created**: ${simpleGetLongAgo(
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
    emb.addField("❯ Features", getGuildFeatures(guild));
    emb.setColor(Color.embed);
    await message.channel.send(emb);
  },
} as ICommand;
