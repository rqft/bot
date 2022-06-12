import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { BaseImageOption, BaseSlashSubCommand } from "../baseslash";

export class ImageResizeSlashSubCommand extends BaseSlashSubCommand {
  name = "resize";
  description = "shrink or large";
  constructor() {
    super({
      options: [
        new BaseImageOption(),
        {
          name: "size",
          description: "big.",
          type: ApplicationCommandOptionTypes.STRING,
          required: false,
        },
      ],
    });
  }
  run = Formatter.Image.resize;
}
