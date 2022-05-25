import {
    ApplicationCommandOptionTypes,
    ImageFormats
} from "detritus-client/lib/constants";
import { APIs } from "pariah";
import { Formatter } from "../../../../tools/formatter";
import { Parameters } from "../../../../tools/parameters";
import { BaseSlashSubCommand } from "../baseslash";

export class PxlSnapchatSlashSubCommand extends BaseSlashSubCommand {
  name = "snapchat";
  description = "teenage white girl named brittany uses this";
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
          name: "filter",
          description: "what to use with",
          autocomplete: true,
          type: ApplicationCommandOptionTypes.STRING,
          onAutoComplete: Parameters.Autocomplete.choices(
            Object.values(APIs.PxlAPI.SnapchatFilters)
          ),
        },
      ],
    });
  }
  run = Formatter.Pxl.snapchat;
}
