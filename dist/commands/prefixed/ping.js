"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_metadata_1 = require("../../tools/command-metadata");
const formatter_1 = require("../../tools/formatter");
const basecommand_1 = require("./basecommand");
class PingCommand extends basecommand_1.BaseCommand {
    constructor(client) {
        super(client, {
            name: "ping",
            metadata: (0, command_metadata_1.ToolsMetadata)("pingy ping"),
        });
    }
    run = formatter_1.Formatter.ping;
}
exports.default = PingCommand;
