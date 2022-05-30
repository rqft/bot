"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endpoints = void 0;
const result_1 = require("../models/result");
async function endpoints(_req, res) {
    const routes = res.app._router.stack
        .filter((x) => x.route)
        .map((x) => x.route.path);
    (0, result_1.give)(res, routes);
}
exports.endpoints = endpoints;
