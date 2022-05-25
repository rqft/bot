import {
    ApplicationCommandOptionTypes,
    ImageFormats
} from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { Parameters } from "../../../../tools/parameters";
import { BaseSlashSubCommand } from "../baseslash";

export class PxlLegoSlashSubCommand extends BaseSlashSubCommand {
  name = "lego";
  description = "leggo my lego";
  constructor() {
    super({
      options: [
        {
          name: "target",
          description: "what to use",
          value: Parameters.imageUrl(ImageFormats.PNG),
          default: Parameters.Default.imageUrl(ImageFormats.PNG),
          type: ApplicationCommandOptionTypes.STRING,
          required: false,
        },
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
