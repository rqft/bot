"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const basecommand_1 = require("../basecommand");
class KwanziCommand extends basecommand_1.BaseCommand {
    constructor(client) {
        super(client, {
            name: "kwanzi",
            metadata: (0, command_metadata_1.FunMetadata)("spams suggestions", "<text: string>"),
            type: [
                { name: "text", type: "string", consume: true },
            ]
        });
    }
    run = formatter_1.Formatter.kwanzi;
}
exports.default = KwanziCommand;
