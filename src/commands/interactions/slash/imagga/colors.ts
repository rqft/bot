import { ImageFormats } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { BaseImageOption, BaseSlashSubCommand } from "../baseslash";

export class ImaggaColorsSlashSubCommand extends BaseSlashSubCommand {
  name = "colors";
  description = "oooo pretty colours";
  constructor() {
    super({
      options: [new BaseImageOption(ImageFormats.PNG)],
    });
  }
  run = Formatter.Imagga.colors;
}
