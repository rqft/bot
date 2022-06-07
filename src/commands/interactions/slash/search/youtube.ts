import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { BaseSlashSubCommand } from "../baseslash";

export class SearchYoutubeSlashSubCommand extends BaseSlashSubCommand {
  name = "youtube";
  description = "look at mp4";
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

  run = Formatter.Search.youtube;
}