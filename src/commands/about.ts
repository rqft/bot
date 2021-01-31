import { MessageEmbed } from "discord.js";
import { client, commands } from "..";
import { formatTimestamp } from "../functions/formatTimestamp";
import { simpleGetLongAgo } from "../functions/getLongAgo";
import { embedColor } from "../globals";
import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "about",
  usesArgs: false,
  description: "Info about the bot",
  async run(message) {
    message.channel.send(
      new MessageEmbed({
        color: embedColor,
        fields: [
          {
            name: "About",
            value: `Hi! This is a bot made by ${
              (await client.fetchApplication()).owner
            } made with [DiscordJS](https://discord.js.org/#/) and a stupid idea.

You can invite the bot to your server [here](https://discord.com/api/oauth2/authorize?client_id=${
              (await client.fetchApplication()).id
            }&permissions=8&scope=bot)`,
          },
          {
            name: "Stats",
            value: `**Current Ping**: ${client.ws.ping}ms
Currently has **${commands.size} commands**
On **${client.guilds.cache.size}** Servers
Last deployed ${simpleGetLongAgo(client.readyTimestamp!)} ago ${formatTimestamp(
              client.readyAt!
            )}`,
          },
        ],
      })
    );
  },
} as ICommand;
