"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildSlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const parameters_1 = require("../../../../tools/parameters");
const baseslash_1 = require("../baseslash");
class GuildSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "guild";
    description = "server info";
    constructor() {
        super({
            options: [
                {
                    name: "guild",
                    description: "what",
                    type: constants_1.ApplicationCommandOptionTypes.STRING,
                    required: false,
                    value: parameters_1.Parameters.guild,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Info.guild;
}
exports.GuildSlashSubCommand = GuildSlashSubCommand;
