"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PxlSearchWebSlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../../tools/formatter");
const baseslash_1 = require("../../baseslash");
class PxlSearchWebSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "web";
    description = "look at html";
    constructor() {
        super({
            options: [
                {
                    name: "query",
                    description: "ok google",
                    type: constants_1.ApplicationCommandOptionTypes.STRING,
                    required: true,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Pxl.webSearch;
}
exports.PxlSearchWebSlashSubCommand = PxlSearchWebSlashSubCommand;
