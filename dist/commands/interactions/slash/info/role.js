"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleSlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const parameters_1 = require("../../../../tools/parameters");
const baseslash_1 = require("../baseslash");
class RoleSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "role";
    description = "role info";
    constructor() {
        super({
            options: [
                {
                    name: "role",
                    description: "what",
                    type: constants_1.ApplicationCommandOptionTypes.ROLE,
                    default: parameters_1.Parameters.Default.defaultRole,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Info.role;
}
exports.RoleSlashSubCommand = RoleSlashSubCommand;
