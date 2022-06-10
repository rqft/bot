"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const parameters_1 = require("../../../tools/parameters");
const basecommand_1 = require("../basecommand");
class AudioVolumeCommand extends basecommand_1.BaseAudioCommand {
    constructor(client) {
        super(client, {
            name: "audio pitch",
            metadata: (0, command_metadata_1.AudioMetadata)("set pitch", "<target: Audio> <pitch: number>"),
            type: [
                {
                    name: "pitch",
                    type: parameters_1.Parameters.number({ min: 0.01, max: 2 }),
                    required: true,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Audio.pitch;
}
exports.default = AudioVolumeCommand;
