"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatter_1 = require("../../../../tools/formatter");
const baseuser_1 = require("./baseuser");
class InfoUserMenuUserCommand extends baseuser_1.BaseContextMenuUserCommand {
    name = "User Information";
    run = formatter_1.Formatter.Info.user;
}
exports.default = InfoUserMenuUserCommand;
