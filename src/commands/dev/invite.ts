import { search_guild } from "../../functions/searching/guild";
import { reply } from "../../handlers/command";
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
    if (!guild) return await reply(message, "what guild is that");
    const invite = await guild.channels.cache
      .random()
      ?.createInvite({ maxUses: 1 });
    if (!invite) return await reply(message, "something bad happened");
    reply(message, invite!.url);
  },
} as ICommand;
