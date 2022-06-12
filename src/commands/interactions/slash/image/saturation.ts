import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { BaseImageOption, BaseSlashSubCommand } from "../baseslash";

export class ImageSaturationSlashSubCommand extends BaseSlashSubCommand {
  name = "saturation";
  description = "crisp";
  constructor() {
    super({
      options: [
        new BaseImageOption(),
        {
          name: "amount",
          description: "how much",
          type: ApplicationCommandOptionTypes.INTEGER,
          required: false,
          minValue: 0,
        },
      ],
    });
  }
  run = Formatter.Image.saturation;
}
