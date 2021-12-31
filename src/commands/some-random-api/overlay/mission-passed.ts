import { Command, CommandClient } from "detritus-client";
import { User } from "detritus-client/lib/structures/user";
import { Overlays, someRandomApiOverlay } from "../../../functions/formatter";
import { Parameters } from "../../../functions/parameters";
import { BaseCommand, ImageArgs } from "../../basecommand";

export interface SRAMissionPassedOverlayArgs {
  user: User;
}

export default class SRAMissionPassedOverlayCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "missionpassed",
      aliases: ["passed"],

      label: "image",
      type: Parameters.image,
    });
  }
  async run(context: Command.Context, args: ImageArgs) {
    const embed = await someRandomApiOverlay(
      context,
      args.image,
      Overlays.MISSION_PASSED
    );
    return await context.editOrReply({ embed });
  }
}
