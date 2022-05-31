"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoSearch = void 0;
const globals_1 = require("../globals");
const error_1 = require("../models/error");
const result_1 = require("../models/result");
function todoSearch(req, res) {
    const userId = req.params.userId;
    if (userId) {
        const query = req.params.query;
        let choices = (globals_1.TodoKV.get(userId) || []).map((x, i) => ({
            data: x,
            index: i + 1,
        }));
        if (query) {
            const results = choices.filter((choice) => choice.data.toLowerCase().includes(query.toLowerCase()) ||
                choice.index.toString().includes(query));
            choices = results;
        }
        (0, result_1.give)(res, choices
            .map((choice) => {
            return {
                name: `#${choice.index} - ${choice.data.slice(0, 10)}${choice.data.length > 10 ? "..." : ""}`,
                value: choice.index,
            };
        })
            .slice(0, 25));
    }
    else {
        (0, error_1.stop)(res, 400, "No user provided");
    }
}
exports.todoSearch = todoSearch;
