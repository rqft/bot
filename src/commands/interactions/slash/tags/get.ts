import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { Parameters } from "../../../../tools/parameters";
import { BaseSlashSubCommand } from "../baseslash";

export class TagGetSlashSubCommand extends BaseSlashSubCommand {
  name = "get";
  description = "get tag";
  constructor() {
    super({
      options: [
        {
          name: "key",
          description: "what",
          type: ApplicationCommandOptionTypes.STRING,
          autocomplete: true,
          onAutoComplete: Formatter.Tag.search,
          required: true,
        },
        {
          name: "args",
          description: "what to use",
          type: ApplicationCommandOptionTypes.STRING,
          required: false,
          default: [],
          value: Parameters.array(String),
        },
      ],
    });
  }
  run = Formatter.Tag.get;
}
