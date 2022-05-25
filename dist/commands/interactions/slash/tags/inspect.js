"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagInspectSlashSubCommand = void 0;
const formatter_1 = require("../../../../tools/formatter");
const baseslash_1 = require("../baseslash");
class TagInspectSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "inspect";
    description = "get tags file";
    run = formatter_1.Formatter.Tag.inspect;
}
exports.TagInspectSlashSubCommand = TagInspectSlashSubCommand;
