import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { BaseImageOption, BaseSlashSubCommand } from "../baseslash";

export class PxlJpegSlashSubCommand extends BaseSlashSubCommand {
  name = "jpeg";
  description = "bad quality";
  constructor() {
    super({
      options: [
        new BaseImageOption(),
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
