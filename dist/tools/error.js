"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Err = exports.ErrorEmojis = exports.ErrorLevels = void 0;
const markdown_1 = require("./markdown");
var ErrorLevels;
(function (ErrorLevels) {
    ErrorLevels["ERROR"] = "error";
    ErrorLevels["WARNING"] = "warn";
    ErrorLevels["INFO"] = "info";
    ErrorLevels["DEBUG"] = "debug";
})(ErrorLevels = exports.ErrorLevels || (exports.ErrorLevels = {}));
exports.ErrorEmojis = {
    [ErrorLevels.ERROR]: "❌",
    [ErrorLevels.WARNING]: "⚠️",
    [ErrorLevels.INFO]: "🔍",
    [ErrorLevels.DEBUG]: "🐛",
};
class Err {
    options;
    level;
    status;
    metadata;
    message;
    constructor(message, options = {}) {
        this.message = message;
        this.options = options;
        this.level = this.options.level || ErrorLevels.ERROR;
        this.status = this.options.status || 500;
        this.metadata = this.options.metadata;
    }
    toString() {
        return `${this.message}`;
    }
    toThrown() {
        return `${exports.ErrorEmojis[this.level]} ${markdown_1.Markdown.Format.codestring(this.toString()).toString()}`;
    }
    static from(payload) {
        if (payload instanceof Err) {
            return payload;
        }
        return new Err(payload.message);
    }
}
exports.Err = Err;
