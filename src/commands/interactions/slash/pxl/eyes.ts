import {
    ApplicationCommandOptionTypes,
    ImageFormats
} from "detritus-client/lib/constants";
import { APIs } from "pariah";
import { Formatter } from "../../../../tools/formatter";
import { Parameters } from "../../../../tools/parameters";
import { BaseSlashSubCommand } from "../baseslash";

export class PxlEyesSlashSubCommand extends BaseSlashSubCommand {
  name = "eyes";
  description = "THEY SEE YOU RUNNING";
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
          name: "type",
          description: "what eyes",
          type: ApplicationCommandOptionTypes.STRING,
          autocomplete: true,
          onAutoComplete: Parameters.Autocomplete.choices(
            Object.values(APIs.PxlAPI.Eyes)
          ),
        },
      ],
    });
  }
  run = Formatter.Pxl.eyes;
}
