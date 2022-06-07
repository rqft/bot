import {
  ApplicationCommandOptionTypes,
  ImageFormats,
} from "detritus-client/lib/constants";
import { APIs } from "pariah";
import { Formatter } from "../../../../tools/formatter";
import { Parameters } from "../../../../tools/parameters";
import { BaseSlashSubCommand } from "../baseslash";

export class ImageInvertSlashSubCommand extends BaseSlashSubCommand {
  name = "invert";
  description = "WTF....";
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
        {
          name: "method",
          description: "what way",
          type: ApplicationCommandOptionTypes.STRING,
          required: false,
          autocomplete: true,
          onAutoComplete: Parameters.Autocomplete.choices(
            Object.values(APIs.Jonathan.InvertMethods)
          ),
        },
      ],
    });
  }
  run = Formatter.Image.fisheye;
}
