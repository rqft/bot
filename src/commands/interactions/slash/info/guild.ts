import { Formatter } from "../../../../tools/formatter";
import { BaseSlashSubCommand } from "../baseslash";

export class GuildSlashSubCommand extends BaseSlashSubCommand {
  name = "guild";
  description = "server info";

  run = Formatter.Info.guild;
}
