import { InteractionContext } from "detritus-client/lib/interaction";
import { Formatter } from "../../../../tools/formatter";
import { BaseContextMenuUserCommand } from "./baseuser";

export default class UserSlashCommand extends BaseContextMenuUserCommand {
  name = "User Information";

  async run(context: InteractionContext, args: Formatter.Info.UserArgs) {
    return await Formatter.Info.user(context, args);
  }
}
