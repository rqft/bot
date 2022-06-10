import { CommandClient } from "detritus-client";
import { AudioMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { BaseVideoCommand } from "../basecommand";

export default class AudioExtractCommand extends BaseVideoCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "audio extract",
      metadata: AudioMetadata("get audio", "<target: Video>"),
    });
  }

  run = Formatter.Audio.extract;
}
