import { InteractionContext } from "detritus-client/lib/interaction";
import { infoUser } from "../../../../functions/formatter";
import {
  BaseContextMenuUserCommand,
  ContextMenuUserArgs,
} from "../../baseinteraction";

export default class InformationCommand extends BaseContextMenuUserCommand {
  name = "User Information";

  async run(context: InteractionContext, args: ContextMenuUserArgs) {
    console.log("recieved");
    const embed = await infoUser(context, args.member || args.user);

    return await context.editOrRespond({
      embeds: [embed],
      content: "\u200b",
    });
  }
}
