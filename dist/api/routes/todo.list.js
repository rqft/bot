"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoList = void 0;
const globals_1 = require("../globals");
const error_1 = require("../models/error");
const result_1 = require("../models/result");
async function todoList(req, res) {
    const userId = req.params.userId;
    if (userId) {
        if (!globals_1.TodoKV.has(userId)) {
            (0, error_1.stop)(res, 404, "No todos found for that user");
        }
        else {
            const todos = globals_1.TodoKV.get(userId);
            (0, result_1.give)(res, todos);
        }
    }
    else {
        (0, error_1.stop)(res, 400, "No user provided");
    }
}
exports.todoList = todoList;
