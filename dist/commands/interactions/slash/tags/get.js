"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagGetSlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const parameters_1 = require("../../../../tools/parameters");
const baseslash_1 = require("../baseslash");
class TagGetSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "get";
    description = "get tag";
    constructor() {
        super({
            options: [
                {
                    name: "key",
                    description: "what",
                    type: constants_1.ApplicationCommandOptionTypes.STRING,
                    autocomplete: true,
                    onAutoComplete: formatter_1.Formatter.Tag.search,
                    required: true,
                },
                {
                    name: "args",
                    description: "what to use",
                    type: constants_1.ApplicationCommandOptionTypes.STRING,
                    required: false,
                    default: [],
                    value: parameters_1.Parameters.array(String),
                },
            ],
        });
    }
    run = formatter_1.Formatter.Tag.get;
}
exports.TagGetSlashSubCommand = TagGetSlashSubCommand;
