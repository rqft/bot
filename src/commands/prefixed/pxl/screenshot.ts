import { CommandClient } from "detritus-client";
import { APIs } from "pariah";
import { ImageMetadata } from "../../../tools/command-metadata";
import { Formatter } from "../../../tools/formatter";
import { Parameters } from "../../../tools/parameters";
import { BaseCommand } from "../basecommand";

export default class PxlScreenshotCommand extends BaseCommand {
  constructor(client: CommandClient) {
    super(client, {
      name: "pxl screenshot",
      metadata: ImageMetadata("Windows + Shift + S", "<query: string> <-browser: Browser=chromium> <-full-page: boolean=true> ?<-locale: string> <-theme: string=light>"),
      type: [
        {
          name: "url",
          type: Parameters.url,
          required: true,
        },
      ],

      args: [
        {
          name: "browser",
          type: "string",
          choices: Object.values(APIs.PxlAPI.ScreenshotBrowser),
          required: false,
        },
        {
            name: "full-page",
            type: "bool",
            default: true
        },
        {
            name: 'locale',
            type: 'string',
            required: false,
        },
        {
            name: 'theme',
            type: 'string',
            choices: Object.values(APIs.PxlAPI.ScreenshotTheme),
            required: false,
        }
      ],
    });
  }

  run = Formatter.Pxl.screenshot;
}
