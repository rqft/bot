"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseContextMenuUserCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const baseinteraction_1 = require("../../baseinteraction");
class BaseContextMenuUserCommand extends baseinteraction_1.BaseInteraction {
    error = "User Context Menu";
    type = constants_1.ApplicationCommandTypes.USER;
    permissionsIgnoreClientOwner = true;
    triggerLoadingAfter = 1000;
    triggerLoadingAsEphemeral = true;
}
exports.BaseContextMenuUserCommand = BaseContextMenuUserCommand;
