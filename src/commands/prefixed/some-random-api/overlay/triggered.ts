import { Command, CommandClient } from "detritus-client";
import { User } from "detritus-client/lib/structures/user";
import {
  Overlays,
  someRandomApiOverlay,
} from "../../../../functions/formatter";
import { Parameters } from "../../../../functions/parameters";
import { BaseCommand, ImageArgs } from "../../basecommand";

export interface SRATriggeredOverlayArgs {
  user: User;
}

export default class SRATriggeredOverlayCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "triggered",

      label: "image",
      type: Parameters.image,
    });
  }
  async run(context: Command.Context, args: ImageArgs) {
    const embed = await someRandomApiOverlay(
      context,
      args.image,
      Overlays.TRIGGERED
    );
    return await context.editOrReply({ embed });
  }
}
