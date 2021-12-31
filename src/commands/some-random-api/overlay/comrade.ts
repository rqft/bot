import { Command, CommandClient } from "detritus-client";
import { User } from "detritus-client/lib/structures/user";
import { Overlays, someRandomApiOverlay } from "../../../functions/formatter";
import { Parameters } from "../../../functions/parameters";
import { BaseCommand, ImageArgs } from "../../basecommand";

export interface SRAComradeOverlayArgs {
  user: User;
}

export default class SRAComradeOverlayCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "comrade",

      label: "image",
      type: Parameters.image,
    });
  }
  async run(context: Command.Context, args: ImageArgs) {
    const embed = await someRandomApiOverlay(
      context,
      args.image,
      Overlays.COMRADE
    );
    return await context.editOrReply({ embed });
  }
}
