import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { BaseImageOption, BaseSlashSubCommand } from "../baseslash";

export class PxlLegoSlashSubCommand extends BaseSlashSubCommand {
  name = "lego";
  description = "leggo my lego";
  constructor() {
    super({
      options: [
        new BaseImageOption(),
        {
          name: "group_size",
          label: "group-size",
          description: "how big",
          type: ApplicationCommandOptionTypes.INTEGER,
          required: false,
        },
        {
          name: "scale",
          description: "resize now",
          type: ApplicationCommandOptionTypes.BOOLEAN,
          required: false,
        },
      ],
    });
  }
  run = Formatter.Pxl.lego;
}
