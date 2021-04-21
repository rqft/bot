import { Image } from "imagescript";
import fetch from "node-fetch";
import { getImageUrl } from "../../functions/getImageUrl";
import { Arguments } from "../../globals";
import { reply } from "../../handlers/command";
import { ICommand } from "../../interfaces/ICommand";
module.exports = {
  name: "scale",
  args: [
    Arguments.ImageResolvable,
    {
      name: "scale",
      required: false,
      type: "number",
    },
  ],
  async run(message, args) {
    var url = await getImageUrl(args[0]!);
    if (!url) return await reply(message, "what image is that");
    const fetched = await fetch(url);
    const image = await Image.decode(await fetched.buffer());
    const height = image.height,
      width = image.width;
    const power = parseFloat(args[1]!);
    if (power < -1) return await reply(message, "Cannot be less than -1");
    image.scale(isNaN(power) ? 1 : power);
    const newH = image.height,
      newW = image.width;
    const c = Buffer.from(await image.encode());
    await reply(
      message,
      `Upscaled to a size of ${power} (\`${width}x${height}\`=>\`${newW}x${newH}\`)`,
      {
        files: [
          {
            name: "scale.png",
            attachment: c,
          },
        ],
      }
    );
  },
} as ICommand;
