import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { APIs } from "pariah";
import { Formatter } from "../../../../tools/formatter";
import { toTitleCase } from "../../../../tools/tools";
import { BaseImageOption, BaseSlashSubCommand } from "../baseslash";

export class ImageMirrorSlashSubCommand extends BaseSlashSubCommand {
  name = "mirror";
  description = "make image mirrored on self";
  constructor() {
    super({
      options: [
        new BaseImageOption(),
        {
          name: "method",
          description: "what way to start from",
          type: ApplicationCommandOptionTypes.STRING,
          required: false,
          choices: Object.entries(APIs.Jonathan.MirrorMethods).map(
            ([name, value]) => ({
              name: toTitleCase(name),
              value,
            })
          ),
        },
      ],
    });
  }
  run = Formatter.Image.mirror;
}
