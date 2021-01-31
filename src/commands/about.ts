import { MessageEmbed } from "discord.js";
import { client } from "..";
import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "about",
  usesArgs: false,
  description: "Info about the bot",
  async run(message) {
    message.channel.send(
      new MessageEmbed({
        fields: [
          {
            name: "About",
            value: `Hi! This is a bot made by ${
              (await client.fetchApplication()).owner
            } made with [DiscordJS](https://discord.js.org/#/) and a stupid idea.

You can invite the bot to your server [here]`,
          },
        ],
      })
    );
  },
} as ICommand;
