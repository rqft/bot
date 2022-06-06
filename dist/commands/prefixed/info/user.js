"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const parameters_1 = require("../../../tools/parameters");
const basecommand_1 = require("../basecommand");
class InfoUserCommand extends basecommand_1.BaseCommand {
    constructor(client) {
        super(client, {
            name: "info user",
            metadata: (0, command_metadata_1.ToolsMetadata)("user info", "<user: User=self>", [
                "@insyri#7314",
                "insyri",
                "533757461706964993",
            ]),
            type: [
                {
                    name: "user",
                    type: parameters_1.Parameters.user,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Info.user;
}
exports.default = InfoUserCommand;
