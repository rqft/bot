"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseslash_1 = require("../baseslash");
const delete_1 = require("./delete");
const exec_1 = require("./exec");
const get_1 = require("./get");
const inspect_1 = require("./inspect");
const list_1 = require("./list");
const set_1 = require("./set");
class TagSlashCommandGroup extends baseslash_1.BaseSlashCommand {
    name = "tag";
    description = "tag";
    constructor() {
        super({
            options: [
                new get_1.TagGetSlashSubCommand(),
                new set_1.TagSetSlashSubCommand(),
                new delete_1.TagDeleteSlashSubCommand(),
                new list_1.TagListSlashSubCommand(),
                new inspect_1.TagInspectSlashSubCommand(),
                new exec_1.TagExecSlashSubCommand(),
            ],
        });
    }
}
exports.default = TagSlashCommandGroup;
