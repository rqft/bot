import { Image } from "imagescript";
import fetch from "node-fetch";
import { getImageUrl } from "../../functions/getImageUrl";
import { Arguments } from "../../globals";
import { reply } from "../../handlers/command";
import { ICommand } from "../../interfaces/ICommand";
module.exports = {
  name: "hue",
  args: [
    Arguments.ImageResolvable,
    {
      name: "shift",
      required: false,
      type: "number",
    },
  ],
  async run(message, args) {
    var url = await getImageUrl(args[0]!);
    if (!url) return await reply(message, "what image is that");
    const fetched = await fetch(url);
    const image = await Image.decode(await fetched.buffer());
    const power = parseFloat(args[1]!);
    if (power < 0) return await reply(message, "Cannot be less than 0");
    image.hueShift(isNaN(power) ? 180 : power);
    const c = Buffer.from(await image.encode());
    console.log(c);
    await reply(message, "", {
      files: [
        {
          name: `${this.name}.png`,
          attachment: c,
        },
      ],
    });
  },
} as ICommand;
