"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseImageOption = exports.BaseSlashCommandGroup = exports.BaseSlashSubCommand = exports.BaseSlashCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const interaction_1 = require("detritus-client/lib/interaction");
const parameters_1 = require("../../../tools/parameters");
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
class BaseImageOption extends interaction_1.InteractionCommandOption {
    constructor(format) {
        super({
            name: "target",
            description: "what to use",
            value: parameters_1.Parameters.imageUrl(format),
            default: parameters_1.Parameters.Default.imageUrl(format),
            type: constants_1.ApplicationCommandOptionTypes.STRING,
            required: false,
        });
    }
}
exports.BaseImageOption = BaseImageOption;
