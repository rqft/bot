import { Image } from "imagescript";
import fetch from "node-fetch";
import { getImageUrl } from "../../functions/getImageUrl";
import { Arguments } from "../../globals";
import { reply } from "../../handlers/command";
import { ICommand } from "../../interfaces/ICommand";
module.exports = {
  name: "ime",
  restrictions: {
    level: 100,
  },
  args: [
    Arguments.ImageResolvable,
    {
      name: "function",
      required: true,
      type: "any",
    },
  ],
  async run(message, args) {
    const im = await getImageUrl(args[0]!);
    if (!im) return await reply(message, "could not find image");
    const _image = await Image.decode(await (await fetch(im)).buffer());
    const image = new Image(_image.width, _image.height);
    eval(args.slice(1).join(" "));
    _image.composite(image);
    const c = Buffer.from(await _image.encode());
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
