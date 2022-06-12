import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { BaseImageOption, BaseSlashSubCommand } from "../baseslash";

export class ImageRotateSlashSubCommand extends BaseSlashSubCommand {
  name = "rotate";
  description = "slant.";
  constructor() {
    super({
      options: [
        {
          name: "degrees",
          description: "shift",
          type: ApplicationCommandOptionTypes.INTEGER,
          required: true,
        },
        new BaseImageOption(),
      ],
    });
  }
  run = Formatter.Image.rotate;
}
