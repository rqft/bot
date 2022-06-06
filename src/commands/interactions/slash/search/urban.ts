import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { BaseSlashSubCommand } from "../baseslash";

export class SearchUrbanSlashSubCommand extends BaseSlashSubCommand {
  name = "urban";
  description = "look at txt but funny";
  constructor() {
    super({
      options: [
        {
          name: "query",
          description: "what to search for",
          type: ApplicationCommandOptionTypes.STRING,
          required: true,
        },
      ],
    });
  }

  run = Formatter.Search.urban;
}
