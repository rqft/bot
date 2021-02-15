import { MessageEmbed } from "discord.js";
import { client } from "..";
import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "discrim",
  description:
    "Find users with a certain discriminator (#XXXX, defaults to yours)",
  usage: "[user: User]",
  async run(message, args) {
    const discrim = args[0]?.replace(/\D/g, "") ?? message.author.discriminator;
    const users = client.users.cache
      .filter((e) => e.discriminator.includes(discrim))
      .array()
      .map((e) => `**${e.username}**#${e.discriminator}`);
    await message.channel.send(
      new MessageEmbed({
        title: `Users with discrim #${discrim}`,
        description:
          `${users.length} Users Found\n\n` + users.length
            ? users.join("\n")
            : "",
        footer: { text: `${client.users.cache.size} users checked total` },
      })
    );
  },
} as ICommand;
