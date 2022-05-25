"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_metadata_1 = require("../../tools/command-metadata");
const tools_1 = require("../../tools/tools");
const basecommand_1 = require("./basecommand");
class PingCommand extends basecommand_1.BaseCommand {
    constructor(client) {
        super(client, {
            name: "ping",
            metadata: (0, command_metadata_1.ToolsMetadata)("pingy ping"),
        });
    }
    async run(context) {
        return (0, tools_1.editOrReply)(context, "ok");
    }
}
exports.default = PingCommand;
