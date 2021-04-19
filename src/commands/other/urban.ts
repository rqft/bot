import { api } from "../../functions/api";
import { reply } from "../../handlers/command";
import { ICommand } from "../../interfaces/ICommand";
import { messages } from "../../messages";
module.exports = {
  name: "urban",
  args: [
    {
      name: "query",
      type: "text",
      required: true,
    },
  ],
  async run(message, args) {
    const query: string = args.join(" ");
    const urban_api = "http://api.urbandictionary.com/v0/define?term=";
    const data = await api(urban_api + encodeURIComponent(query), "json");
    if (!data) return await reply(message, messages);
  },
} as ICommand;
