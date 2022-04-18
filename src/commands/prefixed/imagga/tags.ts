import { Command, CommandClient } from "detritus-client";
import { imageTags } from "../../../functions/formatter";
import { Parameters } from "../../../functions/parameters";
import { editOrReply } from "../../../functions/tools";
import { BaseCommand, ImageUrlArgs, ToolsMetadata } from "../basecommand";

export default class ImaggaTagsCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "tags",

      label: "image",
      type: Parameters.imageUrl("png"),
      metadata: ToolsMetadata("Get tags from an image", "<image: Image>"),
    });
  }
  async run(context: Command.Context, args: ImageUrlArgs) {
    const embed = await imageTags(context, args.image);
    return await editOrReply(context, { embed });
  }
}
