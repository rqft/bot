import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../tools/formatter";
import { BaseSlashCommand } from "./baseslash";

export default class SlashHelpCommand extends BaseSlashCommand {
  name = "help";
  description = "get help";

  constructor() {
    super({
      options: [
        {
          name: "query",
          description: "what command",
          type: ApplicationCommandOptionTypes.STRING,
          required: false,
          autocomplete: true,
          onAutoComplete: Formatter.helpAutocomplete,
        },
      ],
    });
  }

  run = Formatter.help;
}
