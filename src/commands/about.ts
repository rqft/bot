import { MessageEmbed, Permissions } from "discord.js";
import { client, commands } from "..";
import { config } from "../config";
import { formatTimestamp } from "../functions/formatTimestamp";
import { simpleGetLongAgo } from "../functions/getLongAgo";
import { Color } from "../globals";
import { ICommand } from "../interfaces/ICommand";

module.exports = {
  name: "about",
  aliases: ["abt", ""],
  usesArgs: false,
  description: "Info about the bot",
  usage: "",
  // restrictions: {},
  cooldown: 109497,
  async run(message) {
    const here = `[here](https://discord.com/api/oauth2/authorize?client_id=${
      (await client.fetchApplication()).id
    }&permissions=${new Permissions()}&scope=bot)`;
    const colon = `[:](https://discord.js.org/#/docs/main/stable/class/TextChannel?scrollTo=createInvite)`;
    const botServ = `[Bot Server](https://arcy-at.github.io/invite)`;
    message.reply(
      new MessageEmbed({
        color: Color.embed,
        fields: [
          {
            name: "About",
            value: `Hi! This is a bot made by ${
              (await client.fetchApplication()).owner
            } made with [DiscordJS](https://discord.js.org/#/) and a stupid idea.

You can invite the bot to your server ${here}
My prefixes are${colon} ${config.bot.prefixes.join(", ").replace(/\?/g, "")}
Join the ${botServ}`,
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
