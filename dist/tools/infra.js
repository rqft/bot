"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is = void 0;
var is;
(function (is) {
    function isType(x, type) {
        return typeof x === type;
    }
    is.isType = isType;
    function string(x) {
        return isType(x, 'string');
    }
    is.string = string;
    function number(x) {
        return isType(x, 'number');
    }
    is.number = number;
    function bigint(x) {
        return isType(x, 'bigint');
    }
    is.bigint = bigint;
    function symbol(x) {
        return isType(x, 'symbol');
    }
    is.symbol = symbol;
    function object(x) {
        return isType(x, 'object');
    }
    is.object = object;
    function undefined(x) {
        return isType(x, 'undefined');
    }
    is.undefined = undefined;
    function boolean(x) {
        return isType(x, 'boolean');
    }
    is.boolean = boolean;
    function fn(x) {
        return isType(x, 'function');
    }
    is.fn = fn;
})(is = exports.is || (exports.is = {}));
