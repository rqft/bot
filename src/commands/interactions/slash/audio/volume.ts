import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { Parameters } from "../../../../tools/parameters";
import { BaseSlashSubCommand } from "../baseslash";

export class AudioVolumeSlashSubCommand extends BaseSlashSubCommand {
  name = "volume";
  description = "set volume";
  constructor() {
    super({
      options: [
        {
          name: "target",
          description: "what to use",
          value: Parameters.mediaUrl({
            video: false,
            audio: true,
            image: false,
          }),
          default: Parameters.Default.mediaUrl({
            video: false,
            audio: true,
            image: false,
          }),
          type: ApplicationCommandOptionTypes.STRING,
          required: false,
        },

        {
          name: "volume",
          description: "how much",
          type: ApplicationCommandOptionTypes.NUMBER,
          required: true,
        },
      ],
    });
  }
  run = Formatter.Audio.volume;
}
