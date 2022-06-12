import { ImageFormats } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { BaseImageOption, BaseSlashSubCommand } from "../baseslash";

export class ImaggaTextSlashSubCommand extends BaseSlashSubCommand {
  name = "text";
  description = "the images are talking to me";
  constructor() {
    super({
      options: [new BaseImageOption(ImageFormats.PNG)],
    });
  }
  run = Formatter.Imagga.readText;
}
