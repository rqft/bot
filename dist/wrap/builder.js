"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = exports.CommandArgumentBuilders = void 0;
const base_command_1 = require("./base-command");
exports.CommandArgumentBuilders = {
    string(options) {
        return (value) => {
            if (options) {
                if (options.choices && options.choices.length) {
                    if (options.choices.includes(value)) {
                        return value;
                    }
                    throw new RangeError(`must be one of [ ${options.choices.join(", ")} ]`);
                }
                if (options.maxLength && value.length > options.maxLength) {
                    throw new RangeError(`must be less than ${options.maxLength} characters`);
                }
                if (options.minLength && value.length < options.minLength) {
                    throw new RangeError(`must be more than ${options.maxLength} characters`);
                }
            }
            return value;
        };
    },
    stringOptional(options) {
        return (value) => {
            if (value) {
                return this.string(options)(value);
            }
            return undefined;
        };
    },
    number(options) {
        return (value) => {
            const float = Number.parseFloat(value);
            if (options) {
                if (options.choices && options.choices.length) {
                    if (options.choices.includes(float)) {
                        return float;
                    }
                    throw new RangeError(`must be one of [ ${options.choices.join(", ")} ]`);
                }
                if (options.min && float < options.min) {
                    throw new RangeError(`must be more than ${options.min}`);
                }
                if (options.max && float > options.max) {
                    throw new RangeError(`must be less than ${options.max}`);
                }
            }
            return float;
        };
    },
    numberOptional(options) {
        return (value) => {
            if (value) {
                return this.numberOptional(options)(value);
            }
            return undefined;
        };
    },
};
function Command(syntax, options, run) {
    const [, cmd] = /^(.+?)(?: \[|$)/.exec(syntax);
    const ids = /\[\w+\??\]/g.exec(syntax) || [];
    const opt = [];
    const flg = [];
    const builder = options.args(exports.CommandArgumentBuilders);
    for (const id of ids) {
        const [, name, def] = /^\[-?(.+?)\??(?:=(.*?))?\]$/.exec(id);
        let arg = { name: name };
        const isFlag = /^\[-/.test(id);
        if (/^\[-?(.+?)\?/.test(id)) {
            arg.required = false;
        }
        if (def) {
            arg.default = def;
        }
        arg.type = (builder[id] ||
            exports.CommandArgumentBuilders.string());
        if (isFlag) {
            flg.push(arg);
            continue;
        }
        opt.push(arg);
    }
    return class Exec extends base_command_1.BaseCommand {
        constructor(client) {
            console.log("test");
            console.log(cmd);
            super(client, {
                name: cmd,
                metadata: options.metadata,
                type: opt,
                args: flg,
            });
        }
        run(context, args) {
            void 0;
            return run(context, args);
        }
    };
}
exports.Command = Command;
