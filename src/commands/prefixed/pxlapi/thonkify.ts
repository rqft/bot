import { Command, CommandClient } from "detritus-client";
import { APIs } from "pariah";
import { Brand } from "../../../enums/brands";
import { createImageEmbed } from "../../../functions/embed";
import { editOrReply } from "../../../functions/tools";
import { Secrets } from "../../../secrets";
import { BaseCommand, ImageMetadata } from "../basecommand";
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
      metadata: ImageMetadata("Thonkify text", "<image: Image> <text: string>"),
    });
  }
  async run(context: Command.Context, args: PxlThonkifyArgs) {
    const pxl = new APIs.PxlAPI.API(Secrets.Key.pxlAPI);

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
