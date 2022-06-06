import {
  ApplicationCommandOptionTypes,
  ImageFormats,
} from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { Parameters } from "../../../../tools/parameters";
import { BaseSlashSubCommand } from "../baseslash";

export class ImageTintSlashSubCommand extends BaseSlashSubCommand {
  name = "tint";
  description = "make image colored";
  constructor() {
    super({
      options: [
        {
          name: "color",
          description: "what colour",
          type: ApplicationCommandOptionTypes.STRING,
          required: true,
        },
        {
          name: "target",
          description: "what to use",
          value: Parameters.imageUrl(ImageFormats.PNG),
          default: Parameters.Default.imageUrl(ImageFormats.PNG),
          type: ApplicationCommandOptionTypes.STRING,
          required: false,
        },
        {
          name: "opacity",
          description: "how much",
          type: ApplicationCommandOptionTypes.NUMBER,
          required: false,
          minValue: 0,
          maxValue: 100,
        },
      ],
    });
  }
  run = Formatter.Image.tint;
}
