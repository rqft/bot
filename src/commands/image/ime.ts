import { Image } from "imagescript";
import { reply } from "../../handlers/command";
import { ICommand } from "../../interfaces/ICommand";
module.exports = {
  name: "ime",
  restrictions: {
    level: 100,
  },
  args: [
    {
      name: "function",
      required: true,
      type: "any",
    },
  ],
  async run(message, _args) {
    const image = new Image(512, 512);
    const gradient = Image.gradient({
      0: 0xff5555ff,
      1: 0x5555ffff,
    });
    image.fill((_x, y) => gradient(y / image.width));
    const c = Buffer.from(await image.encode());
    await reply(message, "", {
      files: [
        {
          name: "ime.png",
          attachment: c,
        },
      ],
    });
  },
} as ICommand;
