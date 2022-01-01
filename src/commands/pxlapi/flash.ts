import { Command, CommandClient } from "detritus-client";
import { PxlApi } from "pariah";
import { createImageEmbed } from "../../functions/embed";
import { Parameters } from "../../functions/parameters";
import { storeImage } from "../../functions/tools";
import { Secrets } from "../../secrets";
import { BaseCommand, ImageArgs } from "../basecommand";

export default class PxlFlashCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "flash",

      label: "image",
      type: Parameters.image,
    });
  }
  async run(context: Command.Context, args: ImageArgs) {
    const pxl = new PxlApi(Secrets.Key.pxlAPI);
    const imageAttach = await storeImage(args.image, "attachment.gif");
    const flash = await pxl.flash([imageAttach.url!]);
    const embed = await createImageEmbed(
      context,
      flash,
      "SPOILER_attachment.gif"
    );

    return await context.editOrReply({ embed });
  }
}
