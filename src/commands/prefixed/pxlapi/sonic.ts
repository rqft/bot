import { Command, CommandClient } from "detritus-client";
import { APIs } from "pariah";
import { Brand } from "../../../enums/brands";
import { createImageEmbed } from "../../../functions/embed";
import { editOrReply } from "../../../functions/tools";
import { Secrets } from "../../../secrets";
import { BaseCommand, ImageMetadata } from "../basecommand";
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
      metadata: ImageMetadata("Make sonic say stuff", "<text: string>", [
        "i hate plants",
      ]),
    });
  }
  async run(context: Command.Context, args: PxlSonicArgs) {
    const pxl = new APIs.PxlAPI.API(Secrets.Key.pxlAPI);

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
