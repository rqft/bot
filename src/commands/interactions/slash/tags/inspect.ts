import { Formatter } from "../../../../tools/formatter";
import { BaseSlashSubCommand } from "../baseslash";

export class TagInspectSlashSubCommand extends BaseSlashSubCommand {
  name = "inspect";
  description = "get tags file";

  run = Formatter.Tag.inspect;
}
