import { User } from "discord.js";
import { client } from "..";
import { getFileExtension } from "../functions/getFileExtension";
import { simpleGetLongAgo } from "../functions/getLongAgo";
import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "avatar",
  aliases: ["av"],
  usage: "[user: User | Snowflake]",
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
    } catch (error) {
      return await message.channel.send(error);
    }
    if (!user) return;
    const res = await message.channel.send("...");
    const avURL =
      user.avatarURL({ dynamic: true, size: 4096 }) ?? user.defaultAvatarURL;
    await message.channel.send(
      `Here you go! (Done in ${simpleGetLongAgo(message.createdTimestamp)})`,
      {
        files: [
          {
            name: `item.${getFileExtension(avURL)}`,
            attachment: avURL,
          },
        ],
      }
    );
    await res.delete();
  },
} as ICommand;
