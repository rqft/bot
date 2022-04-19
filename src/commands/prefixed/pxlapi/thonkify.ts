import { Command, CommandClient } from "detritus-client";
import { PxlApi } from "pariah";
import { Brand } from "../../../enums/brands";
import { createImageEmbed } from "../../../functions/embed";
import { editOrReply } from "../../../functions/tools";
import { Secrets } from "../../../secrets";
<<<<<<< HEAD
import { BaseCommand, ImageMetadata } from "../basecommand";
=======
import { BaseCommand, FunMetadata } from "../basecommand";
>>>>>>> 71105518172e247128e81161bdf8e2d73b9355fb
export interface PxlThonkifyArgs {
  text: string;
}
export default class PxlThonkifyCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "thonkify",

      label: "text",
      type: "string",
      required: true,
<<<<<<< HEAD
      metadata: ImageMetadata("Thonkify text", "<image: Image> <text: string>"),
=======
      metadata: FunMetadata("Makes text out of thinking emojis", "<text: string>", ["hello"])
>>>>>>> 71105518172e247128e81161bdf8e2d73b9355fb
    });
  }
  async run(context: Command.Context, args: PxlThonkifyArgs) {
    const pxl = new PxlApi(Secrets.Key.pxlAPI);

    const thonkify = await pxl.thonkify(args.text);
    const embed = await createImageEmbed(
      context,
      thonkify,
      undefined,
      Brand.PXL_API
    );

    return await editOrReply(context, { embed });
  }
}
