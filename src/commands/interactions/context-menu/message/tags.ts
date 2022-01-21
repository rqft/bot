import { InteractionContext } from "detritus-client/lib/interaction";
import { imageTags } from "../../../../functions/formatter";
import { Parameters } from "../../../../functions/parameters";
import {
  BaseContextMenuMessageCommand,
  ContextMenuMessageArgs,
} from "../../baseinteraction";

export default class ImageTagsCommand extends BaseContextMenuMessageCommand {
  name = "Image Tags";
  description = "Get text from an image";

  async run(context: InteractionContext, _args: ContextMenuMessageArgs) {
    const embed = await imageTags(
      context,
      (await Parameters.imageUrl("png")("", context))!
    );

    return await context.editOrRespond({
      embeds: [embed],
      content: "\u200b",
    });
  }
}
