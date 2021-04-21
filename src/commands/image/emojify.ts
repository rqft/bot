import fetch from "node-fetch";
import { getImageUrl } from "../../functions/getImageUrl";
import { Arguments } from "../../globals";
import { reply } from "../../handlers/command";
import { ICommand } from "../../interfaces/ICommand";
import { Secrets } from "../../secrets";
module.exports = {
  name: "emojify",
  args: [Arguments.ImageResolvable],
  async run(message, args) {
    var url = await getImageUrl(args[0]!);
    if (!url) return await reply(message, "what image is that");
    const res = await fetch("https://api.pxlapi.dev/emojimosaic", {
      headers: {
        Authorization: `Application ${Secrets.Key.pxlAPI}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        groupSize: 6,
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
          name: `${this.name}.png`,
          attachment: buffer,
        },
      ],
    });
  },
} as ICommand;
