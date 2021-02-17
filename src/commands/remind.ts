import { formatTimestamp } from "../functions/formatTimestamp";
import { simpleGetLongAgo } from "../functions/getLongAgo";
import { parseTimeString } from "../functions/parseTimeString";
import { ICommand } from "../interfaces/ICommand";
module.exports = {
  name: "remind",
  aliases: ["r"],
  usage: "<time: string> [comment: text]",
  usesArgs: true,
  async run(message, args) {
    const time = args[0] ?? "5m";
    const comment = args.slice(1).join(" ");
    const ms = parseTimeString(time);
    const query = {
      executedAt: new Date(),
      user: message.author,
      comment: comment,
      expiry: Date.now() + ms,
    };
    await message.channel.send(
      `:white_check_mark: I will remind you in ${simpleGetLongAgo(
        Date.now() - ms
      )} ${formatTimestamp(query.expiry)}`
    );

    setTimeout(
      async () =>
        await message.channel.send(
          `Hey ${
            query.user
          }! You told me at \`${query.executedAt.toLocaleString()}\` (${simpleGetLongAgo(
            +query.executedAt
          )} ago) to remind you about${
            query.comment
              ? `: ${
                  query.comment.length > 50
                    ? `\`\`\`\n${query.comment}\`\`\``
                    : `\`${query.comment}\``
                } `
              : " something!"
          }`
        ),
      query.expiry - Date.now()
    );
  },
} as ICommand;
