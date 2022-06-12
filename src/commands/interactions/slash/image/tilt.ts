import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { BaseImageOption, BaseSlashSubCommand } from "../baseslash";

export class ImageTiltSlashSubCommand extends BaseSlashSubCommand {
  name = "tilt";
  description = "add spinny motion blur";
  constructor() {
    super({
      options: [
        new BaseImageOption(),
        {
          name: "amount",
          description: "how much",
          type: ApplicationCommandOptionTypes.INTEGER,
          required: false,
        },
      ],
    });
  }
  run = Formatter.Image.tilt;
}
