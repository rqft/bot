"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseContextMenuMessageCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const baseinteraction_1 = require("../../baseinteraction");
class BaseContextMenuMessageCommand extends baseinteraction_1.BaseInteraction {
    error = "Message Context Menu";
    type = constants_1.ApplicationCommandTypes.MESSAGE;
    permissionsIgnoreClientOwner = true;
    triggerLoadingAfter = 1000;
    triggerLoadingAsEphemeral = true;
}
exports.BaseContextMenuMessageCommand = BaseContextMenuMessageCommand;
