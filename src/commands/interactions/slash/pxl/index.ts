import { BaseSlashCommand } from "../baseslash";
import { PxlAjitSlashSubCommand } from "./ajit";
import { PxlEmojiMosaicSlashSubCommand } from "./emoji-mosaic";
import { PxlEyesSlashSubCommand } from "./eyes";
import { PxlFlagSlashSubCommand } from "./flag";
import { PxlGlitchSlashSubCommand } from "./glitch";
import { PxlJpegSlashSubCommand } from "./jpeg";
import { PxlLegoSlashSubCommand } from "./lego";
import { PxlScreenshotSlashSubCommand } from "./screenshot";

import { PxlSnapchatSlashSubCommand } from "./snapchat";
import { PxlSonicSlashSubCommand } from "./sonic";
import { PxlThonkifySlashSubCommand } from "./thonkify";
export default class PxlSlashCommandGroup extends BaseSlashCommand {
  name = "pxl";
  description = "mat men";
  constructor() {
    super({
      options: [
        new PxlAjitSlashSubCommand(),
        new PxlEmojiMosaicSlashSubCommand(),
        new PxlEyesSlashSubCommand(),
        new PxlFlagSlashSubCommand(),
        new PxlGlitchSlashSubCommand(),
        new PxlJpegSlashSubCommand(),
        new PxlLegoSlashSubCommand(),
        new PxlSnapchatSlashSubCommand(),
        new PxlScreenshotSlashSubCommand(),
        new PxlSonicSlashSubCommand(),
        new PxlThonkifySlashSubCommand(),
      ],
    });
  }
}
