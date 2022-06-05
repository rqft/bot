import { BaseSlashCommand } from "../baseslash";
import { SearchImageSlashSubCommand } from "./image";
import { SearchWebSlashSubCommand } from "./web";
import { SearchYoutubeSlashSubCommand } from "./youtube";

export default class SearchSlashCommandGroup extends BaseSlashCommand {
  name = "search";
  description = "google exists you know";
  constructor() {
    super({
      options: [
        new SearchImageSlashSubCommand(),
        new SearchWebSlashSubCommand(),
        new SearchYoutubeSlashSubCommand(),
      ],
    });
  }
}
