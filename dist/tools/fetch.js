"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instances = exports.Sarah = void 0;
const fetch_1 = require("@rqft/fetch");
class Sarah extends fetch_1.APIs.Jonathan.API {
    url = new URL('http://localhost:3000');
}
exports.Sarah = Sarah;
var Instances;
(function (Instances) {
    Instances.self = new Sarah();
})(Instances = exports.Instances || (exports.Instances = {}));
