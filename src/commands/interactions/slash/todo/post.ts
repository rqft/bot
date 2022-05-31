import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { BaseSlashSubCommand } from "../baseslash";

export class TodoPostSlashSubCommand extends BaseSlashSubCommand {
  name = "post";
  description = "add todo";
  constructor() {
    super({
      options: [
        {
          name: "data",
          description: "what to add",
          type: ApplicationCommandOptionTypes.STRING,
          required: true,
        },
      ],
    });
  }
  run = Formatter.Todo.post;
}
