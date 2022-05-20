import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { BaseSlashSubCommand } from "../baseslash";

export class TagSetSlashSubCommand extends BaseSlashSubCommand {
  name = "set";
  description = "set a tag";
  constructor() {
    super({
      options: [
        {
          name: "key",
          description: "what",
          type: ApplicationCommandOptionTypes.STRING,
          required: true,
        },
        {
          name: "value",
          description: "what to put",
          type: ApplicationCommandOptionTypes.STRING,
          required: true,
        },
      ],
    });
  }
  run = Formatter.Tag.post;
}
