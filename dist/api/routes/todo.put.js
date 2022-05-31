"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoPut = void 0;
const globals_1 = require("../globals");
const error_1 = require("../models/error");
const result_1 = require("../models/result");
async function todoPut(req, res) {
    const userId = req.params.userId;
    if (userId) {
        if (!globals_1.TodoKV.has(userId)) {
            (0, error_1.stop)(res, 404, "No todos found for that user");
        }
        else {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) {
                (0, error_1.stop)(res, 400, "Invalid id");
            }
            else {
                const todos = globals_1.TodoKV.get(userId);
                if (todos) {
                    const todo = req.query.data;
                    if (todo) {
                        todos[id - 1] = todo;
                        globals_1.TodoKV.put(userId, todos);
                        (0, result_1.give)(res, true);
                    }
                    else {
                        (0, error_1.stop)(res, 400, "No todo provided");
                    }
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
exports.todoPut = todoPut;
