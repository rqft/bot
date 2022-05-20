import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { BaseSlashSubCommand } from "../baseslash";

export class TagDeleteSlashSubCommand extends BaseSlashSubCommand {
  name = "delete";
  description = "delete tag";
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
      ],
    });
  }
  run = Formatter.Tag.remove;
}
