import { APIs } from "@rqft/fetch";
import { CommandClient } from "detritus-client";
import { ImageFormats } from "detritus-client/lib/constants";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { Parameters } from "../../../tools/parameters";
import { BaseCommand } from "../basecommand";

export default class PxlEyesCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "pxl snapchat",
      metadata: ImageMetadata(
        "teenage white girl named brittany uses this",
        "<type: SnapchatFilter=random> <target: Image>"
      ),
      type: [
        {
          name: "filter",
          type: "string",
          choices: Object.values(APIs.PxlAPI.SnapchatFilters),
          default: APIs.PxlAPI.SnapchatFilters.RANDOM,
        },
        {
          name: "target",
          type: Parameters.imageUrl(ImageFormats.PNG),
          default: Parameters.Default.imageUrl(ImageFormats.PNG),
        },
      ],
    });
  }

  run = Formatter.Pxl.snapchat;
}
