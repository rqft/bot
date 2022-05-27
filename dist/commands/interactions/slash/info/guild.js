"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildSlashSubCommand = void 0;
const formatter_1 = require("../../../../tools/formatter");
const baseslash_1 = require("../baseslash");
class GuildSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "guild";
    description = "server info";
    run = formatter_1.Formatter.Info.guild;
}
exports.GuildSlashSubCommand = GuildSlashSubCommand;
