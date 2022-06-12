import { Formatter } from "../../../../tools/formatter";
import { BaseImageOption, BaseSlashSubCommand } from "../baseslash";

export class ImageAverageColorSlashSubCommand extends BaseSlashSubCommand {
  name = "average";
  description = "blend";
  constructor() {
    super({
      options: [new BaseImageOption()],
    });
  }
  run = Formatter.Image.averageColor;
}
