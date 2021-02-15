import { MessageEmbed } from "discord.js";
import fetch from "node-fetch";
import { client } from "..";
import { getUser } from "../functions/getUser";
import { Color } from "../globals";
import { ICommand } from "../interfaces/ICommand";
const greenTick = "<:yesTick:804175929995427861>";
const redTick = "<:noTick:804175930028720178>";
const grayTick = "<:maybe:801847909795627048>";
const links = [
  {
    name: "TopGG",
    url: `https://top.gg/bot/`,
    fetch: true,
  },
  {
    name: "Discord Bot List",
    url: `https://discordbotlist.com/bots/`,
    fetch: true,
  },
  {
    name: "Discord Bots",
    url: `https://discord.bots.gg/bots/`,
    fetch: true,
  },
  {
    name: "Bots On Discord",
    url: `https://bots.ondiscord.xyz/bots/`,
    fetch: true,
  },
  {
    name: "Discord Boats",
    url: `https://discord.boats/bot/`,
    fetch: true,
  },
  {
    name: "Bots For Discord",
    url: `https://botsfordiscord.com/bot/`,
    fetch: false,
  },
];
module.exports = {
  name: "botlist",
  usage: "[bot: User]",
  async run(message, args) {
    var user = (await getUser(message, args, true)) ?? client.user!;
    if (!user.bot) return await message.channel.send("that user is not a bot");

    let output = `${greenTick}: ${user} is on this bot list\n${redTick}: ${user} is not on this bot list\n${grayTick}: This bot list cannot be scanned\n\n`;

    for (let link of links) {
      if (link.fetch) {
        // Make a GET request to the link
        let res = await fetch(link.url + user.id);
        let ok = res.ok || res.redirected; // Whether or not the page exists

        output += `${ok ? greenTick : redTick} [${link.name}](${link.url}${
          user.id
        })\n`;
      } else {
        output += `${grayTick} [${link.name}](${link.url}${user.id})`;
      }
    }
    const emb = new MessageEmbed();
    emb.setAuthor(
      user.tag,
      user.avatarURL({ dynamic: true }) ?? user.defaultAvatarURL
    );
    emb.setTitle(`Bot list links for ${user.username} (${user.id})`);
    emb.setDescription(output);
    emb.setColor(Color.embed);
    await message.channel.send(emb);
  },
} as ICommand;
