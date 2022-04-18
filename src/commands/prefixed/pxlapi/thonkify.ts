import { Command, CommandClient } from "detritus-client";
import { PxlApi } from "pariah";
import { Brand } from "../../../enums/brands";
import { createImageEmbed } from "../../../functions/embed";
import { editOrReply } from "../../../functions/tools";
import { Secrets } from "../../../secrets";
import { BaseCommand, FunMetadata } from "../basecommand";
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
      metadata: FunMetadata("Makes text out of thinking emojis", "<text: string>", ["hello"])
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
