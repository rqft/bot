import { Command, CommandClient } from "detritus-client";
import { User } from "detritus-client/lib/structures/user";
import {
  Overlays,
  someRandomApiOverlay,
} from "../../../../functions/formatter";
import { Parameters } from "../../../../functions/parameters";
import { editOrReply } from "../../../../functions/tools";
import { BaseCommand, ImageArgs, ImageMetadata } from "../../basecommand";

export interface SRATriggeredOverlayArgs {
  user: User;
}

export default class SRATriggeredOverlayCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "triggered",

      label: "image",
      type: Parameters.image(),
      metadata: ImageMetadata("Triggered Overlay"),
    });
  }
  async run(context: Command.Context, args: ImageArgs) {
    const embed = await someRandomApiOverlay(
      context,
      args.image,
      Overlays.TRIGGERED
    );
    return await editOrReply(context, { embed });
  }
}
