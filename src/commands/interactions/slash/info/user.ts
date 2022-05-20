import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { Parameters } from "../../../../tools/parameters";
import { BaseSlashSubCommand } from "../baseslash";

export class UserSlashSubCommand extends BaseSlashSubCommand {
  name = "user";
  description = "user info";
  constructor() {
    super({
      options: [
        {
          name: "user",
          description: "who",
          type: ApplicationCommandOptionTypes.USER,
          default: Parameters.Default.author,
        },
      ],
    });
  }

  run = Formatter.Info.user;
}
