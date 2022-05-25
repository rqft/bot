import {
    ApplicationCommandOptionTypes,
    ImageFormats
} from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { Parameters } from "../../../../tools/parameters";
import { BaseSlashSubCommand } from "../baseslash";

export class PxlGlitchSlashSubCommand extends BaseSlashSubCommand {
  name = "glitch";
  description = "Illegal byte 0x56";
  constructor() {
    super({
      options: [
        {
          name: "target",
          description: "what to use",
          value: Parameters.imageUrl(ImageFormats.PNG),
          default: Parameters.Default.imageUrl(ImageFormats.PNG),
          type: ApplicationCommandOptionTypes.STRING,
          required: false,
        },
        {
            name: "iterations",
            description: "how many",
            type: ApplicationCommandOptionTypes.INTEGER,
            required: false,
        },
        {
            name: "amount",
            description: "how much",
            type: ApplicationCommandOptionTypes.INTEGER,
            required: false,
        },
        {
            name: "gif_count",
            label: "gif-count",
            description: "how many frames",
            type: ApplicationCommandOptionTypes.INTEGER,
            required: false,
        },
        {
            name: "gif_delay",
            label: "gif-delay",
            description: "how long each frame",
            type: ApplicationCommandOptionTypes.INTEGER,
            required: false,
        }
      ],
    });
  }
  run = Formatter.Pxl.glitch;
}
