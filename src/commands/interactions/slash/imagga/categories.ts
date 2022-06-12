import { ImageFormats } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { BaseImageOption, BaseSlashSubCommand } from "../baseslash";

export class ImaggaCategoriesSlashSubCommand extends BaseSlashSubCommand {
  name = "categories";
  description = "identify it now";
  constructor() {
    super({
      options: [new BaseImageOption(ImageFormats.PNG)],
    });
  }
  run = Formatter.Imagga.categories;
}
