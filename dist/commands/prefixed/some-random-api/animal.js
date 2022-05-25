"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const basecommand_1 = require("../basecommand");
class AnimalCommand extends basecommand_1.BaseCommand {
    constructor(client) {
        super(client, {
            name: "animal",
            metadata: (0, command_metadata_1.ToolsMetadata)("get animal images", "<animal: Animals>"),
            type: [
                {
                    name: "animal",
                    choices: formatter_1.Formatter.SomeRandomApi.AnimalMethods,
                    required: true,
                },
            ],
        });
    }
    run = formatter_1.Formatter.SomeRandomApi.animal;
}
exports.default = AnimalCommand;
