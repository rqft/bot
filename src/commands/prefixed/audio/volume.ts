import { CommandClient } from "detritus-client";
import { AudioMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { BaseAudioCommand } from "../basecommand";

export default class AudioVolumeCommand extends BaseAudioCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "audio volume",
      metadata: AudioMetadata("set volume", "<target: Audio> <volume: number>"),
      type: [
        {
          name: "volume",
          type: "number",
          required: true,
        },
      ],
    });
  }

  run = Formatter.Audio.volume;
}
