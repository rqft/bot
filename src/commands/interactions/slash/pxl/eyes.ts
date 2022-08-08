import { APIs } from "@rqft/fetch";
import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { Parameters } from "../../../../tools/parameters";
import { BaseImageOption, BaseSlashSubCommand } from "../baseslash";

export class PxlEyesSlashSubCommand extends BaseSlashSubCommand {
  name = "eyes";
  description = "THEY SEE YOU RUNNING";
  constructor() {
    super({
      options: [
        new BaseImageOption(),
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
