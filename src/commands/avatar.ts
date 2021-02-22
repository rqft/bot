import { formatID } from "../functions/formatID";
import { getUser } from "../functions/getUser";
import { ICommand } from "../interfaces/ICommand";
import { CustomEmojis } from "../maps/customEmojis";
const sizes = [16, 32, 64, 128, 256, 512, 1024, 2048, 4096];
type avatarSize = 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096;
module.exports = {
  name: "avatar",
  aliases: ["av"],
  description: "get a users avatar",
  usage: "[user: User | Snowflake] [size: AvatarSize]",
  async run(message, args: string[]) {
    const size = args[1] ? parseInt(args[1]) : 128;
    if (!sizes.includes(size))
      return await message.reply(
        `You can't choose this! Valid options are: ${sizes
          .map((e) => `\`${e}\``)
          .join(", ")}`
      );

    const user = await getUser(message, args, false);
    if (!user) {
      return await message.reply("Unknown User");
    }
    const res = await message.reply(CustomEmojis.GUI_TYPING);
    const avURL =
      user.avatarURL({ dynamic: true, size: size as avatarSize }) ??
      user.defaultAvatarURL;
    await message.reply(
      `Avatar of ${user.tag} ${formatID(user.id)}
${avURL}`
    );
    await res.delete();
  },
} as ICommand;
