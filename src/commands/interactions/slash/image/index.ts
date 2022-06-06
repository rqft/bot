import { BaseSlashCommand } from "../baseslash";
import { ImageColorSlashSubCommand } from "./color";
import { ImageMirrorSlashSubCommand } from "./mirror";
import { ImageResizeSlashSubCommand } from "./resize";
import { ImageRotateSlashSubCommand } from "./rotate";
import { ImageSpinSlashSubCommand } from "./spin";
import { ImageTintSlashSubCommand } from "./tint";
import { ImageUrlSlashSubCommand } from "./url";
export default class ImageSlashCommandGroup extends BaseSlashCommand {
  name = "image";
  description = "adobe photoshop";
  constructor() {
    super({
      options: [
        new ImageMirrorSlashSubCommand(),
        new ImageSpinSlashSubCommand(),
        new ImageColorSlashSubCommand(),
        new ImageResizeSlashSubCommand(),
        new ImageRotateSlashSubCommand(),
        new ImageUrlSlashSubCommand(),
        new ImageTintSlashSubCommand(),
      ],
    });
  }
}
