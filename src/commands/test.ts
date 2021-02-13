import { client } from "..";
import { getUser } from "../functions/getUser";
import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "test",
  description: "TESTING",
  restrictions: {
    ownerOnly: true,
  },
  async run(message, args) {
    const user = await getUser(message, args, true);
    const guilds = client.guilds.cache.filter(
      (guild) =>
        !!guild.member(message.author) && !!guild.member(user ?? message.author)
    );
    await message.channel.send(
      `You share **${guilds.size}** server${
        guilds.size > 1 ? "s" : ""
      } with ${user}!\n${guilds
        .array()
        .map((e) => `\`${e.name.padEnd(40)}\`**[**||\`${e.id}\`||**]**`)
        .join("\n")}`
    );
  },
} as ICommand;
