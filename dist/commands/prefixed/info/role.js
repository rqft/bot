"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const parameters_1 = require("../../../tools/parameters");
const basecommand_1 = require("../basecommand");
class InfoRoleCommand extends basecommand_1.BaseCommand {
    constructor(client) {
        super(client, {
            name: "info role",
            metadata: (0, command_metadata_1.ToolsMetadata)("role info", "<role: Role>", [
                "everyone",
                "828443402806493224",
                "@tehi",
            ]),
            type: [
                {
                    name: "role",
                    type: parameters_1.Parameters.role,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Info.role;
}
exports.default = InfoRoleCommand;
