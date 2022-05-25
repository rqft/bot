"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../tools/formatter");
const parameters_1 = require("../../../tools/parameters");
const baseslash_1 = require("./baseslash");
class CanvasSlashCommand extends baseslash_1.BaseSlashCommand {
    name = "canvas";
    description = "generate images";
    constructor() {
        super({
            options: [
                {
                    name: "method",
                    description: "what to make",
                    type: constants_1.ApplicationCommandOptionTypes.STRING,
                    required: true,
                    autocomplete: true,
                    onAutoComplete: parameters_1.Parameters.Autocomplete.choices(formatter_1.Formatter.SomeRandomApi.CanvasMethods),
                },
                {
                    name: "target",
                    description: "what to use",
                    value: parameters_1.Parameters.imageUrl(constants_1.ImageFormats.PNG),
                    default: parameters_1.Parameters.Default.imageUrl(constants_1.ImageFormats.PNG),
                    type: constants_1.ApplicationCommandOptionTypes.STRING,
                    required: false,
                },
            ],
        });
    }
    run = formatter_1.Formatter.SomeRandomApi.canvas;
}
exports.default = CanvasSlashCommand;
