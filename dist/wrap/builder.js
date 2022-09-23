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
            }
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
        arg.type = builder[id];
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
