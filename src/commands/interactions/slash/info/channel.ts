import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { Parameters } from "../../../../tools/parameters";
import { BaseSlashSubCommand } from "../baseslash";

export class ChannelSlashSubCommand extends BaseSlashSubCommand {
  name = "channel";
  description = "channel info";
  constructor() {
    super({
      options: [
        {
          name: "channel",
          description: "where",
          type: ApplicationCommandOptionTypes.CHANNEL,
          default: Parameters.Default.channel,
          required: false,
        },
      ],
    });
  }

  run = Formatter.Info.channel;
}
