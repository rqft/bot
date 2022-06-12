import { Formatter } from "../../../../tools/formatter";
import { BaseImageOption, BaseSlashSubCommand } from "../baseslash";

export class ImageUpscaleSlashSubCommand extends BaseSlashSubCommand {
  name = "upscale";
  description = "make it huge";
  constructor() {
    super({
      options: [new BaseImageOption()],
    });
  }

  run = Formatter.Image.upscale;
}
