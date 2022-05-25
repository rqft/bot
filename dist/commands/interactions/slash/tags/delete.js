"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagDeleteSlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const baseslash_1 = require("../baseslash");
class TagDeleteSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "delete";
    description = "delete tag";
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
            ],
        });
    }
    run = formatter_1.Formatter.Tag.remove;
}
exports.TagDeleteSlashSubCommand = TagDeleteSlashSubCommand;
