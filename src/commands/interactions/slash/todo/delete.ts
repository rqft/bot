import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { BaseSlashSubCommand } from "../baseslash";

export class TodoDeleteSlashSubCommand extends BaseSlashSubCommand {
  name = "delete";
  description = "remove todo";
  constructor() {
    super({
      options: [
        {
          name: "id",
          description: "number",
          type: ApplicationCommandOptionTypes.INTEGER,
          autocomplete: true,
          onAutoComplete: Formatter.Todo.search,
          required: true,
        },
      ],
    });
  }
  run = Formatter.Todo.remove;
}
