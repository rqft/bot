import { Command, CommandClient } from "detritus-client";
import {
  Canvas,
  someRandomApiCanvasMisc,
} from "../../../../functions/formatter";
import { Parameters } from "../../../../functions/parameters";
import { BaseCommand, ImageArgs } from "../../basecommand";

export interface SRAItsSoStupidArgs extends ImageArgs {
  text: string;
}

export default class SRAItsSoStupidCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "its-so-stupid",
      aliases: ["itssostupid", "stupid", "iss"],

      label: "image",
      type: Parameters.image,

      args: [{ name: "text", type: "string", required: true }],
    });
  }
  async run(context: Command.Context, args: SRAItsSoStupidArgs) {
    const embed = await someRandomApiCanvasMisc(
      context,
      args.image,
      Canvas.ITS_SO_STUPID,
      { dog: args.text }
    );
    return await context.editOrReply({ embed });
  }
}
