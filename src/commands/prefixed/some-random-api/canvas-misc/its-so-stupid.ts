import { Command, CommandClient } from "detritus-client";
import {
  Canvas,
  someRandomApiCanvasMisc,
} from "../../../../functions/formatter";
import { Parameters } from "../../../../functions/parameters";
import { editOrReply } from "../../../../functions/tools";
import { BaseCommand, ImageArgs, ImageMetadata } from "../../basecommand";

export interface SRAItsSoStupidArgs extends ImageArgs {
  text: string;
}

export default class SRAItsSoStupidCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "its-so-stupid",
      aliases: ["itssostupid", "stupid", "iss"],

      type: [
        { name: "image", type: Parameters.image("png") },
        {
          name: "text",
          type: Parameters.string({ minimumLength: 1, maximumLength: 1000 }),
        },
      ],
      metadata: ImageMetadata(
        "It's so stupid",
        "<image: Image> <text: string>"
      ),
    });
  }
  async run(context: Command.Context, args: SRAItsSoStupidArgs) {
    const embed = await someRandomApiCanvasMisc(
      context,
      args.image,
      Canvas.ITS_SO_STUPID,
      { dog: args.text }
    );
    return await editOrReply(context, { embed });
  }
}
