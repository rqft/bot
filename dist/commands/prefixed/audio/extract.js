"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const basecommand_1 = require("../basecommand");
class AudioExtractCommand extends basecommand_1.BaseVideoCommand {
    constructor(client) {
        super(client, {
            name: "audio extract",
            metadata: (0, command_metadata_1.AudioMetadata)("get audio", "<target: Video>"),
        });
    }
    run = formatter_1.Formatter.Audio.extract;
}
exports.default = AudioExtractCommand;
