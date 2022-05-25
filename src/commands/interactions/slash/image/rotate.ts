import {
    ApplicationCommandOptionTypes,
    ImageFormats
} from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { Parameters } from "../../../../tools/parameters";
import { BaseSlashSubCommand } from "../baseslash";

export class ImageRotateSlashSubCommand extends BaseSlashSubCommand {
  name = "rotate";
  description = "Slant.";
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
          name: "degrees",
          description: "shift",
          type: ApplicationCommandOptionTypes.INTEGER,
          required: false,
        },
      ],
    });
  }
  run = Formatter.Image.rotate;
}
