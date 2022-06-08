import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { Parameters } from "../../../../tools/parameters";
import { BaseSlashSubCommand } from "../baseslash";

export class ImageUpscaleSlashSubCommand extends BaseSlashSubCommand {
  name = "upscale";
  description = "make it huge";
  constructor() {
    super({
      options: [
        {
          name: "target",
          description: "what to use",
          type: ApplicationCommandOptionTypes.STRING,
          value: Parameters.imageUrl(),
          required: false,
        },
      ],
    });
  }

  run = Formatter.Image.upscale;
}
