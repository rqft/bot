"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mod = void 0;
const error_1 = require("../error");
const tools_1 = require("../tools");
var Mod;
(function (Mod) {
    async function ban(context, args) {
        if (!context.member.canBanMembers ||
            !context.member.canEdit(args.target)) {
            throw new error_1.Err("Missing Permissions", { status: 403 });
        }
        await args.target.ban({
            deleteMessageDays: String(args.days || 0),
            reason: args.reason,
        });
        return await (0, tools_1.editOrReply)(context, `ok, banned ${args.target.tag}`);
    }
    Mod.ban = ban;
})(Mod = exports.Mod || (exports.Mod = {}));
