import { Guild, MessageEmbed } from "discord.js";
import { client } from "..";
import { formatTimestamp } from "../functions/formatTimestamp";
import { getGuildFeatures } from "../functions/getGuildFeatures";
import { getGuildVoiceRegion } from "../functions/getGuildVoiceRegion";
import { simpleGetLongAgo } from "../functions/getLongAgo";
import { ICommand } from "../interfaces/ICommand";
import { embedColor } from "../logs/globals";

module.exports = {
  name: "server",
  aliases: ["s"],
  usage: "[server]",
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
      `:gear: **ID**: ${guild.id},
<:IconGui_OwnerCrown:799657143719952415> **Owner**: ${guild.owner}
<:IconChannel_Voice:798624234732781580> **Voice Region**: ${getGuildVoiceRegion(
        guild
      )}
:calendar_spiral: **Created**: ${simpleGetLongAgo(
        guild.createdTimestamp
      )} ${formatTimestamp(guild.createdAt)}`
    );
    emb.addField("❯ Server Info", getGuildFeatures(guild));
    emb.setColor(embedColor);
    await message.channel.send(emb);
  },
} as ICommand;
