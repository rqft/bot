import { TextChannel } from "discord.js";
import { replacer } from "../../functions/replacer";
import { search_channel } from "../../functions/searching/channel";
import { ICommand } from "../../interfaces/ICommand";
import { messages } from "../../messages";
module.exports = {
  name: "slowmode",
  args: [
    { name: "slowmode", required: true, type: "number" },
    { name: "target", required: false, type: "TextChannel" },
  ],
  restrictions: {
    level: 30,
    botPermissions: ["MANAGE_CHANNELS"],
  },
  async run(message, args) {
    const slowmd = parseInt(args[0]!) ?? undefined;
    const target = args[1]
      ? await search_channel(args[1], message.guild!)
      : message.channel;
    if (!target) return await message.reply("❌ Unable to find that channel");
    if (!(target instanceof TextChannel))
      return await message.reply("❌ Cannot set slowmode of non-text channels");
    try {
      target.setRateLimitPerUser(slowmd);
    } catch {
      return await message.reply(
        messages.commands.admin.slowmode.slowmode_failed
      );
    }
    await message.reply(
      replacer(messages.commands.admin.slowmode.slowmode_cmd, [
        ["{CHANNEL}", target.toString()],
        ["{SECONDS}", (slowmd ?? 0).toString()],
      ])
    );
    const chosen = replacer(
      slowmd === 0
        ? messages.commands.admin.slowmode.slowmode_disabled
        : messages.commands.admin.slowmode.slowmode_enabled,
      [
        ["{ACTOR}", message.member!.toString()],
        ["{SECONDS}", slowmd.toString()],
      ]
    );
    await target.send(chosen);
  },
} as ICommand;
