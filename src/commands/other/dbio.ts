import fetch from "node-fetch";
import { reply } from "../../handlers/command";
import { ICommand } from "../../interfaces/ICommand";
module.exports = {
  name: "dbio",
  args: [
    {
      name: "query",
      required: true,
      type: "text",
    },
  ],
  async run(message, args) {
    const query = args.join(" ");
    const dbio = await fetch(
      "https://api.discord.bio/v1/user/details/" + query
    );

    console.log(await dbio.text());

    if (dbio.status === 404) return await reply(message, "❌ Not found");

    await reply(message, await dbio.json(), { code: "json" });
  },
} as ICommand;
