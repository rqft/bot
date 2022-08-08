import { APIs } from "@rqft/fetch";
import { CommandClient } from "detritus-client";

import { FunMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { Parameters } from "../../../tools/parameters";
import { BaseCommand } from "../basecommand";

export default class SearchSpotifyCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "search spotify",
      metadata: FunMetadata(
        "mp3",
        "<query: string> ?<-type: Array<MediaTypes>>",
        ["shiey settle down", "nf perception -type album"]
      ),
      type: [{ name: "query", type: "string", consume: true }],
      args: [
        {
          name: "type",
          aliases: ["t"],
          type: Parameters.array((value) => {
            if (
              !Object.values(APIs.Spotify.Keys).includes(
                value as APIs.Spotify.Keys
              )
            ) {
              throw new Error(`Invalid type ${value}`);
            }

            return value as APIs.Spotify.Keys;
          }, ","),
          required: false,
        },
      ],
    });
  }

  run = Formatter.Search.spotify;
}
