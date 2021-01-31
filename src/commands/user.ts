import { MessageEmbed, User } from "discord.js";
import { client } from "..";
import { formatTimestamp } from "../functions/formatTimestamp";
import { getBotLevel } from "../functions/getBotLevel";
import { getLongAgo, simpleGetLongAgo } from "../functions/getLongAgo";
import { getPresence } from "../functions/getPresence";
import { getUserPermissions } from "../functions/getUserPermissions";
import { embedColor } from "../globals";
import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "user",
  aliases: ["u"],
  async run(message, args: string[]) {
    var unresolvedID = args[0]
      ? args[0]?.replace(/\D/g, "")
      : message.author.id;
    var user: User | null = null;
    try {
      user = await client.users.fetch(unresolvedID, true);
    } catch (error) {
      return await message.channel.send(error);
    }
    if (!user) return;
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
    emb.setColor(embedColor);
    await message.channel.send(emb);
  },
} as ICommand;
