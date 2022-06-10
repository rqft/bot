"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseslash_1 = require("../baseslash");
const extract_1 = require("./extract");
class AudioSlashCommandGroup extends baseslash_1.BaseSlashCommand {
    name = "audio";
    description = "audacity";
    constructor() {
        super({
            options: [new extract_1.AudioExtractSlashSubCommand()],
        });
    }
}
exports.default = AudioSlashCommandGroup;
