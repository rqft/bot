import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { BaseSlashSubCommand } from "../baseslash";

export class SearchDictionarySlashSubCommand extends BaseSlashSubCommand {
  name = "dictionary";
  description = "look at txt";
  constructor() {
    super({
      options: [
        {
          name: "query",
          description: "what to search for",
          type: ApplicationCommandOptionTypes.STRING,
          required: true,
          autocomplete: true,
          onAutoComplete: Formatter.Search.definitions,
        },
      ],
    });
  }

  run = Formatter.Search.define;
}
