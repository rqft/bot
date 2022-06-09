import { BaseSlashCommand } from "../baseslash";
import { SearchDictionarySlashSubCommand } from "./dictionary";
import { SearchImageSlashSubCommand } from "./image";
import { SearchSpotifySlashSubCommand } from "./spotify";
import { SearchUrbanSlashSubCommand } from "./urban";
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
        new SearchDictionarySlashSubCommand(),
        new SearchUrbanSlashSubCommand(),
        new SearchSpotifySlashSubCommand(),
      ],
    });
  }
}
