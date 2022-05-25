"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagSetSlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const baseslash_1 = require("../baseslash");
class TagSetSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "set";
    description = "set a tag";
    constructor() {
        super({
            options: [
                {
                    name: "key",
                    description: "what",
                    type: constants_1.ApplicationCommandOptionTypes.STRING,
                    required: true,
                },
                {
                    name: "value",
                    description: "what to put",
                    type: constants_1.ApplicationCommandOptionTypes.STRING,
                    required: true,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Tag.post;
}
exports.TagSetSlashSubCommand = TagSetSlashSubCommand;
