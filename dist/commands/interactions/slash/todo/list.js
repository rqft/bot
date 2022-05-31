"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoListSlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const parameters_1 = require("../../../../tools/parameters");
const baseslash_1 = require("../baseslash");
class TodoListSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "list";
    description = "list all todo";
    constructor() {
        super({
            options: [
                {
                    name: "user",
                    description: "who's",
                    type: constants_1.ApplicationCommandOptionTypes.USER,
                    default: parameters_1.Parameters.Default.author,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Todo.list;
}
exports.TodoListSlashSubCommand = TodoListSlashSubCommand;
