import { ImageFormats } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { BaseImageOption, BaseSlashSubCommand } from "../baseslash";

export class ImaggaTagsSlashSubCommand extends BaseSlashSubCommand {
  name = "tags";
  description = "wtf is this image";
  constructor() {
    super({
      options: [new BaseImageOption(ImageFormats.PNG)],
    });
  }
  run = Formatter.Imagga.tags;
}
