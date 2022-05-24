import { CommandClient } from "detritus-client";
import { ImageFormats } from "detritus-client/lib/constants";
import { APIs } from "pariah";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { Parameters } from "../../../tools/parameters";
import { BaseCommand } from "../basecommand";

export default class PxlEyesCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "pxl eyes",
      metadata: ImageMetadata(
        "THEY SEE YOU RUNNING",
        "<type: EyesType=default> <target: Image>"
      ),
      type: [
        {
          name: "type",
          type: "string",
          choices: Object.values(APIs.PxlAPI.Eyes),
          default: APIs.PxlAPI.Eyes.DEFAULT,
        },
        {
          name: "target",
          type: Parameters.imageUrl(ImageFormats.PNG),
          default: Parameters.Default.imageUrl(ImageFormats.PNG),
        },
      ],
    });
  }

  run = Formatter.Pxl.eyes;
}
