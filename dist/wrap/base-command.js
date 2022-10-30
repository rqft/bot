"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseCommand = exports.dimg = exports.img = exports.ImageExamples = exports.DualImageExamples = exports.DefaultOptions = exports.CommandType = void 0;
const lib_1 = require("detritus-client/lib");
const constants_1 = require("detritus-client/lib/constants");
const util_1 = require("../tools/util");
const warning_1 = require("../tools/warning");
var CommandType;
(function (CommandType) {
    CommandType["DualImage"] = "dual-image";
    CommandType["Image"] = "image";
    CommandType["Miscellaneous"] = "miscellaneous";
    CommandType["Search"] = "search";
    CommandType["Audio"] = "audio";
})(CommandType = exports.CommandType || (exports.CommandType = {}));
exports.DefaultOptions = {
    triggerTypingAfter: 1000,
    ratelimits: [
        { duration: 2500, limit: 3, type: constants_1.CommandRatelimitTypes.USER },
        { duration: 5000, limit: 10, type: constants_1.CommandRatelimitTypes.CHANNEL },
        { duration: 10000, limit: 20, type: constants_1.CommandRatelimitTypes.GUILD },
    ],
};
exports.DualImageExamples = [
    '504698587221852172 533757461706964993',
    'arcs @insyri#7314',
    '@Arcs#4587 https://thowoee.me/finland.gif',
];
exports.ImageExamples = [
    '504698587221852172',
    '@Arcs#4587',
    'arcs',
    'https://thowoee.me/finland.gif',
];
function img(description, apply) {
    return {
        type: 'image',
        description,
        examples: exports.ImageExamples.map((x, i) => (apply ? x + ' ' + apply[i] : x)),
    };
}
exports.img = img;
function dimg(description) {
    return { type: 'dual-image', description, examples: exports.DualImageExamples };
}
exports.dimg = dimg;
class BaseCommand extends lib_1.Command.Command {
    syntax;
    metadata;
    constructor(client, options, syntax) {
        super(client, Object.assign({}, exports.DefaultOptions, options));
        this.syntax = syntax;
        this.metadata = options.metadata;
    }
    onTypeError(context, _, errors) {
        const text = [];
        for (const key in errors) {
            const value = errors[key];
            if (value === undefined) {
                continue;
            }
            const { message } = value;
            let head = this.syntax;
            head +=
                '\n' +
                    ' '.repeat(this.syntax.indexOf('[' + key + ']') + 1) +
                    '^' +
                    '-'.repeat(key.length - 1) +
                    ' ' +
                    message;
            text.push(head);
        }
        if (text.length) {
            return util_1.respond.fmt(context, '```lua\n{text}\n```', {
                text: text.join('\n'),
            });
        }
    }
    onError(context, _args, error) {
        if (error === null) {
            return;
        }
        if (error instanceof warning_1.Warning) {
            return util_1.respond.fmt(context, ':warning: `{content}`', {
                content: error.content,
            });
        }
        return util_1.respond.fmt(context, ':x: `{message}`', { message: error.stack });
    }
    onRunError(context, args, error) {
        return this.onError(context, args, error);
    }
}
exports.BaseCommand = BaseCommand;
