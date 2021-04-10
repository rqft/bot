import { simpleGetLongAgo } from "../../functions/getLongAgo";
import { search_user } from "../../functions/searching/user";
import { reply } from "../../handlers/command";
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
    if (!u) return await reply(message, messages.targeting.not_found.user);
    await reply(
      message,

      `${u.toString()}'s account was made on ${u.createdAt.toLocaleString()} (${simpleGetLongAgo(
        u.createdTimestamp
      )} ago)`
    );
  },
} as ICommand;
