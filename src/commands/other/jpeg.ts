import { GuildMember } from "discord.js";
import fetch from "node-fetch";
import { search_user } from "../../functions/searching/user";
import { reply } from "../../handlers/command";
import { ICommand } from "../../interfaces/ICommand";
import { messages } from "../../messages";
import { Secrets } from "../../secrets";
module.exports = {
  name: "jpeg",
  args: [
    {
      name: "imagetype",
      required: true,
      type: "string",
    },
    {
      name: "image",
      required: true,
      type: "URL | User",
    },
  ],
  async run(message, args) {
    var url = null;
    switch (args[0]) {
      case "url":
        url = args.slice(1).join(" ");
        break;
      case "user":
        const user = await search_user(args.slice(1).join(" "));

        if (!user)
          return await reply(message, messages.targeting.not_found.user);
        url =
          (user instanceof GuildMember ? user.user : user).avatarURL({
            format: "png",
            size: 4096,
          }) ??
          (user instanceof GuildMember ? user.user : user).defaultAvatarURL;
        break;
      default:
        return await reply(message, "must be `url` or `user`");
    }
    if (!url) return await reply(message, "what image is that");
    console.log([url]);
    const res = await fetch("https://api.pxlapi.dev/jpeg", {
      headers: {
        Authorization: `Application ${Secrets.Key.pxlAPI}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        images: [url],
      }),
    });
    if (res.status !== 200)
      return await reply(
        message,

        `something stupid happened (${res.status}): \`\`\`\n${res.statusText}\`\`\``
      );
    const buffer = await res.buffer();
    console.log(res);
    await reply(message, "🎷", {
      files: [
        {
          name: "jpeg.png",
          attachment: buffer,
        },
      ],
    });
  },
} as ICommand;
