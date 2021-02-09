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

    await message.channel.send(
      `:white_check_mark: I will remind you in ${simpleGetLongAgo(
        Date.now() - ms
      )} ${formatTimestamp(new Date(Date.now() + ms))}`
    );
    const exec = Date.now();
    setTimeout(
      async () =>
        await message.channel.send(
          `Hey ${
            message.author
          }! You told me at \`${message.createdAt.toLocaleString()}\` (${simpleGetLongAgo(
            exec
          )} ago) to remind you about${
            comment ? `: \`${comment}\`` : " something!"
          }`
        ),
      ms
    );
  },
} as ICommand;
