import { BaseSlashCommand } from "../baseslash";
import { ImageAverageColorSlashSubCommand } from "./average-color";
import { ImageBrightnessSlashSubCommand } from "./brightness";
import { ImageColorSlashSubCommand } from "./color";
import { ImageFisheyeSlashSubCommand } from "./fisheye";
import { ImageInvertSlashSubCommand } from "./invert";
import { ImageMirrorSlashSubCommand } from "./mirror";
import { ImageResizeSlashSubCommand } from "./resize";
import { ImageRotateSlashSubCommand } from "./rotate";
import { ImageSaturationSlashSubCommand } from "./saturation";
import { ImageSpinSlashSubCommand } from "./spin";
import { ImageTiltSlashSubCommand } from "./tilt";
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
        new ImageTiltSlashSubCommand(),
        new ImageAverageColorSlashSubCommand(),
        new ImageBrightnessSlashSubCommand(),
        new ImageFisheyeSlashSubCommand(),
        new ImageInvertSlashSubCommand(),
        new ImageSaturationSlashSubCommand(),
      ],
    });
  }
}
