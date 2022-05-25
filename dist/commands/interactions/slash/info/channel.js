"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelSlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const parameters_1 = require("../../../../tools/parameters");
const baseslash_1 = require("../baseslash");
class ChannelSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "channel";
    description = "channel info";
    constructor() {
        super({
            options: [
                {
                    name: "channel",
                    description: "where",
                    type: constants_1.ApplicationCommandOptionTypes.CHANNEL,
                    default: parameters_1.Parameters.Default.channel,
                    required: false,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Info.channel;
}
exports.ChannelSlashSubCommand = ChannelSlashSubCommand;
