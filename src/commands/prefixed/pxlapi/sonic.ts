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
export interface PxlSonicArgs {
  text: string;
}
export default class PxlSonicCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "sonic",

      label: "text",
      type: "string",
      required: true,
<<<<<<< HEAD
      metadata: ImageMetadata("Make sonic say stuff", "<text: string>", [
        "i hate plants",
      ]),
=======
      metadata: FunMetadata("Make sonic say something", "<text: string>", ["hello world"])
>>>>>>> 71105518172e247128e81161bdf8e2d73b9355fb
    });
  }
  async run(context: Command.Context, args: PxlSonicArgs) {
    const pxl = new PxlApi(Secrets.Key.pxlAPI);

    const sonic = await pxl.sonic(args.text);
    const embed = await createImageEmbed(
      context,
      sonic,
      undefined,
      Brand.PXL_API
    );

    return await editOrReply(context, { embed });
  }
}
