"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pariah_1 = require("pariah");
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const parameters_1 = require("../../../tools/parameters");
const basecommand_1 = require("../basecommand");
class PxlScreenshotCommand extends basecommand_1.BaseCommand {
    constructor(client) {
        super(client, {
            name: "pxl screenshot",
            metadata: (0, command_metadata_1.ImageMetadata)("Windows + Shift + S", "<query: string> <-browser: Browser=chromium> <-full-page: boolean=true> ?<-locale: string> <-theme: string=light>"),
            type: [
                {
                    name: "url",
                    type: parameters_1.Parameters.url,
                    required: true,
                },
            ],
            args: [
                {
                    name: "browser",
                    type: "string",
                    choices: Object.values(pariah_1.APIs.PxlAPI.ScreenshotBrowser),
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
                    choices: Object.values(pariah_1.APIs.PxlAPI.ScreenshotTheme),
                    required: false,
                }
            ],
        });
    }
    run = formatter_1.Formatter.Pxl.screenshot;
}
exports.default = PxlScreenshotCommand;
