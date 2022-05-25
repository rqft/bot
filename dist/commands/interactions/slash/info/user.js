"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const parameters_1 = require("../../../../tools/parameters");
const baseslash_1 = require("../baseslash");
class UserSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "user";
    description = "user info";
    constructor() {
        super({
            options: [
                {
                    name: "user",
                    description: "who",
                    type: constants_1.ApplicationCommandOptionTypes.USER,
                    default: parameters_1.Parameters.Default.author,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Info.user;
}
exports.UserSlashSubCommand = UserSlashSubCommand;
