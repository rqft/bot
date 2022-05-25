"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseSlashCommandGroup = exports.BaseSlashSubCommand = exports.BaseSlashCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const interaction_1 = require("detritus-client/lib/interaction");
const baseinteraction_1 = require("../baseinteraction");
class BaseSlashCommand extends baseinteraction_1.BaseInteraction {
    error = "Slash";
    permissionsIgnoreClientOwner = true;
    type = constants_1.ApplicationCommandTypes.CHAT_INPUT;
    triggerLoadingAfter = 1000;
}
exports.BaseSlashCommand = BaseSlashCommand;
class BaseSlashSubCommand extends interaction_1.InteractionCommandOption {
    error = "Slash";
    type = constants_1.ApplicationCommandOptionTypes.SUB_COMMAND;
}
exports.BaseSlashSubCommand = BaseSlashSubCommand;
class BaseSlashCommandGroup extends interaction_1.InteractionCommandOption {
    error = "Slash";
    type = constants_1.ApplicationCommandOptionTypes.SUB_COMMAND_GROUP;
}
exports.BaseSlashCommandGroup = BaseSlashCommandGroup;
