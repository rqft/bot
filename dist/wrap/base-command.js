"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCommand = exports.DefaultOptions = exports.CommandType = void 0;
const lib_1 = require("detritus-client/lib");
const constants_1 = require("detritus-client/lib/constants");
var CommandType;
(function (CommandType) {
    CommandType["MISC"] = "Miscellaneous";
})(CommandType = exports.CommandType || (exports.CommandType = {}));
exports.DefaultOptions = {
    triggerTypingAfter: 1000,
    ratelimits: [
        { duration: 2500, limit: 3, type: constants_1.CommandRatelimitTypes.USER },
        { duration: 5000, limit: 10, type: constants_1.CommandRatelimitTypes.CHANNEL },
        { duration: 10000, limit: 20, type: constants_1.CommandRatelimitTypes.GUILD },
    ],
};
class BaseCommand extends lib_1.Command.Command {
    metadata;
    constructor(client, options) {
        super(client, Object.assign({}, exports.DefaultOptions, options));
        this.metadata = options.metadata;
    }
}
exports.BaseCommand = BaseCommand;
