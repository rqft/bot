import { getChannel } from "../functions/getChannel";
import { getUser } from "../functions/getUser";
import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "perm",
  usesArgs: true,
  restrictions: {},
  usage: `<type: "allow | "deny"> <channel: TextChannel> <user: User>`,
  async run(message, args) {
    const user = await getUser(message, args, false, 2);
    if (!user || !message.guild?.members.cache.has(user.id))
      return await message.channel.send("no");
    const channel = getChannel(message, args, false, 1);
    switch (args[0]) {
      case "allow":
        channel?.updateOverwrite(user, { VIEW_CHANNEL: true });
        await message.channel.send(`Added channel permission for ${user}`);
        break;
      case "deny":
        channel?.updateOverwrite(user, { VIEW_CHANNEL: false });
        await message.channel.send(`Removed channel permission for ${user}`);
        break;
      default:
        return await message.channel.send("Invalid Type");
    }
  },
} as ICommand;
