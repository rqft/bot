import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../../../tools/formatter";
import { BaseSlashSubCommand } from "../../baseslash";

export class PxlSearchImageSlashSubCommand extends BaseSlashSubCommand {
  name = "image";
  description = "look at png";
  constructor() {
    super({
      options: [
        {
            name: "query",
            description: "ok google",
            type: ApplicationCommandOptionTypes.STRING,
            required: true,
          },
      ],
    });
  }
  run = Formatter.Pxl.imageSearch;
}
