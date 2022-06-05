"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchImageSlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const baseslash_1 = require("../baseslash");
class SearchImageSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "image";
    description = "look at png";
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
    run = formatter_1.Formatter.Search.image;
}
exports.SearchImageSlashSubCommand = SearchImageSlashSubCommand;
