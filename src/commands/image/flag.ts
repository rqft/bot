import fetch from "node-fetch";
import { validflags } from "../../enums/flag";
import { getImageUrl } from "../../functions/getImageUrl";
import { Arguments } from "../../globals";
import { reply } from "../../handlers/command";
import { ICommand } from "../../interfaces/ICommand";
import { Secrets } from "../../secrets";
module.exports = {
  name: "flag",
  args: [
    {
      name: "flag",
      required: true,
      type: "string",
    },
    Arguments.ImageResolvable,
  ],
  async run(message, args) {
    const flag = args[0]?.toLowerCase()!;
    if (!validflags.includes(flag))
      return await reply(
        message,

        "invalid flag. valid flags are: " +
          validflags.map((e) => `\`${e}\``).join(" ")
      );
    var url = await getImageUrl(args[1]!);
    if (!url) return await reply(message, "what image is that");
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
      return await reply(
        message,

        `something stupid happened (${res.status}): \`\`\`\n${res.statusText}\`\`\``
      );
    const buffer = await res.buffer();
    console.log(res);
    await reply(message, "🏳", {
      files: [
        {
          name: "flag.png",
          attachment: buffer,
        },
      ],
    });
  },
} as ICommand;
