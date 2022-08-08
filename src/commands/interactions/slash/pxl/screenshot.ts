import { APIs } from "@rqft/fetch";
import { ApplicationCommandOptionTypes } from "detritus-client/lib/constants";
import { Formatter } from "../../../../tools/formatter";
import { Parameters } from "../../../../tools/parameters";
import { toTitleCase } from "../../../../tools/tools";
import { BaseSlashSubCommand } from "../baseslash";

export class PxlScreenshotSlashSubCommand extends BaseSlashSubCommand {
  name = "screenshot";
  description = "Windows + Shift + S";
  constructor() {
    super({
      options: [
        {
          name: "url",
          description: "web",
          value: Parameters.url,
          type: ApplicationCommandOptionTypes.STRING,
          required: true,
        },

        {
          name: "browser",
          description: "where are u",
          type: ApplicationCommandOptionTypes.STRING,
          choices: Object.values(APIs.PxlAPI.ScreenshotBrowser).map((x) => ({
            name: toTitleCase(x),
            value: x,
          })),
          required: false,
        },
        {
          name: "full-page",
          description: "100%",
          type: ApplicationCommandOptionTypes.BOOLEAN,
          default: true,
        },
        {
          name: "locale",
          description: "not english",
          type: ApplicationCommandOptionTypes.STRING,
          required: false,
        },
        {
          name: "theme",
          description: "woo colors",
          type: "string",
          choices: Object.values(APIs.PxlAPI.ScreenshotTheme).map((x) => ({
            name: toTitleCase(x),
            value: x,
          })),
          required: false,
        },
      ],
    });
  }
  run = Formatter.Pxl.screenshot;
}
