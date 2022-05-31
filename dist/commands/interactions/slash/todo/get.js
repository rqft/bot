"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoGetSlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const parameters_1 = require("../../../../tools/parameters");
const baseslash_1 = require("../baseslash");
class TodoGetSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "get";
    description = "get todo";
    constructor() {
        super({
            options: [
                {
                    name: "id",
                    description: "number",
                    type: constants_1.ApplicationCommandOptionTypes.INTEGER,
                    autocomplete: true,
                    onAutoComplete: formatter_1.Formatter.Todo.search,
                    required: true,
                },
                {
                    name: "user",
                    description: "whos",
                    type: constants_1.ApplicationCommandOptionTypes.USER,
                    required: false,
                    default: parameters_1.Parameters.Default.author,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Todo.get;
}
exports.TodoGetSlashSubCommand = TodoGetSlashSubCommand;
