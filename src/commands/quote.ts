import fetch from "node-fetch";
import { config } from "../config";
import { getUser } from "../functions/getUser";
import { ICommand } from "../interfaces/ICommand";
import { CustomEmojis } from "../maps/customEmojis";
module.exports = {
  name: "quote",
  usesArgs: true,
  restrictions: {},
  usage: "<user: User> <content: text>",
  description: "quote people",
  async run(message, args) {
    const ret = await message.reply(CustomEmojis.GUI_TYPING);
    const user = (await getUser(message, args, false, 0)) ?? message.author;
    const baseURL = "https://fapi.wrmsr.io/quote";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.global.keys.fAPI}`,
    };
    const dt = new Date();
    const argument = {
      message: {
        content: args.slice(1).join(" "),
      },
      author: {
        color: message.guild
          ? message.guild.members.cache.get(user.id)
            ? message.guild.members.cache.get(user.id)?.displayHexColor
            : "#ffffff"
          : "#ffffff",
        username: message.guild
          ? message.guild.members.cache.get(user.id)
            ? message.guild.members.cache.get(user.id)?.displayName
            : user.username
          : user.username,
        bot: user.bot,
        avatarURL: user.avatarURL({ format: "png", size: 1024 }),
      },
      timestamp: `Today at ${dt
        .toLocaleTimeString()
        .replace(/:\d\d /g, "")
        .replace(/AM|PM/g, " $&")}`,
    };
    const body = {
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
    await message.reply(``, {
      files: [
        {
          name: "hi.png",
          attachment: await fAPI.buffer(),
        },
      ],
    });
  },
} as ICommand;
