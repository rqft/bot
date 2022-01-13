import { Command, CommandClient } from "detritus-client";
import { PxlApi } from "pariah";
import { Brand } from "../../../enums/brands";
import { createImageEmbed } from "../../../functions/embed";
import { Secrets } from "../../../secrets";
import { BaseCommand } from "../basecommand";
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

    return await context.editOrReply({ embed });
  }
}
