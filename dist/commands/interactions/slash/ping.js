"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseslash_1 = require("./baseslash");
class SlashPingCommand extends baseslash_1.BaseSlashCommand {
    name = "ping";
    description = "pingy ping";
    async run(context, _args) {
        return await context.editOrRespond(`came back in ${Date.now() - context.interaction.createdAtUnix}ms`);
    }
}
exports.default = SlashPingCommand;
