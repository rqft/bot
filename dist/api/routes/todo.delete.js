"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoDelete = void 0;
const globals_1 = require("../globals");
const error_1 = require("../models/error");
const result_1 = require("../models/result");
async function todoDelete(req, res) {
    const userId = req.params.userId;
    if (userId) {
        if (!globals_1.TodoKV.has(userId)) {
            (0, error_1.stop)(res, 404, "No todos found for user");
        }
        else {
            const todos = globals_1.TodoKV.get(userId);
            const id = Number(req.params.id);
            if (Number.isNaN(id)) {
                (0, error_1.stop)(res, 400, "Invalid id");
            }
            else {
                const todo = todos[id - 1];
                if (todo) {
                    todos.splice(id - 1, 1);
                    globals_1.TodoKV.put(userId, todos);
                    (0, result_1.give)(res, true);
                }
                else {
                    (0, error_1.stop)(res, 404, `No todo found for user ${userId} with id ${id}`);
                }
            }
        }
    }
    else {
        (0, error_1.stop)(res, 400, "No user provided");
    }
}
exports.todoDelete = todoDelete;
