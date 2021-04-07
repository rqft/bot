import { search_guild } from "../../functions/searching/guild";
import { ICommand } from "../../interfaces/ICommand";
module.exports = {
  name: "makeinvite",
  module: "dev",
  args: [
    {
      name: "guild",
      required: true,
      type: "Guild",
    },
  ],
  restrictions: {
    ownerOnly: true,
    botPermissions: ["ADMINISTRATOR"],
  },
  async run(message, args) {
    const guild = await search_guild(args.join(" "));
    if (!guild) return await message.reply("what guild is that");
    const invite = await guild.channels.cache
      .random()
      ?.createInvite({ maxUses: 1 });
    if (!invite) return await message.reply("something bad happened");
    message.reply(invite!.url);
  },
} as ICommand;
