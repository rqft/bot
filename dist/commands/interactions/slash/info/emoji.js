"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmojiSlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const parameters_1 = require("../../../../tools/parameters");
const baseslash_1 = require("../baseslash");
class EmojiSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "emoji";
    description = "emoji info";
    constructor() {
        super({
            options: [
                {
                    name: "emoji",
                    description: "what",
                    type: constants_1.ApplicationCommandOptionTypes.STRING,
                    required: true,
                    value: parameters_1.Parameters.emojiUrl,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Info.emoji;
}
exports.EmojiSlashSubCommand = EmojiSlashSubCommand;
