import { InteractionContext } from "detritus-client/lib/interaction";
import { Formatter } from "../../../../tools/formatter";
import {
  BaseContextMenuMessageCommand,
  ContextMenuMessageArgs,
} from "./basemessage";

export default class UserSlashCommand extends BaseContextMenuMessageCommand {
  name = "User Information";

  async run(context: InteractionContext, args: ContextMenuMessageArgs) {
    return await Formatter.Info.user(context, { user: args.message.author });
  }
}
