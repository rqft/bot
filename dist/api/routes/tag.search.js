"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagSearch = void 0;
const globals_1 = require("../globals");
const result_1 = require("../models/result");
function tagSearch(req, res) {
    const query = req.params.query;
    console.log(query);
    let choices = globals_1.TagsKV.list();
    if (query) {
        const results = choices.filter((choice) => choice.toLowerCase().includes(query.toLowerCase()));
        choices = results;
    }
    console.log(choices);
    (0, result_1.give)(res, choices
        .map((choice) => {
        return {
            name: choice,
            value: choice,
        };
    })
        .slice(0, 25));
}
exports.tagSearch = tagSearch;
