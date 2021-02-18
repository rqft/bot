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
    var usesAtt = false;
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
        if (!message.attachments.array()[0]) {
          return await message.channel.send("you need to supply an image");
        }
        url = message.attachments.array()[0]!.url;

        usesAtt = true;
        break;
    }

    const endpoint = args[0]!;
    const argument = args[usesAtt ? 1 : 3]
      ? args.slice(usesAtt ? 1 : 3).join(" ")
      : "{}";
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
    await message.channel.send(
      `Endpoint: \`${endpoint}\`
Image: \`${url}\`
Arguments: \`\`\`json
${JSON.stringify(JSON.parse(argument), null, 2)}
\`\`\``,
      {
        files: [
          {
            name: "fAPI.png",
            attachment: await fAPI.buffer(),
          },
        ],
      }
    );
  },
} as ICommand;
