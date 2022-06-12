"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PxlEmojiMosaicSlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const baseslash_1 = require("../baseslash");
class PxlEmojiMosaicSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "emojimosaic";
    description = "emoji emoji emoji";
    constructor() {
        super({
            options: [
                new baseslash_1.BaseImageOption(),
                {
                    name: "group_size",
                    label: "group-size",
                    description: "how big",
                    type: constants_1.ApplicationCommandOptionTypes.INTEGER,
                    required: false,
                },
                {
                    name: "scale",
                    description: "resize now",
                    type: constants_1.ApplicationCommandOptionTypes.BOOLEAN,
                    required: false,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Pxl.emojiMosaic;
}
exports.PxlEmojiMosaicSlashSubCommand = PxlEmojiMosaicSlashSubCommand;
