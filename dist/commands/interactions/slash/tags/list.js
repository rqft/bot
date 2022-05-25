"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagListSlashSubCommand = void 0;
const formatter_1 = require("../../../../tools/formatter");
const baseslash_1 = require("../baseslash");
class TagListSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "list";
    description = "list tags";
    run = formatter_1.Formatter.Tag.list;
}
exports.TagListSlashSubCommand = TagListSlashSubCommand;
