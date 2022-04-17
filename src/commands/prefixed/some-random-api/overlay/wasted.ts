import { Command, CommandClient } from "detritus-client";
import { User } from "detritus-client/lib/structures/user";
import {
  Overlays,
  someRandomApiOverlay,
} from "../../../../functions/formatter";
import { Parameters } from "../../../../functions/parameters";
import { editOrReply } from "../../../../functions/tools";
import { BaseCommand, ImageArgs } from "../../basecommand";

export interface SRAWastedOverlayArgs {
  user: User;
}

export default class SRAWastedOverlayCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "wasted",

      label: "image",
      type: Parameters.image(),
    });
  }
  async run(context: Command.Context, args: ImageArgs) {
    const embed = await someRandomApiOverlay(
      context,
      args.image,
      Overlays.WASTED
    );
    return await editOrReply(context, { embed });
  }
}
