import fetch from "node-fetch";
import { getImageUrl } from "../../functions/getImageUrl";
import { reply } from "../../handlers/command";
import { ICommand } from "../../interfaces/ICommand";
import { Secrets } from "../../secrets";
module.exports = {
  name: "jpeg",
  args: [
    {
      name: "image",
      required: true,
      type: "ImageResolvable",
    },
  ],
  async run(message, args) {
    var url = await getImageUrl(args[0]!);
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
