"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is = void 0;
var is;
(function (is) {
    function is_type(x, type) {
        return typeof x === type;
    }
    is.is_type = is_type;
    function string(x) {
        return is_type(x, "string");
    }
    is.string = string;
    function number(x) {
        return is_type(x, "number");
    }
    is.number = number;
    function bigint(x) {
        return is_type(x, "bigint");
    }
    is.bigint = bigint;
    function symbol(x) {
        return is_type(x, "symbol");
    }
    is.symbol = symbol;
    function object(x) {
        return is_type(x, "object");
    }
    is.object = object;
    function undefined(x) {
        return is_type(x, "undefined");
    }
    is.undefined = undefined;
    function boolean(x) {
        return is_type(x, "boolean");
    }
    is.boolean = boolean;
    function fn(x) {
        return is_type(x, "function");
    }
    is.fn = fn;
})(is = exports.is || (exports.is = {}));
