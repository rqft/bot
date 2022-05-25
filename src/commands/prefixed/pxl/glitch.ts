import { CommandClient } from "detritus-client";
import { ImageFormats } from "detritus-client/lib/constants";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { Parameters } from "../../../tools/parameters";
import { BaseCommand } from "../basecommand";

export default class PxlGlitchCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "pxl glitch",
      metadata: ImageMetadata(
        "morbius from the matrix",
        "<target: Image> <-iterations: number=10> <-amount: number=5> <-gif-count: number=10> <-gif-delay: number=100ms>"
      ),
      type: [
        {
          name: "target",
          type: Parameters.imageUrl(ImageFormats.PNG),
          default: Parameters.Default.imageUrl(ImageFormats.PNG),
        },
      ],

      args: [
        {
          name: "iterations",
          type: "number",
          required: false,
          default: 10,
        },
        {
          name: "amount",
          type: "number",
          required: false,
          default: 5,
        },
        {
          name: "gif-count",
          aliases: ["gifcount"],
          type: "number",
          required: false,
          default: 10,
        },
        {
          name: "gif-delay",
          aliases: ["gifdelay"],
          type: "number",
          required: false,
          default: 100,
        },
      ],
    });
  }

  run = Formatter.Pxl.glitch;
}
