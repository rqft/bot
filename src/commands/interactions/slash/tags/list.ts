import { Formatter } from "../../../../tools/formatter";
import { BaseSlashSubCommand } from "../baseslash";

export class TagListSlashSubCommand extends BaseSlashSubCommand {
  name = "list";
  description = "list tags";

  run = Formatter.Tag.list;
}
