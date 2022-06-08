"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("detritus-client/lib/constants");
const detritus_utils_1 = require("detritus-utils");
const error_1 = require("../../../../tools/error");
const tools_1 = require("../../../../tools/tools");
const baseuser_1 = require("./baseuser");
class VouchMenuUserCommand extends baseuser_1.BaseContextMenuUserCommand {
    name = "Vouch";
    guildIds = new detritus_utils_1.BaseSet(["983638405932003388"]);
    async run(context, args) {
        const vouchedId = "983646172520525876";
        if (args.member) {
            if (args.member.roles.has(vouchedId)) {
                return new error_1.Err("This user has already been vouched for");
            }
            try {
                await args.member.addRole(vouchedId);
            }
            catch (e) {
                throw new error_1.Err(e);
            }
            return await (0, tools_1.editOrReply)(context, {
                content: `Vouched for ${args.member.tag}`,
                flags: constants_1.MessageFlags.EPHEMERAL,
            });
        }
        throw new error_1.Err("User is not in this server");
    }
}
exports.default = VouchMenuUserCommand;
