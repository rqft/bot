import { InteractionContext } from "detritus-client/lib/interaction";
import { imageOcr } from "../../../../functions/formatter";
import {
  BaseContextMenuUserCommand,
  ContextMenuUserArgs,
} from "../../baseinteraction";

export default class ImageOcrCommand extends BaseContextMenuUserCommand {
  name = "User Text Recognition";
  description = "Get text from an image";

  async run(context: InteractionContext, args: ContextMenuUserArgs) {
    const embed = await imageOcr(
      context,
      (args.member || args.user).avatarUrlFormat("png")
    );

    return await context.editOrRespond({
      embeds: [embed],
      content: "\u200b",
    });
  }
}
