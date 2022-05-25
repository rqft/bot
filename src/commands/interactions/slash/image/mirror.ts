import {
  ApplicationCommandOptionTypes,
  ImageFormats,
} from "detritus-client/lib/constants";
import { MirrorMethods } from "../../../../api/routes/image.flop";
import { Formatter } from "../../../../tools/formatter";
import { Parameters } from "../../../../tools/parameters";
import { toTitleCase } from "../../../../tools/tools";
import { BaseSlashSubCommand } from "../baseslash";

export class ImageMirrorSlashSubCommand extends BaseSlashSubCommand {
  name = "mirror";
  description = "make image mirrored on self";
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
          name: "method",
          description: "what way to start from",
          type: ApplicationCommandOptionTypes.STRING,
          required: false,
          choices: Object.entries(MirrorMethods).map(([name, value]) => ({
            name: toTitleCase(name),
            value,
          })),
        },
      ],
    });
  }
  run = Formatter.Image.mirror;
}
