import { getChannel } from "../functions/getChannel";
import { getUser } from "../functions/getUser";
import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "perm",
  usesArgs: true,
  description: "allow or deny people access to certain channels",
  restrictions: {},
  usage: `<type: "allow | "deny"> <channel: TextChannel> <user: User>`,
  async run(message, args) {
    const user = await getUser(message, args, false, 2);
    if (!user || !message.guild?.members.cache.has(user.id)) return;
    const channel = getChannel(message, args, false, 1);
    switch (args[0]) {
      case "allow":
        channel?.updateOverwrite(user, { VIEW_CHANNEL: true });
        await message.reply(`Added channel permission for ${user}`);
        break;
      case "deny":
        channel?.updateOverwrite(user, { VIEW_CHANNEL: false });
        await message.reply(`Removed channel permission for ${user}`);
        break;
      default:
        return await message.reply("Invalid Type");
    }
  },
} as ICommand;
