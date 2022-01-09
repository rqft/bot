import { Command, CommandClient } from "detritus-client";
import {
  Canvas,
  someRandomApiCanvasMisc,
} from "../../../../functions/formatter";
import { Parameters } from "../../../../functions/parameters";
import { BaseCommand, ImageArgs } from "../../basecommand";

export default class SRAColorViewerCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "colorviewer",
      aliases: ["viewcolor"],

      label: "color",
      type: Parameters.color,
      required: true,
    });
  }
  async run(context: Command.Context, args: ImageArgs) {
    const embed = await someRandomApiCanvasMisc(
      context,
      Buffer.from([]),
      Canvas.COLOR_VIEWER,
      args
    );
    return await context.editOrReply({ embed });
  }
}
