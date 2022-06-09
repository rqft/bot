import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { APIs } from "pariah";
import { Formatter } from "../../../../tools/formatter";
import { Parameters } from "../../../../tools/parameters";
import { BaseSlashSubCommand } from "../baseslash";

export class SearchSpotifySlashSubCommand extends BaseSlashSubCommand {
  name = "spotify";
  description = "look at mp3";
  constructor() {
    super({
      options: [
        {
          name: "query",
          description: "what to search for",
          type: ApplicationCommandOptionTypes.STRING,
          required: true,
        },
        {
          name: "type",
          description: "comma separated list of types",
          type: ApplicationCommandOptionTypes.STRING,
          required: false,
          value: Parameters.array((value) => {
            if (
              !Object.values(APIs.Spotify.Keys).includes(
                value as APIs.Spotify.Keys
              )
            ) {
              throw new Error(`Invalid type ${value}`);
            }

            return value as APIs.Spotify.Keys;
          }, ","),
        },
      ],
    });
  }

  run = Formatter.Search.spotify;
}
