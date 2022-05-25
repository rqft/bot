"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagGet = void 0;
const globals_1 = require("../globals");
const error_1 = require("../models/error");
const result_1 = require("../models/result");
function tagGet(req, res) {
    const key = req.params.key;
    if (key) {
        const value = globals_1.TagsKV.get(key);
        if (value) {
            (0, result_1.give)(res, value);
        }
        else {
            (0, error_1.stop)(res, 404, "Key not found");
        }
    }
    else {
        (0, error_1.stop)(res, 400, "Missing required path parameter 'key'");
    }
}
exports.tagGet = tagGet;
