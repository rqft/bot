import { Command, CommandClient } from "detritus-client";
import { ImageFormats } from "detritus-client/lib/constants";
import { Image } from "imagescript";
import fetch from "node-fetch";
import { Emojis } from "../../enums/emojis";
import { findUser } from "../../functions/findUser";
import { generateEmbed } from "../../functions/generateEmbedTemplate";
import { pushPullImage } from "../../functions/pushPullImage";
import { roundTo } from "../../functions/roundTo";
import { CustomError } from "../../globals";
import { BaseCommand } from "../basecommand";
export default class AvatarCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      label: "user",
      name: "avatar",
      aliases: ["av"],
      args: [
        {
          name: "size",
          default: 512,
          type: "number",
        },
      ],
    });
  }
  async run(context: Command.Context, args: Command.ParsedArgs) {
    const user = await findUser(args.user || context.userId);
    if (!user) throw new CustomError("I can't find that user");
    const emb = generateEmbed({ user: context.user });
    emb.setAuthor(
      user.toString(),
      user.avatarUrl ?? user.defaultAvatarUrl,
      user.jumpLink
    );
    const url = await pushPullImage(
      Buffer.from(
        await (
          await Image.decode(
            await (
              await fetch(
                user.avatarUrlFormat("png", {
                  size: roundTo(
                    [16, 32, 64, 128, 256, 512, 1024, 2048, 4096],
                    args.size
                  ),
                })
              )
            ).buffer()!
          )
        )
          .resize(args.size, args.size)
          .encode()
      )
    );

    emb.setDescription(
      `${Emojis.FRAME_WITH_PICTURE} Avatar of ${user.mention} in ${args.size}x${
        args.size
      } dimensions
${Emojis.LINK} Links: ${[
        ImageFormats.GIF,
        ImageFormats.JPEG,
        ImageFormats.JPG,
        ImageFormats.PNG,
        ImageFormats.WEBP,
      ]
        .map((v) => `[${v.toUpperCase()}](${user.avatarUrlFormat(v)})`)
        .join(" | ")}`
    );
    emb.setImage(url);
    context.editOrReply({
      embed: emb,
    });
  }
}
