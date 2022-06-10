"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const basecommand_1 = require("../basecommand");
class AudioVolumeCommand extends basecommand_1.BaseAudioCommand {
    constructor(client) {
        super(client, {
            name: "audio volume",
            metadata: (0, command_metadata_1.AudioMetadata)("set volume", "<target: Audio> <volume: number>"),
            type: [
                {
                    name: "volume",
                    type: "number",
                    required: true,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Audio.volume;
}
exports.default = AudioVolumeCommand;
