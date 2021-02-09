import { MessageEmbed, User } from "discord.js";
import { client } from "..";
import { formatTimestamp } from "../functions/formatTimestamp";
import { getBotBadges } from "../functions/getBotBadges";
import { getBotLevel } from "../functions/getBotLevel";
import { getLongAgo, simpleGetLongAgo } from "../functions/getLongAgo";
import { getPresence } from "../functions/getPresence";
import { getProfileBadges } from "../functions/getProfileBadges";
import { getUserPermissions } from "../functions/getUserPermissions";
import { Color } from "../globals";
import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "user",
  aliases: ["u"],
  usage: "[user: User | Snowflake]",
  async run(message, args: string[]) {
    var res = args.join(" ")?.normalize()!;
    if (!res) res = message.author.id;
    if (res?.toLowerCase() == "discord") res = "643945264868098049";
    if (res?.toLowerCase() == "me") res = message.author.id;
    if (res?.toLowerCase() == "bot" || res?.toLowerCase() == "system")
      res = client.user?.id!;
    if (res?.toLowerCase() == "random") {
      if (!message.guild) {
        return await message.channel.send(
          "You need to be in a server to run this!"
        );
      }
      res = message.guild.members.cache.random().id;
    }
    if (res?.toLowerCase() == "owner") {
      if (!message.guild) {
        return await message.channel.send(
          "You need to be in a server to run this!"
        );
      }
      res = message.guild.ownerID;
    }
    var unresolvedID = args.join(" ").length
      ? res.toLowerCase()
      : message.author.id;
    var user: User | null = null;
    try {
      user =
        client.users.cache.find((u) => {
          return (
            unresolvedID == u.username.toLowerCase() ||
            unresolvedID.replace(/\D/g, "") == u.id ||
            unresolvedID == u.tag.toLowerCase()
          );
        })! ?? (await client.users.fetch(unresolvedID));
    } catch (error) {}
    if (!user) {
      return await message.channel.send("Unknown User");
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
        size: 512,
      }) ?? user.defaultAvatarURL
    );
    emb.addField(
      `❯ User Info`,
      `:gear: **󠇰ID**: \`${user.id}\`
:link: **Profile**: ${user}
:calendar_spiral: **Created**: ${simpleGetLongAgo(
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
    emb.addField("❯ Profile Badges", getProfileBadges(user));
    emb.addField("❯ Bot Badges", getBotBadges(user));
    emb.setColor(Color.embed);
    await message.channel.send(emb);
  },
} as ICommand;
