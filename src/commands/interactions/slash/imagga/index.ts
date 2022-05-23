
import { BaseSlashCommand } from "../baseslash";
import { ImaggaCategoriesSlashSubCommand } from "./categories";
import { ImaggaColorsSlashSubCommand } from "./colors";
import { ImaggaTagsSlashSubCommand } from "./tags";
import { ImaggaTextSlashSubCommand } from "./test";
export default class ImaggaSlashCommandGroup extends BaseSlashCommand {
  name = "imagga";
  description = "abusing ai";
  constructor() {
    super({
      options: [
        new ImaggaTagsSlashSubCommand(),
        new ImaggaCategoriesSlashSubCommand(),
        new ImaggaColorsSlashSubCommand(),
        new ImaggaTextSlashSubCommand()
      ],
    });
  }
}
