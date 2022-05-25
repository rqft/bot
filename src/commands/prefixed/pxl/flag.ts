import { CommandClient } from "detritus-client";
import { ImageFormats } from "detritus-client/lib/constants";
import { APIs } from "pariah";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { Parameters } from "../../../tools/parameters";
import { BaseCommand } from "../basecommand";

export default class PxlFlagCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "pxl flag",
      metadata: ImageMetadata(
        "stop being gay",
        "<type: FagType=gay> <target: Image>"
      ),
      type: [
        {
          name: "flag",
          type: "string",
          choices: Object.values(APIs.PxlAPI.Flags),
          default: APIs.PxlAPI.Flags.GAY,
        },
        {
          name: "target",
          type: Parameters.imageUrl(ImageFormats.PNG),
          default: Parameters.Default.imageUrl(ImageFormats.PNG),
        },
      ],
    });
  }

  run = Formatter.Pxl.flag;
}
