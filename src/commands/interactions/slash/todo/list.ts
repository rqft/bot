import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { Parameters } from "../../../../tools/parameters";
import { BaseSlashSubCommand } from "../baseslash";

export class TodoListSlashSubCommand extends BaseSlashSubCommand {
  name = "list";
  description = "list all todo";
  constructor() {
    super({
      options: [
        {
          name: "user",
          description: "who's",
          type: ApplicationCommandOptionTypes.USER,
          default: Parameters.Default.author,
        },
      ],
    });
  }
  run = Formatter.Todo.list;
}
