"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoPost = void 0;
const globals_1 = require("../globals");
const error_1 = require("../models/error");
const result_1 = require("../models/result");
async function todoPost(req, res) {
    const userId = req.params.userId;
    if (userId) {
        const existing = globals_1.TodoKV.get(userId) || [];
        const todo = req.query.data;
        if (todo) {
            existing.push(todo);
            globals_1.TodoKV.put(userId, existing);
            (0, result_1.give)(res, true);
        }
        else {
            (0, error_1.stop)(res, 400, "No todo provided");
        }
    }
    else {
        (0, error_1.stop)(res, 400, "No user provided");
    }
}
exports.todoPost = todoPost;
