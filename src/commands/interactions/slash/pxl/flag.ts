import { APIs } from "@rqft/fetch";
import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { Parameters } from "../../../../tools/parameters";
import { BaseImageOption, BaseSlashSubCommand } from "../baseslash";

export class PxlFlagSlashSubCommand extends BaseSlashSubCommand {
  name = "flag";
  description = "stop being gay :(";
  constructor() {
    super({
      options: [
        new BaseImageOption(),
        {
          name: "flag",
          description: "what flag",
          type: ApplicationCommandOptionTypes.STRING,
          autocomplete: true,
          onAutoComplete: Parameters.Autocomplete.choices(
            Object.values(APIs.PxlAPI.Flags)
          ),
        },
      ],
    });
  }
  run = Formatter.Pxl.flag;
}
