import { Emojis } from "../../enums/emojis";
import { getBotLevel } from "../../functions/getBotLevel";
import { checkTargets } from "../../functions/targeting/checkTargets";
import globalConf from "../../globalConf";
import { ICommand } from "../../interfaces/ICommand";
module.exports = {
  name: "test",
  restrictions: {
    level: 0,
  },
  args: [
    {
      name: "user",
      required: false,
      type: "User",
    },
  ],
  async run(message, args) {
    const user = args![0]
      ? (await message.guild?.members.fetch(args![0].replace(/\D/g, ""))) ??
        message.member!
      : message.member!;

    const bl = getBotLevel(user!);
    const tg = checkTargets(message.member!, user);
    if (!tg.checks.globalAdm || !tg.checks.level || !tg.checks.roles)
      return message.reply(tg.messages.join("\n"));
    const globaladm = globalConf.ownerIDs.includes(message.member!.id)
      ? `and are a global admin!`
      : "";
    await message.reply(`${Emojis.WHITE_CHECK_MARK} Test complete. (this doesn't actually do anything)
${user}'s bot level is **${bl}** ${globaladm}`);
  },
} as ICommand;
