import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { Parameters } from "../../../../tools/parameters";
import { BaseSlashSubCommand } from "../baseslash";

export class GuildSlashSubCommand extends BaseSlashSubCommand {
  name = "guild";
  description = "server info";

  constructor() {
    super({
      options: [
        {
          name: "guild",
          description: "what",
          type: ApplicationCommandOptionTypes.STRING,
          required: false,
          autocomplete: true,
          onAutoComplete: Parameters.Autocomplete.guilds,
          value: Parameters.guild,
        },
      ],
    });
  }

  run = Formatter.Info.guild;
}
