"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatter_1 = require("../../../../tools/formatter");
const basemessage_1 = require("./basemessage");
class InfoUserMenuMessageCommand extends basemessage_1.BaseContextMenuMessageCommand {
    name = "User Information";
    async run(context, args) {
        return await formatter_1.Formatter.Info.user(context, { user: args.message.author });
    }
}
exports.default = InfoUserMenuMessageCommand;
