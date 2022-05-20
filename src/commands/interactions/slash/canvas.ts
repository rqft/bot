import {
  ApplicationCommandOptionTypes,
  ImageFormats,
} from "detritus-client/lib/constants";

import { Formatter } from "../../../tools/formatter";
import { Parameters } from "../../../tools/parameters";
import { BaseSlashCommand } from "./baseslash";
export default class CanvasSlashCommand extends BaseSlashCommand {
  name = "canvas";
  description = "generate images";
  constructor() {
    super({
      options: [
        {
          name: "method",
          description: "what to make",
          type: ApplicationCommandOptionTypes.STRING,
          required: true,
          autocomplete: true,
          onAutoComplete: Parameters.Autocomplete.choices(
            Formatter.SomeRandomApi.CanvasMethods
          ),
        },

        {
          name: "target",
          description: "what to use",
          value: Parameters.imageUrl(ImageFormats.PNG),
          default: Parameters.Default.imageUrl(ImageFormats.PNG),
          type: ApplicationCommandOptionTypes.STRING,
          required: false,
        },
      ],
    });
  }

  run = Formatter.SomeRandomApi.canvas;
}
