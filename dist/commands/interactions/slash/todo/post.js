"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoPostSlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const baseslash_1 = require("../baseslash");
class TodoPostSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "post";
    description = "add todo";
    constructor() {
        super({
            options: [
                {
                    name: "data",
                    description: "what to add",
                    type: constants_1.ApplicationCommandOptionTypes.STRING,
                    required: true,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Todo.post;
}
exports.TodoPostSlashSubCommand = TodoPostSlashSubCommand;
