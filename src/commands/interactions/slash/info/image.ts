import { Formatter } from "../../../../tools/formatter";
import { BaseImageOption, BaseSlashSubCommand } from "../baseslash";

export class ImageSlashSubCommand extends BaseSlashSubCommand {
  name = "image";
  description = "image info";
  constructor() {
    super({
      options: [new BaseImageOption()],
    });
  }

  run = Formatter.Info.image;
}
