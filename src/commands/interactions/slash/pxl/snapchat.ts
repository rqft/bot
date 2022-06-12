import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { APIs } from "pariah";
import { Formatter } from "../../../../tools/formatter";
import { Parameters } from "../../../../tools/parameters";
import { BaseImageOption, BaseSlashSubCommand } from "../baseslash";

export class PxlSnapchatSlashSubCommand extends BaseSlashSubCommand {
  name = "snapchat";
  description = "teenage white girl named brittany uses this";
  constructor() {
    super({
      options: [
        new BaseImageOption(),
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
