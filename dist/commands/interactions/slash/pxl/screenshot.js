"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PxlScreenshotSlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const pariah_1 = require("pariah");
const formatter_1 = require("../../../../tools/formatter");
const parameters_1 = require("../../../../tools/parameters");
const tools_1 = require("../../../../tools/tools");
const baseslash_1 = require("../baseslash");
class PxlScreenshotSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "screenshot";
    description = "Windows + Shift + S";
    constructor() {
        super({
            options: [
                {
                    name: "url",
                    description: "web",
                    value: parameters_1.Parameters.url,
                    type: constants_1.ApplicationCommandOptionTypes.STRING,
                    required: true,
                },
                {
                    name: "browser",
                    description: "where are u",
                    type: constants_1.ApplicationCommandOptionTypes.STRING,
                    choices: Object.values(pariah_1.APIs.PxlAPI.ScreenshotBrowser).map((x) => ({
                        name: (0, tools_1.toTitleCase)(x),
                        value: x,
                    })),
                    required: false,
                },
                {
                    name: "full-page",
                    description: "100%",
                    type: constants_1.ApplicationCommandOptionTypes.BOOLEAN,
                    default: true,
                },
                {
                    name: "locale",
                    description: "not english",
                    type: constants_1.ApplicationCommandOptionTypes.STRING,
                    required: false,
                },
                {
                    name: "theme",
                    description: "woo colors",
                    type: "string",
                    choices: Object.values(pariah_1.APIs.PxlAPI.ScreenshotTheme).map((x) => ({
                        name: (0, tools_1.toTitleCase)(x),
                        value: x,
                    })),
                    required: false,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Pxl.screenshot;
}
exports.PxlScreenshotSlashSubCommand = PxlScreenshotSlashSubCommand;
