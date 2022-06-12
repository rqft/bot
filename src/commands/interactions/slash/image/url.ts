import { Formatter } from "../../../../tools/formatter";
import { BaseImageOption, BaseSlashSubCommand } from "../baseslash";

export class ImageUrlSlashSubCommand extends BaseSlashSubCommand {
  name = "url";
  description = "u can just use devtools idiot";
  constructor() {
    super({
      options: [new BaseImageOption()],
    });
  }
  run = Formatter.Image.url;
}
