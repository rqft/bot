import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { BaseImageOption, BaseSlashSubCommand } from "../baseslash";

export class ImageFisheyeSlashSubCommand extends BaseSlashSubCommand {
  name = "fisheye";
  description = "wooh";
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
          maxValue: 100,
        },
      ],
    });
  }
  run = Formatter.Image.fisheye;
}
