import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { BaseSlashSubCommand } from "../baseslash";

export class SearchImageSlashSubCommand extends BaseSlashSubCommand {
  name = "image";
  description = "look at png";
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

  run = Formatter.Search.image;
}
