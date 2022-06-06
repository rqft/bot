"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchDictionarySlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const baseslash_1 = require("../baseslash");
class SearchDictionarySlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "dictionary";
    description = "look at txt";
    constructor() {
        super({
            options: [
                {
                    name: "query",
                    description: "what to search for",
                    type: constants_1.ApplicationCommandOptionTypes.STRING,
                    required: true,
                    autocomplete: true,
                    onAutoComplete: formatter_1.Formatter.Search.definitions,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Search.define;
}
exports.SearchDictionarySlashSubCommand = SearchDictionarySlashSubCommand;
