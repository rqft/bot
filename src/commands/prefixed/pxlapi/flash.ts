import { Command, CommandClient } from "detritus-client";
import { PxlApi } from "pariah";
import { Brand } from "../../../enums/brands";
import { createImageEmbed } from "../../../functions/embed";
import { Parameters } from "../../../functions/parameters";
import { editOrReply, storeImage } from "../../../functions/tools";
import { Secrets } from "../../../secrets";
import { BaseCommand, ImageArgs, ImageMetadata } from "../basecommand";

export default class PxlFlashCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "flash",

      label: "image",
      type: Parameters.image(),
<<<<<<< HEAD
      metadata: ImageMetadata(
        "Makes an image super flashy (warning!!)",
        "<image: Image>"
      ),
=======
      metadata: ImageMetadata("Creates a flashy (warning!) image")
>>>>>>> 71105518172e247128e81161bdf8e2d73b9355fb
    });
  }
  async run(context: Command.Context, args: ImageArgs) {
    const pxl = new PxlApi(Secrets.Key.pxlAPI);
    const imageAttach = await storeImage(args.image, "attachment.gif");
    const flash = await pxl.flash([imageAttach.url!]);
    const embed = await createImageEmbed(
      context,
      flash,
      "SPOILER_attachment.gif",
      Brand.PXL_API
    );

    return await editOrReply(context, { embed });
  }
}
