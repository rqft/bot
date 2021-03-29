import { TextChannel } from "discord.js";
import { parseTimeString } from "../../functions/parseTimeString";
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
    const slowmd = parseTimeString(args[0]!) / 1000;
    const target = args[1]
      ? await search_channel(args[1], message.guild!)
      : message.channel;
    if (!target) return await message.reply("❌ Unable to find that channel");
    if (!(target instanceof TextChannel))
      return await message.reply("❌ Cannot set slowmode of non-text channels");
    if (target.rateLimitPerUser == slowmd)
      return await message.reply("❌ Channel is already at this slowmode");
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
        ["{TIME}", (args[0] ?? 0).toString()],
      ])
    );
    const chosen = replacer(
      slowmd === 0
        ? messages.commands.admin.slowmode.slowmode_disabled
        : messages.commands.admin.slowmode.slowmode_enabled,
      [
        ["{ACTOR}", message.member!.toString()],
        ["{TIME}", (args[0] ?? 0).toString()],
      ]
    );
    await target.send(chosen);
  },
} as ICommand;
