import { simpleGetLongAgo } from "../../functions/getLongAgo";
import { parseBlock } from "../../functions/parseBlock";
import { parseTimeString, timeUnits } from "../../functions/parseTimeString";
import { replacer } from "../../functions/replacer";
import { ICommand } from "../../interfaces/ICommand";
import { messages } from "../../messages";
module.exports = {
  name: "remind",
  args: [
    {
      name: "time",
      required: true,
      type: "timeString",
    },
    {
      name: "comment",
      required: true,
      type: "text",
    },
  ],
  async run(message, args) {
    const time = args[0] ?? "5m";
    const comment = args.slice(1).join(" ");
    const ms = parseTimeString(time);
    if (!ms || ms > timeUnits.w)
      return await message.reply(
        messages.commands.other.reminder.reminder_time_limit
      );
    const query = {
      executedAt: new Date(),
      user: message.author,
      comment: comment,
      expiry: Date.now() + ms,
      duration: ms,
    };
    await message.reply(
      replacer(messages.commands.other.reminder.will_remind_in, [
        ["{DURATION}", simpleGetLongAgo(Date.now() - query.duration)],
      ])
    );
    setTimeout(
      async () =>
        await message.channel.send({
          content: replacer(messages.commands.other.reminder.remind_message, [
            ["{USER_MENTION}", query.user.toString()],
            ["{TIME_UTC}", query.executedAt.toUTCString()],
            ["{TIME_AGO}", simpleGetLongAgo(+query.executedAt)],
            ["{REMINDER_TEXT}", parseBlock(query.comment)],
          ]),
          allowedMentions: {
            users: [message.author.id],
          },
        }),
      query.expiry - Date.now()
    );
  },
} as ICommand;
