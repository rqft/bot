import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { BaseSlashSubCommand } from "../baseslash";

export class PxlSonicSlashSubCommand extends BaseSlashSubCommand {
  name = "sonic";
  description = "the fast man";
  constructor() {
    super({
      options: [
        {
          name: "text",
          description: "what",
          type: ApplicationCommandOptionTypes.STRING,
          required: true,
        },
      ],
    });
  }
  run = Formatter.Pxl.sonic;
}
