import { Formatter } from "../../../../tools/formatter";
import { BaseContextMenuUserCommand } from "./baseuser";

export default class UserSlashCommand extends BaseContextMenuUserCommand {
  name = "User Information";

  run = Formatter.Info.user
}
