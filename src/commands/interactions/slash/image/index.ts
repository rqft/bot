import { ImageMirrorSlashSubCommand } from "./mirror";
import { BaseSlashCommand } from "../baseslash";
import { ImageSpinSlashSubCommand } from "./spin";
export default class ImageSlashCommandGroup extends BaseSlashCommand {
  name = "image";
  description = "adobe photoshop";
  constructor() {
    super({
      options: [
        new ImageMirrorSlashSubCommand(),
        new ImageSpinSlashSubCommand(),
      ],
    });
  }
}
