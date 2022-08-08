"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageInvertSlashSubCommand = void 0;
const fetch_1 = require("@rqft/fetch");
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const parameters_1 = require("../../../../tools/parameters");
const baseslash_1 = require("../baseslash");
class ImageInvertSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "invert";
    description = "WTF....";
    constructor() {
        super({
            options: [
                new baseslash_1.BaseImageOption(),
                {
                    name: "method",
                    description: "what way",
                    type: constants_1.ApplicationCommandOptionTypes.STRING,
                    required: false,
                    autocomplete: true,
                    onAutoComplete: parameters_1.Parameters.Autocomplete.choices(Object.values(fetch_1.APIs.Jonathan.InvertMethods)),
                },
            ],
        });
    }
    run = formatter_1.Formatter.Image.invert;
}
exports.ImageInvertSlashSubCommand = ImageInvertSlashSubCommand;
