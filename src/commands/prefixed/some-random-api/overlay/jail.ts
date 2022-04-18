import { Command, CommandClient } from "detritus-client";
import { User } from "detritus-client/lib/structures/user";
import {
  Overlays,
  someRandomApiOverlay,
} from "../../../../functions/formatter";
import { Parameters } from "../../../../functions/parameters";
import { editOrReply } from "../../../../functions/tools";
import { BaseCommand, ImageArgs, ImageMetadata } from "../../basecommand";

export interface SRAJailOverlayArgs {
  user: User;
}

export default class SRAJailOverlayCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "jail",

      label: "image",
      type: Parameters.image(),
      metadata: ImageMetadata("Jail Overlay"),
    });
  }
  async run(context: Command.Context, args: ImageArgs) {
    const embed = await someRandomApiOverlay(
      context,
      args.image,
      Overlays.JAIL
    );
    return await editOrReply(context, { embed });
  }
}
