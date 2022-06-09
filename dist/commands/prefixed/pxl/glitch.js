"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const basecommand_1 = require("../basecommand");
class PxlGlitchCommand extends basecommand_1.BaseImageCommand {
    constructor(client) {
        super(client, {
            name: "pxl glitch",
            metadata: (0, command_metadata_1.ImageMetadata)("morbius from the matrix", "<target: Image> <-iterations: number=10> <-amount: number=5> <-gif-count: number=10> <-gif-delay: number=100ms>"),
            args: [
                {
                    name: "iterations",
                    type: "number",
                    required: false,
                    default: 10,
                },
                {
                    name: "amount",
                    type: "number",
                    required: false,
                    default: 5,
                },
                {
                    name: "gif-count",
                    aliases: ["gifcount"],
                    type: "number",
                    required: false,
                    default: 10,
                },
                {
                    name: "gif-delay",
                    aliases: ["gifdelay"],
                    type: "number",
                    required: false,
                    default: 100,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Pxl.glitch;
}
exports.default = PxlGlitchCommand;
