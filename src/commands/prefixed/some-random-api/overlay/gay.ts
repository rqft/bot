import { Command, CommandClient } from "detritus-client";
import { User } from "detritus-client/lib/structures/user";
import {
  Overlays,
  someRandomApiOverlay,
} from "../../../../functions/formatter";
import { Parameters } from "../../../../functions/parameters";
import { editOrReply } from "../../../../functions/tools";
import { BaseCommand, ImageArgs, ImageMetadata } from "../../basecommand";

export interface SRAGayOverlayArgs {
  user: User;
}

export default class SRAGayOverlayCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "gay",

      label: "image",
      type: Parameters.image(),
      metadata: ImageMetadata("Gay Overlay"),
    });
  }
  async run(context: Command.Context, args: ImageArgs) {
    const embed = await someRandomApiOverlay(context, args.image, Overlays.GAY);
    return await editOrReply(context, { embed });
  }
}
