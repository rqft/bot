import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";

import { Formatter } from "../../../tools/formatter";
import { BaseSlashCommand } from "./baseslash";
export default class DefineSlashCommand extends BaseSlashCommand {
  name = "define";
  description = "im in love with merriam";
  constructor() {
    super({
      options: [
        {
          name: "word",
          description: "what to use",
          type: ApplicationCommandOptionTypes.STRING,
          required: true,
          autocomplete: true,
          onAutoComplete: Formatter.definitions,
        },
      ],
    });
  }

  run = Formatter.define;
}
