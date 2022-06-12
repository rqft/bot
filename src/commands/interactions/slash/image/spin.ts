import { Formatter } from "../../../../tools/formatter";
import { BaseImageOption, BaseSlashSubCommand } from "../baseslash";

export class ImageSpinSlashSubCommand extends BaseSlashSubCommand {
  name = "spin";
  description =
    "you spin me right round baby right round like a record baby right round round round";
  constructor() {
    super({
      options: [new BaseImageOption()],
    });
  }
  run = Formatter.Image.spin;
}
