import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { BaseSlashSubCommand } from "../baseslash";

export class PxlThonkifySlashSubCommand extends BaseSlashSubCommand {
  name = "thonkify";
  description = "thinking_face";
  constructor() {
    super({
      options: [
        {
            name: "text",
            description: "what",
            type: ApplicationCommandOptionTypes.STRING,
            required: true
          },
      ],
    });
  }
  run = Formatter.Pxl.thonkify;
}
