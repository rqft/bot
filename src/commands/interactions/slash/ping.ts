import { Formatter } from "../../../tools/formatter";
import { BaseSlashCommand } from "./baseslash";

export default class SlashPingCommand extends BaseSlashCommand {
  name = "ping";
  description = "pingy ping";

  run = Formatter.ping;
}
