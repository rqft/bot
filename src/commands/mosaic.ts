import fetch from "node-fetch";
import { config } from "../config";
import { getUser } from "../functions/getUser";
import { ICommand } from "../interfaces/ICommand";
module.exports = {
  name: "api",
  usesArgs: true,
  restrictions: {
    ownerOnly: true,
  },
  usage:
    '<endpoint: string> <type: "user" | "url"> <thing: User | URL> [args: Object]',
  async run(message, args) {
    var url = null;
    switch (args[1]) {
      case "user":
        const user = (await getUser(message, args, false, 2)) ?? message.author;
        url =
          user.avatarURL({ size: 1024, format: "png" }) ??
          user.defaultAvatarURL;
        break;
      case "url":
        url = args[2];
        break;
      default:
        await message.channel.send(
          "Invalid type. Valid types are: `url`, `user`"
        );
    }

    const endpoint = args[0]!;
    const argument = args[3] ? args.slice(3).join(" ") : "{}";
    const baseURL = "https://fapi.wrmsr.io/" + endpoint;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.global.keys.fAPI}`,
    };
    const body = {
      images: [url],
      args: JSON.parse(argument),
    };
    const fAPI = await fetch(baseURL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });
    if (!fAPI.ok)
      return await message.channel.send(
        `There was an error (code ${
          fAPI.status
        }). \`\`\`diff\n${fAPI.statusText
          .split("\n")
          .map((e) => `- ${e}`)}\n\`\`\``
      );
    await message.channel.send(``, {
      files: [
        {
          name: "hi.png",
          attachment: await fAPI.buffer(),
        },
      ],
    });
  },
} as ICommand;
