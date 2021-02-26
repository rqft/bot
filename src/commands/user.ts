import { MessageEmbed } from "discord.js";
import { client } from "..";
import { capitalizeWords } from "../functions/capitalizeWords";
import { formatTimestamp } from "../functions/formatTimestamp";
import { getBotBadges } from "../functions/getBotBadges";
import { getBotLevel } from "../functions/getBotLevel";
import { getLongAgo, simpleGetLongAgo } from "../functions/getLongAgo";
import { getPresence } from "../functions/getPresence";
import { getProfileBadges } from "../functions/getProfileBadges";
import { getUser } from "../functions/getUser";
import { getUserPermissions } from "../functions/getUserPermissions";
import { Color } from "../globals";
import { ICommand } from "../interfaces/ICommand";
import { decor } from "../maps/emojiEnum";

module.exports = {
  name: "user",
  aliases: ["u"],
  usage: "[user: User | Snowflake]",
  description: "get user info",
  async run(message, args: string[]) {
    const user = await getUser(message, args, true);
    if (!user) {
      return await message.reply(`${decor.Emojis.WARNING} Unknown User`);
    }
    const emb = new MessageEmbed();
    emb.setAuthor(
      user.tag,
      user.avatarURL({
        dynamic: true,
      }) ?? user.defaultAvatarURL
    );
    emb.setThumbnail(
      user.avatarURL({
        dynamic: true,
        size: 128,
      }) ?? user.defaultAvatarURL
    );
    emb.addField(
      `❯ User Info`,
      `${decor.Emojis.GEAR} **󠇰ID**: \`${user.id}\`
${decor.Emojis.LINK} **Profile**: ${user}
${decor.Emojis.CALENDAR_SPIRAL} **Created**: ${simpleGetLongAgo(
        user.createdTimestamp
      )} ago ${formatTimestamp(user.createdAt)}`
    );
    var mem = message.guild?.members.cache.get(user.id) ?? false;
    if (user.presence.guild) emb.addField("❯ Presence", getPresence(user));
    if (mem) {
      const voice = {
        deaf: mem.voice.deaf
          ? `${mem.voice.serverDeaf ? "Server" : "Self"} Deafened`
          : "Undeafened",
        channel: mem.voice.channel ? mem.voice.channel.name : "Unknown Channel",
        mute: mem.voice.mute
          ? `${mem.voice.serverMute ? "Server" : "Self"} Muted`
          : "Unmuted",
        speaking: mem.voice.speaking ? "Speaking" : "",
        streaming: mem.voice.streaming ? "Streaming" : "",
        video: mem.voice.selfVideo ? "On Video" : "",
      };
      const joinedVoice = [
        `${voice.channel}`,
        voice.deaf,
        voice.mute,
        voice.speaking,
        voice.streaming,
        voice.video,
      ]
        .filter((e) => e != "")
        .map((e) => `\`${e}\``)
        .join(", ");
      const roles = mem.roles.cache
        .filter((e) => !e.deleted && e.guild.id !== e.id)
        .array()
        .sort((a, b) => a.position - b.position);
      emb.addField(
        "❯ Member Information",
        `${decor.Emojis.INBOX_TRAY} **Joined:** ${getLongAgo(
          mem.joinedTimestamp!,
          2
        )} ago ${formatTimestamp(mem.joinedAt!)} ${
          mem.pending ? `(Currently Pending)` : ""
        }${
          mem.nickname
            ? `\n${decor.Emojis.PENCIL2} **Nickname**: ${mem.nickname}`
            : ""
        }${
          roles.length !== 0
            ? `\n${decor.Emojis.SHIELD} **Roles** (${
                roles.length
              }): ${roles.slice(0, 10).join(", ")}${
                roles.length > 10 ? `\nand ${roles.length - 10} more...` : ""
              }`
            : ""
        }${
          mem.lastMessage
            ? `\n${decor.Emojis.SPEECH_BALLOON} **Last Message**: [\`${
                mem.lastMessage?.cleanContent.slice(0, 30) +
                (mem.lastMessage?.cleanContent.length! > 30 ? "..." : "")
              }\`](${mem.lastMessage?.url}) in <#${mem.lastMessageChannelID}>`
            : ""
        }${
          mem.voice.channel
            ? `\n${decor.Emojis.TELEPHONE} **Voice**: In ${joinedVoice}`
            : ""
        }`
      );
      emb.addField(
        "❯ Permissions",
        `${decor.Emojis.GEAR} **Permission List**: ${getUserPermissions(mem)
          .map(
            (e) => `\`${capitalizeWords(e.toLowerCase().replace(/_/g, " "))}\``
          )
          .join(", ")}
${decor.Emojis.CYCLONE} **Bot Level**: __\`${getBotLevel(mem)}\`__`
      );
      if (
        (await mem.guild.fetchInvites())
          .array()
          .filter((e) => e.inviter == user).length
      )
        emb.addField(
          "❯ Invites",
          (await mem.guild.fetchInvites())
            .array()
            .filter((e) => e.inviter == user).length
            ? (await mem.guild.fetchInvites())
                .array()
                .filter((e) => e.inviter == user)
                .slice(0, 5)
                .map(
                  (e) =>
                    `${e.channel} [Invite](${e.url}) ${formatTimestamp(
                      e.createdAt!
                    )}`
                )
                .join("\n")
            : "None."
        );
    }
    if (user.flags?.toArray().length)
      emb.addField("❯ Profile Badges", getProfileBadges(user).join("\n"));
    if (getBotBadges(user).length)
      emb.addField("❯ Bot Badges", getBotBadges(user));
    const seenOn = client.guilds.cache
      .filter((e) => e.members.cache.has(user.id))
      .array();
    if (seenOn.length) {
      emb.addField(
        `❯ Seen on ${seenOn.length} server${seenOn.length !== 1 ? "s" : ""}`,
        `${seenOn
          .slice(0, 3)
          .map(
            (e) =>
              `*${e.name}* ${
                e.members.cache.get(user.id)?.nickname
                  ? `as \`${e.members.cache.get(user.id)?.displayName}\``
                  : ""
              }`
          )
          .join("\n")}${
          seenOn.length > 3 ? `\nand ${seenOn.length - 3} more...` : ""
        }`
      );
    }
    emb.setColor(Color.embed);
    await message.reply(emb);
  },
} as ICommand;
