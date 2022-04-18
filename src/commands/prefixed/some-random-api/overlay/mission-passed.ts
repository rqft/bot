import { Command, CommandClient } from "detritus-client";
import { User } from "detritus-client/lib/structures/user";
import {
  Overlays,
  someRandomApiOverlay,
} from "../../../../functions/formatter";
import { Parameters } from "../../../../functions/parameters";
import { editOrReply } from "../../../../functions/tools";
import { BaseCommand, ImageArgs, ImageMetadata } from "../../basecommand";

export interface SRAMissionPassedOverlayArgs {
  user: User;
}

export default class SRAMissionPassedOverlayCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "missionpassed",
      aliases: ["passed"],

      label: "image",
      type: Parameters.image(),
      metadata: ImageMetadata("Mission Passed Overlay"),
    });
  }
  async run(context: Command.Context, args: ImageArgs) {
    const embed = await someRandomApiOverlay(
      context,
      args.image,
      Overlays.MISSION_PASSED
    );
    return await editOrReply(context, { embed });
  }
}
