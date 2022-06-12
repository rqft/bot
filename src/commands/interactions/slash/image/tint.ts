import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { BaseImageOption, BaseSlashSubCommand } from "../baseslash";

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
          name: "opacity",
          description: "how much",
          type: ApplicationCommandOptionTypes.NUMBER,
          required: false,
          minValue: 0,
          maxValue: 100,
        },
        new BaseImageOption(),
      ],
    });
  }
  run = Formatter.Image.tint;
}
