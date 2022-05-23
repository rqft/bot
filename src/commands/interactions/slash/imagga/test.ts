import { ApplicationCommandOptionTypes, ImageFormats } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { Parameters } from "../../../../tools/parameters";
import { BaseSlashSubCommand } from "../baseslash";

export class ImaggaTextSlashSubCommand extends BaseSlashSubCommand {
  name = "text";
  description = "the images are talking to me";
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
      ],
    });
  }
  run = Formatter.Imagga.readText;
}
