import { MessageEmbed } from "discord.js";
import { client } from "../..";
import { CustomEmojis } from "../../enums/customEmojis";
import { Emojis } from "../../enums/emojis";
import { capitalizeWords } from "../../functions/capitalizeWords";
import { formatTimestamp } from "../../functions/formatTimestamp";
import { getBotLevel } from "../../functions/getBotLevel";
import { getLongAgo, simpleGetLongAgo } from "../../functions/getLongAgo";
import { getPresence } from "../../functions/getPresence";
import { getProfileBadges } from "../../functions/getProfileBadges";
import { getUserPermissions } from "../../functions/getUserPermissions";
import { search_user } from "../../functions/searching/user";
import globalConf from "../../globalConf";
import { Color } from "../../globals";
import { ICommand } from "../../interfaces/ICommand";
import { messages } from "../../messages";

module.exports = {
  name: "user",
  aliases: ["u"],
  args: [
    {
      name: "target",
      required: false,
      type: "User | GuildMember",
    },
  ],
  async run(message, args: string[]) {
    var user = await search_user(args[0] ? args.join(" ") : message.member!.id);
    try {
      user = await client.users.fetch(
        args[0] ? args.join(" ") : message.member!.id
      );
    } catch {
      return await message.reply(messages.targeting.not_found.user);
    }
    if (!user) {
      return await message.reply(messages.targeting.not_found.user);
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
      `${Emojis.GEAR} **󠇰ID**: \`${user.id}\`
${Emojis.LINK} **Profile**: ${user}
${Emojis.CALENDAR_SPIRAL} **Created**: ${simpleGetLongAgo(
        user.createdTimestamp
      )} ago ${formatTimestamp(user.createdAt)}
${
  user.bot ? CustomEmojis.GUI_SETTINGS : CustomEmojis.GUI_ROLE
} **Account Type**: ${user.bot ? `Bot` : `User`}`
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
        `${Emojis.INBOX_TRAY} **Joined:** ${getLongAgo(
          mem.joinedTimestamp!,
          2
        )} ago ${formatTimestamp(mem.joinedAt!)} ${
          mem.pending ? `(Currently Pending)` : ""
        }${
          mem.nickname
            ? `\n${Emojis.PENCIL2} **Nickname**: \`${mem.nickname}\``
            : ""
        }${
          mem.displayColor
            ? `\n${Emojis.PAINTBRUSH} **Custom Color**: \`${mem.displayHexColor}\``
            : ""
        }${
          mem.voice.channel
            ? `\n${Emojis.TELEPHONE} **Voice**: In ${joinedVoice}`
            : ""
        }${
          roles.length !== 0
            ? `\n${Emojis.SHIELD} **Roles** (${roles.length}): ${roles
                .slice(0, 10)
                .join(" ")}${
                roles.length > 10 ? `\nand ${roles.length - 10} more...` : ""
              }`
            : ""
        }`
      );
      emb.addField(
        "❯ Permissions",
        `${Emojis.GEAR} **Permission List**: ${getUserPermissions(mem)
          .map(
            (e) => `\`${capitalizeWords(e.toLowerCase().replace(/_/g, " "))}\``
          )
          .join("  ")}
${Emojis.CYCLONE} **Bot Level**: __\`${getBotLevel(mem).level}\`__ (${
          getBotLevel(mem).type
        })`
      );
    }
    if (user.flags?.toArray().length)
      emb.addField("❯ Profile Badges", getProfileBadges(user).join("\n"));
    if (globalConf.badges[user.id])
      emb.addField("❯ Bot Badges", globalConf.badges[user.id]?.join("\n"));
    emb.setColor(Color.embed);
    await message.reply(emb);
  },
} as ICommand;
