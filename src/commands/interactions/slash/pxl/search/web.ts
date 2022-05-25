import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../../../tools/formatter";
import { BaseSlashSubCommand } from "../../baseslash";

export class PxlSearchWebSlashSubCommand extends BaseSlashSubCommand {
  name = "web";
  description = "look at html";
  constructor() {
    super({
      options: [
        {
          name: "query",
          description: "ok google",
          type: ApplicationCommandOptionTypes.STRING,
          required: true,
        },
      ],
    });
  }
  run = Formatter.Pxl.webSearch;
}
