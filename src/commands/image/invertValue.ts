import { Image } from "imagescript";
import fetch from "node-fetch";
import { getImageUrl } from "../../functions/getImageUrl";
import { Arguments } from "../../globals";
import { reply } from "../../handlers/command";
import { ICommand } from "../../interfaces/ICommand";
module.exports = {
  name: "invertvalue",
  aliases: ["invertv"],
  args: [Arguments.ImageResolvable],
  async run(message, args) {
    const im = await getImageUrl(args.join(" "));
    if (!im) return await reply(message, "could not find image");
    const image = await Image.decode(await (await fetch(im)).buffer());
    image.invertValue();
    const c = Buffer.from(await image.encode());
    console.log(c);
    await reply(message, "", {
      files: [
        {
          name: "invertValue.png",
          attachment: c,
        },
      ],
    });
  },
} as ICommand;
