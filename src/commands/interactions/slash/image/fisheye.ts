import {
  ApplicationCommandOptionTypes,
  ImageFormats,
} from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { Parameters } from "../../../../tools/parameters";
import { BaseSlashSubCommand } from "../baseslash";

export class ImageFisheyeSlashSubCommand extends BaseSlashSubCommand {
  name = "fisheye";
  description = "wooh";
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
          name: "amount",
          description: "how much",
          type: ApplicationCommandOptionTypes.INTEGER,
          required: false,
          minValue: 0,
          maxValue: 100,
        },
      ],
    });
  }
  run = Formatter.Image.fisheye;
}
