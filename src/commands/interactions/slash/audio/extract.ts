import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { Parameters } from "../../../../tools/parameters";
import { BaseSlashSubCommand } from "../baseslash";

export class AudioExtractSlashSubCommand extends BaseSlashSubCommand {
  name = "extract";
  description = "get audio from video";
  constructor() {
    super({
      options: [
        {
          name: "target",
          description: "what to use",
          value: Parameters.mediaUrl({
            video: true,
            audio: false,
            image: false,
          }),
          default: Parameters.Default.mediaUrl({
            video: true,
            audio: false,
            image: false,
          }),
          type: ApplicationCommandOptionTypes.STRING,
          required: false,
        },
      ],
    });
  }
  run = Formatter.Audio.extract;
}
