import { MessageEmbed } from "discord.js";
import { config } from "../config";
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
      return await message.channel.send(`${decor.Emojis.WARNING} Unknown User`);
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
    var mem = message.guild?.member(user) ?? false;

    if (mem) {
      emb.addField("❯ Presence", getPresence(user, 30));
      const roles = mem.roles.cache.filter(
        (e) => !e.deleted && e.guild.id !== e.id
      );
      emb.addField(
        "❯ Member Information",
        `:inbox_tray: **Joined:** ${getLongAgo(
          mem.joinedTimestamp!,
          2
        )} ago ${formatTimestamp(mem.joinedAt!)}
${
  roles.size !== 0
    ? `:shield: **Roles** (${roles.size}): ${roles.array().join(", ")}`
    : ""
}`
      );
      emb.addField(
        "❯ Permissions",
        `:gear: **Permission List**: ${getUserPermissions(mem)}
        :cyclone: **Bot Level**: __\`${getBotLevel(mem)}\`__`
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
    emb.addField(
      "❯ Profile Badges",
      getProfileBadges(user).join("\n") +
        (user.id == config.bot.application.ownerId
          ? `\n<:IconBadge_BotDeveloper:798624232443478037> Very Real Bot Developer\™️`
          : "")
    );
    emb.addField("❯ Bot Badges", getBotBadges(user));
    emb.setColor(Color.embed);
    await message.channel.send(emb);
  },
} as ICommand;
