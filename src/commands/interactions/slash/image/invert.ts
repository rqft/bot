import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { APIs } from "pariah";
import { Formatter } from "../../../../tools/formatter";
import { Parameters } from "../../../../tools/parameters";
import { BaseImageOption, BaseSlashSubCommand } from "../baseslash";

export class ImageInvertSlashSubCommand extends BaseSlashSubCommand {
  name = "invert";
  description = "WTF....";
  constructor() {
    super({
      options: [
        new BaseImageOption(),
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
  run = Formatter.Image.invert;
}
