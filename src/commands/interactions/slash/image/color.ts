import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { BaseSlashSubCommand } from "../baseslash";

export class ImageColorSlashSubCommand extends BaseSlashSubCommand {
  name = "color";
  description = "pretty colors";
  constructor() {
    super({
      options: [
        {
          name: "color",
          description: "colorss :D",
          type: ApplicationCommandOptionTypes.STRING,
          required: true,
        },
        {
            name: "size",
            description: "big.",
            type: ApplicationCommandOptionTypes.STRING,
            required: false,
        }
      ],
    });
  }
  run = Formatter.Image.color;
}
