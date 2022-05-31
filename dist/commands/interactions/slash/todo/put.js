"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoPutSlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const baseslash_1 = require("../baseslash");
class TodoPutSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "edit";
    description = "edit todo";
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
                    name: "data",
                    description: "what to add",
                    type: constants_1.ApplicationCommandOptionTypes.STRING,
                    required: true,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Todo.put;
}
exports.TodoPutSlashSubCommand = TodoPutSlashSubCommand;
