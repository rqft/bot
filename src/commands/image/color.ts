import { Command, CommandClient } from "detritus-client";
import { Image } from "imagescript";
import fetch from "node-fetch";
import { generateEmbed } from "../../functions/generateEmbedTemplate";
import { pushPullImage } from "../../functions/pushPullImage";
import { BaseCommand } from "../basecommand";
export default class ColorCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      label: "color",
      type: String,
      required: true,
      name: "color",
      aliases: ["c"],
      args: [],
    });
  }
  async run(context: Command.Context, args: Command.ParsedArgs) {
    const glasses = await Image.decode(
      await (
        await fetch(
          "https://cdn.discordapp.com/attachments/819621588999602196/841449815011229706/GLASSES_-_Copy.png"
        )
      ).buffer()
    );
    glasses.fill((x, y) =>
      Image.rgbaToColor(
        ...((
          (args.color as string)
            .replace(/#|0x/g, "")
            .match(/[ABCDEF0-9]{1,2}/gi) ?? ["00", "00", "00"]
        ).map((v) => parseInt(v, 16)) as [number, number, number]),
        glasses.getRGBAAt(x, y)[3] ?? 1
      )
    );

    await context.editOrReply({
      embed: generateEmbed({ user: context.user }).setImage(
        await pushPullImage(Buffer.from(await glasses.encode()), "color.png")
      ),
    });
  }
}
