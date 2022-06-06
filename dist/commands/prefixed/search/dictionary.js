"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const basecommand_1 = require("../basecommand");
class SearchDictionaryCommand extends basecommand_1.BaseCommand {
    constructor(client) {
        super(client, {
            name: "search dictionary",
            aliases: ["search dict", "search merriam"],
            metadata: (0, command_metadata_1.FunMetadata)("merriam", "<word: string>", ["hello", "monkey"]),
            type: [{ name: "word", type: "string", consume: true }],
        });
    }
    run = formatter_1.Formatter.Search.define;
}
exports.default = SearchDictionaryCommand;
