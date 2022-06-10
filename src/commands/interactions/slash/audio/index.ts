import { BaseSlashCommand } from "../baseslash";
import { AudioExtractSlashSubCommand } from "./extract";

export default class AudioSlashCommandGroup extends BaseSlashCommand {
  name = "audio";
  description = "audacity";
  constructor() {
    super({
      options: [new AudioExtractSlashSubCommand()],
    });
  }
}
