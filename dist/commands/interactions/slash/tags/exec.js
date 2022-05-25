"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagExecSlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const parameters_1 = require("../../../../tools/parameters");
const baseslash_1 = require("../baseslash");
class TagExecSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "exec";
    description = "run tag code";
    constructor() {
        super({
            options: [
                {
                    name: "script",
                    description: "what to run",
                    type: constants_1.ApplicationCommandOptionTypes.STRING,
                    required: true,
                },
                {
                    name: "args",
                    description: "what to use",
                    type: constants_1.ApplicationCommandOptionTypes.STRING,
                    required: false,
                    default: [],
                    value: parameters_1.Parameters.array(String),
                },
            ],
        });
    }
    run = formatter_1.Formatter.Tag.exec;
}
exports.TagExecSlashSubCommand = TagExecSlashSubCommand;
