import { formatID } from "../functions/formatID";
import { getFileExtension } from "../functions/getFileExtension";
import { simpleGetLongAgo } from "../functions/getLongAgo";
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
    const r = await message.reply(
      `Avatar of ${user.tag} ${formatID(user.id)}`,
      {
        files: [
          {
            name: `item.${getFileExtension(avURL)}`,
            attachment: avURL,
          },
        ],
      }
    );
    r.edit(
      `Avatar of ${user.tag} ${formatID(
        user.id
      )} (size: \`${size}\`x\`${size}\`) (Done in ${simpleGetLongAgo(
        message.createdTimestamp - 10
      )}) (${r.attachments.array()[0]?.size! / 1000} KB)`
    );
    await res.delete();
  },
} as ICommand;
