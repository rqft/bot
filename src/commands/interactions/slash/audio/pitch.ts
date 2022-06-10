import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { Parameters } from "../../../../tools/parameters";
import { BaseSlashSubCommand } from "../baseslash";

export class AudioPitchSlashSubCommand extends BaseSlashSubCommand {
  name = "pitch";
  description = "set pitch";
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
          name: "pitch",
          description: "how much",
          type: ApplicationCommandOptionTypes.NUMBER,
          required: true,
          minValue: 0.01,
          maxValue: 2,
        },
      ],
    });
  }
  run = Formatter.Audio.pitch;
}
