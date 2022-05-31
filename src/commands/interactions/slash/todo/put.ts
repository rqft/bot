import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { BaseSlashSubCommand } from "../baseslash";

export class TodoPutSlashSubCommand extends BaseSlashSubCommand {
  name = "edit";
  description = "edit todo";
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
        {
          name: "data",
          description: "what to add",
          type: ApplicationCommandOptionTypes.STRING,
          required: true,
        },
      ],
    });
  }
  run = Formatter.Todo.put;
}
