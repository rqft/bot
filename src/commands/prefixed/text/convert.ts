import { APIs } from "@rqft/fetch";
import { CommandClient } from "detritus-client";
import { ToolsMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { BaseCommand } from "../basecommand";

export default class TextConvertCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "text convert",
      aliases: ["text encode"],
      metadata: ToolsMetadata("encode text"),
      type: [
        {
          name: "conversion",
          type: "string",
          required: true,
          choices: Object.values(APIs.Jonathan.Conversion),
        },
        {
          name: "text",
          type: "string",
          required: true,
        },
      ],
      args: [
        {
          name: "method",
          aliases: ["m"],
          type: "string",
          required: false,
          choices: Object.values(APIs.Jonathan.ConversionMethods),
        },
        {
          name: "decode",
          aliases: ["d"],
          type: "boolean",
          required: false,
        },
        {
          name: "encode",
          aliases: ["e"],
          type: "boolean",
          required: false,
        },
      ],
    });
  }

  run = Formatter.Text.convert;
}
