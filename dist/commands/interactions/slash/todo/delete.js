"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoDeleteSlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const baseslash_1 = require("../baseslash");
class TodoDeleteSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "delete";
    description = "remove todo";
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
            ],
        });
    }
    run = formatter_1.Formatter.Todo.remove;
}
exports.TodoDeleteSlashSubCommand = TodoDeleteSlashSubCommand;
