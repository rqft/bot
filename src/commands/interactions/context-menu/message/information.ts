import { InteractionContext } from "detritus-client/lib/interaction";
import { infoUser } from "../../../../functions/formatter";
import {
  BaseContextMenuMessageCommand,
  ContextMenuMessageArgs,
} from "../../baseinteraction";

export default class UserInformationCommand extends BaseContextMenuMessageCommand {
  name = "User Information (Message)";

  async run(context: InteractionContext, args: ContextMenuMessageArgs) {
    const embed = await infoUser(context, args.message.author);

    return await context.editOrRespond({
      embeds: [embed],
      content: "\u200b",
    });
  }
}
