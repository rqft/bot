"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../tools/formatter");
const baseslash_1 = require("./baseslash");
class DefineSlashCommand extends baseslash_1.BaseSlashCommand {
    name = "define";
    description = "im in love with merriam";
    constructor() {
        super({
            options: [
                {
                    name: "word",
                    description: "what to use",
                    type: constants_1.ApplicationCommandOptionTypes.STRING,
                    required: true,
                    autocomplete: true,
                    onAutoComplete: formatter_1.Formatter.definitions,
                },
            ],
        });
    }
    run = formatter_1.Formatter.define;
}
exports.default = DefineSlashCommand;
