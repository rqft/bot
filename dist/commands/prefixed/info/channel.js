"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const parameters_1 = require("../../../tools/parameters");
const basecommand_1 = require("../basecommand");
class InfoChannelCommand extends basecommand_1.BaseCommand {
    constructor(client) {
        super(client, {
            name: "info channel",
            metadata: (0, command_metadata_1.ToolsMetadata)("channel info", "<channel: Channel=here>", [
                "general",
                "248981745502781440",
                "<#248981745502781440>",
                "https://discord.com/channels/248981745502781440",
            ]),
            type: [
                {
                    name: "channel",
                    type: parameters_1.Parameters.channel(),
                    default: parameters_1.Parameters.Default.channel,
                    required: true,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Info.channel;
}
exports.default = InfoChannelCommand;
