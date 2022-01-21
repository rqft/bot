import { Command, CommandClient } from "detritus-client";
import { imageTags } from "../../../functions/formatter";
import { Parameters } from "../../../functions/parameters";
import { BaseCommand, ImageUrlArgs } from "../basecommand";

export default class ImaggaTagsCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "tags",

      label: "image",
      type: Parameters.imageUrl("png"),
    });
  }
  async run(context: Command.Context, args: ImageUrlArgs) {
    const embed = await imageTags(context, args.image);
    return await context.editOrReply({ embed });
  }
}
