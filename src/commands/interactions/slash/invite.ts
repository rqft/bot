import { Formatter } from "../../../tools/formatter";
import { BaseSlashCommand } from "./baseslash";

export default class SlashPingCommand extends BaseSlashCommand {
  name = "invite";
  description = "add bot";

  run = Formatter.invite;
}
