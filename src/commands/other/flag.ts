import { GuildMember } from "discord.js";
import fetch from "node-fetch";
import { validflags } from "../../enums/flag";
import { search_user } from "../../functions/searching/user";
import { ICommand } from "../../interfaces/ICommand";
import { messages } from "../../messages";
import { Secrets } from "../../secrets";
module.exports = {
  name: "flag",
  args: [
    {
      name: "flag",
      required: true,
      type: "string",
    },
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
    const flag = args[0]?.toLowerCase()!;
    if (!validflags.includes(flag))
      return await message.reply(
        "invalid flag. valid flags are: " +
          validflags.map((e) => `\`${e}\``).join(" ")
      );
    var url = null;
    switch (args[1]) {
      case "url":
        url = args.slice(2).join(" ");
        break;
      case "user":
        const user = await search_user(args.slice(1).join(" "));

        if (!user)
          return await message.reply(messages.targeting.not_found.user);
        url =
          (user instanceof GuildMember ? user.user : user).avatarURL({
            format: "png",
            size: 4096,
          }) ??
          (user instanceof GuildMember ? user.user : user).defaultAvatarURL;
        break;
      default:
        return await message.reply("must be `url` or `user`");
    }
    if (!url) return await message.reply("what image is that");
    console.log([url]);
    const res = await fetch("https://api.pxlapi.dev/flag/" + flag, {
      headers: {
        Authorization: `Application ${Secrets.Key.pxlAPI}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        opacity: 120,
        images: [url],
      }),
    });
    if (res.status !== 200)
      return await message.reply(
        `something stupid happened (${res.status}): \`\`\`\n${res.statusText}\`\`\``
      );
    const buffer = await res.buffer();
    console.log(res);
    await message.reply("🏳", {
      files: [
        {
          name: "flag.png",
          attachment: buffer,
        },
      ],
    });
  },
} as ICommand;
