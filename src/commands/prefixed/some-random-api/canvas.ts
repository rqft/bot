import { CommandClient } from "detritus-client";
import { ImageFormats } from "detritus-client/lib/constants";
import { ToolsMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { Parameters } from "../../../tools/parameters";
import { BaseCommand } from "../basecommand";
export default class CanvasCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "canvas",
      metadata: ToolsMetadata(
        "generate images",
        "<method: CanvasMethods> <target: Image=^>"
      ),

      type: [
        {
          name: "method",
          choices: Formatter.SomeRandomApi.CanvasMethods,
          required: true,
        },
        {
          name: "target",
          type: Parameters.imageUrl(ImageFormats.PNG),
          default: Parameters.Default.imageUrl(ImageFormats.PNG),
        },
      ],
    });
  }

  run = Formatter.SomeRandomApi.canvas;
}
