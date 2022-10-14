import { Image } from "imagescript";
import fetch from "node-fetch";
import { Command } from "../wrap/builder";
export default Command(
  "ls [e]",
  { args: (a) => ({ e: a.emoji() }) },
  async (context, args) => {
    console.log(args.e);
    const data = await fetch(args.e.url).then((x) => x.buffer());

    const i = await Image.decode(data);

    let i2 = new Image(250, 250);

    i2.composite(i, i2.width / 2 - i.width / 2, i2.height / 2 - i.height / 2);

    const u8 = await i2.encode();

    context.editOrReply({
      files: [{ value: Buffer.from(u8), filename: "test.png" }],
    });
  }
);
