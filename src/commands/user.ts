import { MessageEmbed, User } from "discord.js";
import { client } from "..";
import { formatTimestamp } from "../functions/formatTimestamp";
import { getBotLevel } from "../functions/getBotLevel";
import { getLongAgo, simpleGetLongAgo } from "../functions/getLongAgo";
import { getPresence } from "../functions/getPresence";
import { getProfileBadges } from "../functions/getProfileBadges";
import { getUserPermissions } from "../functions/getUserPermissions";
import { ICommand } from "../interfaces/ICommand";
import { embedColor } from "../logs/globals";

module.exports = {
  name: "user",
  aliases: ["u"],
  usage: "[user]",
  async run(message, args: string[]) {
    if (args[0]?.toLowerCase() == "discord") args[0] = "643945264868098049";
    if (args[0]?.toLowerCase() == "me") args[0] = message.author.id;
    if (args[0]?.toLowerCase() == "bot" || args[0]?.toLowerCase() == "system")
      args[0] = client.user?.id!;
    if (args[0]?.toLowerCase() == "random") {
      if (!message.guild) {
        return await message.channel.send(
          "You need to be in a server to run this!"
        );
      }
      args[0] = message.guild.members.cache.random().id;
    }
    var unresolvedID = args[0]
      ? args[0]?.replace(/\D/g, "")
      : message.author.id;
    var user: User | null = null;
    try {
      user = await client.users.fetch(unresolvedID, true);
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
      }) ?? user.defaultAvatarURL
    );
    emb.addField(
      `❯ User Info`,
      `:gear: **󠇰ID**: \`${user.id}\`
:link: **Profile**: ${user}
:calendar_spiral: **Created**: ${simpleGetLongAgo(
        user.createdTimestamp
      )} ${formatTimestamp(user.createdAt)}`
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
        )} ${formatTimestamp(mem.joinedAt!)}
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
    }
    emb.addField("❯ Profile Badges", getProfileBadges(user));
    emb.setColor(embedColor);
    await message.channel.send(emb);
  },
} as ICommand;
