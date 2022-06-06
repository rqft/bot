"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchUrbanSlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const baseslash_1 = require("../baseslash");
class SearchUrbanSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "urban";
    description = "look at txt but funny";
    constructor() {
        super({
            options: [
                {
                    name: "query",
                    description: "what to search for",
                    type: constants_1.ApplicationCommandOptionTypes.STRING,
                    required: true,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Search.urban;
}
exports.SearchUrbanSlashSubCommand = SearchUrbanSlashSubCommand;
