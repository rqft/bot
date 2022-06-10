"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioExtractSlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const parameters_1 = require("../../../../tools/parameters");
const baseslash_1 = require("../baseslash");
class AudioExtractSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "extract";
    description = "get audio from video";
    constructor() {
        super({
            options: [
                {
                    name: "target",
                    description: "what to use",
                    value: parameters_1.Parameters.mediaUrl({
                        video: true,
                        audio: false,
                        image: false,
                    }),
                    default: parameters_1.Parameters.Default.mediaUrl({
                        video: true,
                        audio: false,
                        image: false,
                    }),
                    type: constants_1.ApplicationCommandOptionTypes.STRING,
                    required: false,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Audio.extract;
}
exports.AudioExtractSlashSubCommand = AudioExtractSlashSubCommand;
