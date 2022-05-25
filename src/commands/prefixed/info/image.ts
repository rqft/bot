import { CommandClient } from "detritus-client";
import { ToolsMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { Parameters } from "../../../tools/parameters";
import { BaseCommand } from "../basecommand";

export default class InfoImageCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "info image",
      metadata: ToolsMetadata("emoji image", "<target: Image>"),
      type: [
        {
          name: "target",
          type: Parameters.imageUrl(),
          default: Parameters.Default.imageUrl,
          required: true,
        },
      ],
    });
  }

  run = Formatter.Info.image;
}
