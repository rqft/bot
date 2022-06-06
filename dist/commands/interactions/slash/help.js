"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../tools/formatter");
const baseslash_1 = require("./baseslash");
class SlashHelpCommand extends baseslash_1.BaseSlashCommand {
    name = "help";
    description = "get help";
    constructor() {
        super({
            options: [
                {
                    name: "query",
                    description: "what command",
                    type: constants_1.ApplicationCommandOptionTypes.STRING,
                    required: false,
                    autocomplete: true,
                    onAutoComplete: formatter_1.Formatter.helpAutocomplete,
                },
            ],
        });
    }
    run = formatter_1.Formatter.help;
}
exports.default = SlashHelpCommand;
