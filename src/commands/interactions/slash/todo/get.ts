import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { Parameters } from "../../../../tools/parameters";
import { BaseSlashSubCommand } from "../baseslash";

export class TodoGetSlashSubCommand extends BaseSlashSubCommand {
  name = "get";
  description = "get todo";
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
          name: "user",
          description: "whos",
          type: ApplicationCommandOptionTypes.USER,
          required: false,
          default: Parameters.Default.author,
        },
      ],
    });
  }
  run = Formatter.Todo.get;
}
