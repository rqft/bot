import {
    ApplicationCommandOptionTypes,
    ImageFormats
} from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { Parameters } from "../../../../tools/parameters";
import { BaseSlashSubCommand } from "../baseslash";

export class PxlJpegSlashSubCommand extends BaseSlashSubCommand {
  name = "jpeg";
  description = "bad quality";
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
          name: "quality",
          description: "how bad",
          type: ApplicationCommandOptionTypes.INTEGER,
          required: false,
        },
      ],
    });
  }
  run = Formatter.Pxl.jpeg;
}
