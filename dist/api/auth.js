"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthorized = exports.auth = void 0;
const globals_1 = require("./globals");
const error_1 = require("./models/error");
function auth(req, res, next) {
    const token = req.headers.authorization || req.query.token;
    if (token) {
        if (isAuthorized(token)) {
            next();
        }
        else {
            (0, error_1.stop)(res, 401, "Unauthorized");
        }
    }
    else {
        (0, error_1.stop)(res, 400, "No token provided");
    }
}
exports.auth = auth;
function isAuthorized(token) {
    const [username, password] = token.split(":");
    const isAuthorized = globals_1.Authorized.find((item) => item.username === username && item.password === password);
    return !!isAuthorized;
}
exports.isAuthorized = isAuthorized;
