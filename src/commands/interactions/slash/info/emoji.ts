import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { Parameters } from "../../../../tools/parameters";
import { BaseSlashSubCommand } from "../baseslash";

export class EmojiSlashSubCommand extends BaseSlashSubCommand {
  name = "emoji";
  description = "emoji info";
  constructor() {
    super({
      options: [
        {
          name: "emoji",
          description: "what",
          type: ApplicationCommandOptionTypes.STRING,
          required: true,
          value: Parameters.emojiUrl,
        },
      ],
    });
  }

  run = Formatter.Info.emoji;
}
