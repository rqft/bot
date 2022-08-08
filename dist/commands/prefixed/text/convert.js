"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_1 = require("@rqft/fetch");
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const basecommand_1 = require("../basecommand");
class TextConvertCommand extends basecommand_1.BaseCommand {
    constructor(client) {
        super(client, {
            name: "text convert",
            aliases: ["text encode"],
            metadata: (0, command_metadata_1.ToolsMetadata)("encode text"),
            type: [
                {
                    name: "conversion",
                    type: "string",
                    required: true,
                    choices: Object.values(fetch_1.APIs.Jonathan.Conversion),
                },
                {
                    name: "text",
                    type: "string",
                    required: true,
                },
            ],
            args: [
                {
                    name: "method",
                    aliases: ["m"],
                    type: "string",
                    required: false,
                    choices: Object.values(fetch_1.APIs.Jonathan.ConversionMethods),
                },
                {
                    name: "decode",
                    aliases: ["d"],
                    type: "boolean",
                    required: false,
                },
                {
                    name: "encode",
                    aliases: ["e"],
                    type: "boolean",
                    required: false,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Text.convert;
}
exports.default = TextConvertCommand;
