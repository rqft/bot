import { Command, CommandClient } from "detritus-client";
import { PxlApi } from "pariah";
import { Brand } from "../../../enums/brands";
import { createImageEmbed } from "../../../functions/embed";
import { Parameters } from "../../../functions/parameters";
import { editOrReply, storeImage } from "../../../functions/tools";
import { Secrets } from "../../../secrets";
import { BaseCommand, ImageArgs } from "../basecommand";

export default class PxlAjitCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "ajit",

      label: "image",
      type: Parameters.image(),
    });
  }
  async run(context: Command.Context, args: ImageArgs) {
    const pxl = new PxlApi(Secrets.Key.pxlAPI);
    const imageAttach = await storeImage(args.image, "attachment.gif");
    const ajit = await pxl.ajit([imageAttach.url!]);
    const embed = await createImageEmbed(
      context,
      ajit,
      undefined,
      Brand.PXL_API
    );
    console.log(embed.image);

    return await editOrReply(context, { embed });
  }
}
