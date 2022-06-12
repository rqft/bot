import { Formatter } from "../../../../tools/formatter";
import { BaseImageOption, BaseSlashSubCommand } from "../baseslash";

export class PxlAjitSlashSubCommand extends BaseSlashSubCommand {
  name = "ajit";
  description = "put some guy on here";
  constructor() {
    super({
      options: [new BaseImageOption()],
    });
  }
  run = Formatter.Pxl.ajit;
}
