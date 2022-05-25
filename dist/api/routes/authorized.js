"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorized = void 0;
const auth_1 = require("../auth");
const error_1 = require("../models/error");
const result_1 = require("../models/result");
function authorized(req, res) {
    const token = req.headers.authorization || req.query.token;
    if (token) {
        if ((0, auth_1.isAuthorized)(token)) {
            (0, result_1.give)(res, true);
        }
        else {
            (0, result_1.give)(res, false);
        }
    }
    else {
        (0, error_1.stop)(res, 400, "No token provided");
    }
}
exports.authorized = authorized;
