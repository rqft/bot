import { ImageMirrorSlashSubCommand } from "./mirror";
import { BaseSlashCommand } from "../baseslash";
export default class ImageSlashCommandGroup extends BaseSlashCommand {
  name = "image";
  description = "adobe photoshop";
  constructor() {
    super({
      options: [
        new ImageMirrorSlashSubCommand()
      ],
    });
  }
}
