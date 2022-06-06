"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_metadata_1 = require("../../../tools/command-metadata");
const basecommand_1 = require("../basecommand");
class TestCommand extends basecommand_1.BaseCommand {
    constructor(client) {
        super(client, {
            name: "test",
            metadata: (0, command_metadata_1.ToolsMetadata)("get tag", "<get: string> ?<-args: Array<string>>"),
        });
    }
    run() {
        void 0;
    }
}
exports.default = TestCommand;
