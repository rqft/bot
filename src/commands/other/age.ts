import { simpleGetLongAgo } from "../../functions/getLongAgo";
import { search_user } from "../../functions/searching/user";
import { ICommand } from "../../interfaces/ICommand";
import { messages } from "../../messages";
module.exports = {
  name: "age",
  args: [
    {
      name: "user",
      required: true,
      type: "User",
    },
  ],
  async run(message, args) {
    const u = await search_user(args.join(" "));
    if (!u) return await message.reply(messages.targeting.not_found.user);
    await message.reply(
      `${u.toString()}'s account was made on ${u.createdAt.toLocaleString()} (${simpleGetLongAgo(
        u.createdTimestamp
      )} ago)`
    );
  },
} as ICommand;
