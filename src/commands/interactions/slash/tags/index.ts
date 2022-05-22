import { BaseSlashCommand } from "../baseslash";
import { TagDeleteSlashSubCommand } from "./delete";
import { TagExecSlashSubCommand } from "./exec";
import { TagGetSlashSubCommand } from "./get";
import { TagInspectSlashSubCommand } from "./inspect";
import { TagListSlashSubCommand } from "./list";
import { TagSetSlashSubCommand } from "./set";
export default class TagSlashCommandGroup extends BaseSlashCommand {
  name = "tag";
  description = "tag";
  constructor() {
    super({
      options: [
        new TagGetSlashSubCommand(),
        new TagSetSlashSubCommand(),
        new TagDeleteSlashSubCommand(),
        new TagListSlashSubCommand(),
        new TagInspectSlashSubCommand(),
        new TagExecSlashSubCommand(),
      ],
    });
  }
}
