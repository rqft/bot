import { Image } from "imagescript";
import { reply } from "../../handlers/command";
import { ICommand } from "../../interfaces/ICommand";
module.exports = {
  name: "gradient",
  restrictions: {
    level: 100,
  },
  args: [
    {
      name: "top",
      required: true,
      type: "number",
    },
    {
      name: "bottom",
      required: true,
      type: "number",
    },
  ],
  async run(message, args) {
    const top = args[0]!.replace(/#/g, "0x");
    const bottom = args[1]!.replace(/#/g, "0x");
    if (isNaN(parseInt(top)))
      return reply(message, "`top` must be a valid color");
    if (isNaN(parseInt(bottom)))
      return reply(message, "`bottom` must be a valid color");
    const image = new Image(512, 512);
    const gradient = Image.gradient({
      0: parseInt(top),
      1: parseInt(bottom),
    });
    image.fill((_x, y) => gradient(y / image.width));
    const c = Buffer.from(await image.encode());
    await reply(message, `Gradient (\`${args[0]}\` => \`${args[1]}\`)`, {
      files: [
        {
          name: "gradient.png",
          attachment: c,
        },
      ],
    });
  },
} as ICommand;
