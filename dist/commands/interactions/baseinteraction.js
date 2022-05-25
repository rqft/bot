"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseInteraction = void 0;
const constants_1 = require("detritus-client/lib/constants");
const interaction_1 = require("detritus-client/lib/interaction");
const detritus_utils_1 = require("detritus-utils");
const secrets_1 = require("../../secrets");
const error_1 = require("../../tools/error");
const tools_1 = require("../../tools/tools");
class BaseInteraction extends interaction_1.InteractionCommand {
    error = "Command";
    guildIds = new detritus_utils_1.BaseSet(secrets_1.Secrets.InteractionGuilds);
    global = this.guildIds.length === 0;
    async onBeforeRun(context) {
        await (0, tools_1.editOrReply)(context, 'ok, processing');
        return true;
    }
    onLoadingTrigger(context) {
        if (context.responded) {
            return;
        }
        if (this.triggerLoadingAsEphemeral) {
            return context.respond(constants_1.InteractionCallbackTypes.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE, { flags: constants_1.MessageFlags.EPHEMERAL });
        }
        return context.respond(constants_1.InteractionCallbackTypes.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE);
    }
    onDmBlocked(context) {
        return context.editOrRespond("hey you cant use this command in a dm !! go to a server instead :)");
    }
    onCancelRun(context) {
        return context.editOrRespond("something bad happened :(");
    }
    onPermissionsFailClient(context, failed) {
        const permissions = (0, tools_1.permissionsErrorList)(failed);
        return context.editOrRespond({
            content: `i need ${permissions.join(", ")} to run this`,
            flags: constants_1.MessageFlags.EPHEMERAL,
        });
    }
    onPermissionsFail(context, failed) {
        const permissions = (0, tools_1.permissionsErrorList)(failed);
        return context.editOrRespond({
            content: `you need ${permissions.join(", ")} to run this`,
            flags: constants_1.MessageFlags.EPHEMERAL,
        });
    }
    onRunError(context, _args, error) {
        return (0, tools_1.editOrReply)(context, {
            content: error_1.Err.from(error).toThrown(),
            flags: constants_1.MessageFlags.EPHEMERAL,
        });
    }
}
exports.BaseInteraction = BaseInteraction;
