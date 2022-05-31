import { BaseSlashCommand } from "../baseslash";
import { TodoDeleteSlashSubCommand } from "./delete";
import { TodoGetSlashSubCommand } from "./get";
import { TodoListSlashSubCommand } from "./list";
import { TodoPostSlashSubCommand } from "./post";
import { TodoPutSlashSubCommand } from "./put";
export default class TagSlashCommandGroup extends BaseSlashCommand {
  name = "todo";
  description = "list";
  constructor() {
    super({
      options: [
        new TodoListSlashSubCommand(),
        new TodoGetSlashSubCommand(),
        new TodoPostSlashSubCommand(),
        new TodoPutSlashSubCommand(),
        new TodoDeleteSlashSubCommand(),
      ],
    });
  }
}
