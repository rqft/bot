"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseslash_1 = require("../baseslash");
const delete_1 = require("./delete");
const get_1 = require("./get");
const list_1 = require("./list");
const post_1 = require("./post");
const put_1 = require("./put");
class TagSlashCommandGroup extends baseslash_1.BaseSlashCommand {
    name = "todo";
    description = "list";
    constructor() {
        super({
            options: [
                new list_1.TodoListSlashSubCommand(),
                new get_1.TodoGetSlashSubCommand(),
                new post_1.TodoPostSlashSubCommand(),
                new put_1.TodoPutSlashSubCommand(),
                new delete_1.TodoDeleteSlashSubCommand(),
            ],
        });
    }
}
exports.default = TagSlashCommandGroup;
