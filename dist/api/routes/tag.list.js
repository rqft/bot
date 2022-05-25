"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagList = void 0;
const globals_1 = require("../globals");
const result_1 = require("../models/result");
function tagList(_req, res) {
    (0, result_1.give)(res, globals_1.TagsKV.list());
}
exports.tagList = tagList;
