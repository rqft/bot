import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { BaseSlashSubCommand } from "../baseslash";

export class SearchWebSlashSubCommand extends BaseSlashSubCommand {
  name = "web";
  description = "look at html";
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

  run = Formatter.Search.web;
}
