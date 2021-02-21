import { GuildChannel, TextChannel } from "discord.js";
import fetch from "node-fetch";
import { config } from "../config";
import { ICommand } from "../interfaces/ICommand";
import { CustomEmojis } from "../maps/customEmojis";
module.exports = {
  name: "screenshot",
  aliases: ["ss"],
  description: "takes a screenshot of a website",
  usesArgs: true,
  usage: "<url: URL>",
  async run(message, args) {
    message.suppressEmbeds(true);
    const ret = await message.reply(CustomEmojis.GUI_TYPING);
    const url = args[0];
    const waitTime = parseInt(args[1] ?? "500");
    const baseURL = "https://fapi.wrmsr.io/screenshot";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.global.keys.fAPI}`,
    };
    const argument = {
      text: url,
      allowNSFW: message.guild
        ? ((message.channel as GuildChannel) as TextChannel).nsfw
        : false,
      wait: waitTime,
    };
    const body = {
      images: [url],
      args: argument,
    };
    const fAPI = await fetch(baseURL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });
    await ret.delete();
    if (!fAPI.ok)
      return await message.reply(
        `There was an error (code ${
          fAPI.status
        }). \`\`\`diff\n${fAPI.statusText
          .split("\n")
          .map((e) => `- ${e}`)}\n\`\`\``
      );

    await message.reply(`here is your screenshot`, {
      files: [
        {
          name: "fAPI.png",
          attachment: await fAPI.buffer(),
        },
      ],
    });
  },
} as ICommand;
