import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { BaseImageOption, BaseSlashSubCommand } from "../baseslash";

export class PxlGlitchSlashSubCommand extends BaseSlashSubCommand {
  name = "glitch";
  description = "Illegal byte 0x56";
  constructor() {
    super({
      options: [
        new BaseImageOption(),
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
        },
      ],
    });
  }
  run = Formatter.Pxl.glitch;
}
