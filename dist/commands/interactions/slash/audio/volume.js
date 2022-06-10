"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioVolumeSlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const parameters_1 = require("../../../../tools/parameters");
const baseslash_1 = require("../baseslash");
class AudioVolumeSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "volume";
    description = "set volume";
    constructor() {
        super({
            options: [
                {
                    name: "target",
                    description: "what to use",
                    value: parameters_1.Parameters.mediaUrl({
                        video: false,
                        audio: true,
                        image: false,
                    }),
                    default: parameters_1.Parameters.Default.mediaUrl({
                        video: false,
                        audio: true,
                        image: false,
                    }),
                    type: constants_1.ApplicationCommandOptionTypes.STRING,
                    required: false,
                },
                {
                    name: "volume",
                    description: "how much",
                    type: constants_1.ApplicationCommandOptionTypes.NUMBER,
                    required: true,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Audio.volume;
}
exports.AudioVolumeSlashSubCommand = AudioVolumeSlashSubCommand;
