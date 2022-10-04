"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = exports.DefaultArgs = exports.CommandArgumentBuilders = void 0;
const base_command_1 = require("./base-command");
const parser_1 = require("./parser");
exports.CommandArgumentBuilders = {
    string(options) {
        return (value) => {
            if (value === undefined || value === "") {
                throw new RangeError("must provide a value");
            }
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
        return (value, context) => {
            if (value === undefined) {
                value = options?.default;
            }
            if (value) {
                return this.string(options)(value, context);
            }
            return undefined;
        };
    },
    number(options) {
        return (value) => {
            if (value === undefined || value === "") {
                throw new RangeError("must provide a value");
            }
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
        return (value, context) => {
            if (value === undefined) {
                value = options?.default;
            }
            if (value) {
                return this.number(options)(value, context);
            }
            return undefined;
        };
    },
    integer(options) {
        return (value, context) => {
            if (value === undefined || value === "") {
                throw new RangeError("must provide a value");
            }
            const float = this.number(options)(value, context);
            const int = float | 0;
            if (float !== int) {
                throw new RangeError("must be an integer");
            }
            return int;
        };
    },
    integerOptional(options) {
        return (value, context) => {
            if (value === undefined) {
                value = options?.default;
            }
            if (value) {
                return this.integer(options)(value, context);
            }
            return undefined;
        };
    },
    channel(options) {
        return (value, context) => {
            if (value === undefined || value === "") {
                throw new RangeError("must provide a value");
            }
            const { guild } = context;
            if (guild) {
                const found = guild.channels.find((channel) => {
                    if (options && options.type) {
                        if (channel.constructor !== parser_1.ChannelConstructors[options.type]) {
                            return false;
                        }
                    }
                    return channel.id === value.replace(/\D/g, "");
                });
                if (found) {
                    return found;
                }
                throw new RangeError("no channels found");
            }
            return context.channel;
        };
    },
    channelOptional(options) {
        return (value, context) => {
            if (value === undefined) {
                value = options?.default;
            }
            if (value) {
                return this.channel(options)(value, context);
            }
            return undefined;
        };
    },
    date() {
        return (value) => {
            if (value === undefined || value === "") {
                throw new RangeError("must provide a value");
            }
            return new Date(value);
        };
    },
    dateOptional(options) {
        return (value) => {
            if (value === undefined) {
                value = options?.default;
            }
            if (value) {
                return this.date()(value);
            }
            return undefined;
        };
    },
    object() {
        return (value) => {
            if (value === undefined || value === "") {
                throw new RangeError("must provide a value");
            }
            return JSON.parse(value);
        };
    },
    objectOptional(options) {
        return (value, context) => {
            if (value === undefined) {
                value = options?.default;
            }
            if (value) {
                return this.object()(value, context);
            }
            return undefined;
        };
    },
    regexp() {
        return (value) => {
            if (value === undefined || value === "") {
                throw new RangeError("must provide a value");
            }
            return new RegExp(value);
        };
    },
    regexpOptional(options) {
        return (value, context) => {
            if (value === undefined) {
                value = options?.default;
            }
            if (value) {
                return this.regexp()(value, context);
            }
            return undefined;
        };
    },
    url() {
        return (value) => {
            if (value === undefined || value === "") {
                throw new RangeError("must provide a value");
            }
            return new URL(value);
        };
    },
    urlOptional(options) {
        return (value, context) => {
            if (value === undefined) {
                value = options?.default;
            }
            if (value) {
                return this.url()(value, context);
            }
            return undefined;
        };
    },
    user() {
        return (value, context) => {
            if (value === undefined || value === "") {
                throw new RangeError("must provide a value");
            }
            const found = context.client.users.find((user) => user.tag === value || user.id === value.replace(/\D/g, ""));
            if (found === undefined) {
                throw new RangeError("user not found");
            }
            return found;
        };
    },
    userOptional(options) {
        return (value, context) => {
            if (value === undefined) {
                value = options?.default;
            }
            if (value) {
                return this.user()(value, context);
            }
            return undefined;
        };
    },
    member() {
        return (value, context) => {
            if (value === undefined || value === "") {
                throw new RangeError("must provide a value");
            }
            const { guild } = context;
            if (guild) {
                const found = guild.members.find((user) => user.tag === value || user.id === value.replace(/\D/g, ""));
                if (found === undefined) {
                    throw new RangeError("member not found");
                }
                return found;
            }
            throw new RangeError("must be in a guild");
        };
    },
    memberOptional(options) {
        return (value, context) => {
            if (value === undefined) {
                value = options?.default;
            }
            if (value) {
                return this.member()(value, context);
            }
        };
    },
    role() {
        return (value, context) => {
            if (value === undefined || value === "") {
                throw new RangeError("must provide a value");
            }
            const { guild } = context;
            if (guild) {
                const found = guild.roles.find((user) => user.name === value || user.id === value.replace(/\D/g, ""));
                if (found === undefined) {
                    throw new RangeError("role not found");
                }
                return found;
            }
            throw new RangeError("must be in a guild");
        };
    },
    roleOptional(options) {
        return (value, context) => {
            if (value === undefined) {
                value = options?.default;
            }
            if (value) {
                return this.role()(value, context);
            }
        };
    },
};
exports.DefaultArgs = new Proxy({}, {
    get() {
        return exports.CommandArgumentBuilders.string();
    },
});
function Command(syntax, options, run) {
    const [, cmd] = /^(.+?)(?: \[|$)/.exec(syntax);
    const ids = /\[.+\]/g.exec(syntax) || [];
    const opt = [];
    const flg = [];
    const builder = (options.args || (() => exports.DefaultArgs))(exports.CommandArgumentBuilders);
    for (const id of ids) {
        const id2 = id.replace(/\[|\]/g, "");
        const [, name, def] = /^\[(?:\.{3})?-?(.+?)\??(?:=(.*?))?\]$/.exec(id);
        let arg = { name: name, required: true };
        const isFlag = /^\[(?:\.{3}?)-/.test(id);
        if (/^\[(?:\.{3})?-?(.+?)\?/.test(id)) {
            arg.required = false;
        }
        if (def) {
            arg.default = def;
        }
        arg.type = builder[id2];
        if (/^\[\.{3}/.test(id)) {
            arg.consume = true;
        }
        if (isFlag) {
            flg.push(arg);
            continue;
        }
        opt.push(arg);
    }
    return class Exec extends base_command_1.BaseCommand {
        constructor(client) {
            super(client, {
                name: cmd,
                metadata: options.metadata,
                ...options,
                type: opt,
                args: flg,
            }, syntax);
        }
        run(context, args) {
            return run(context, args);
        }
    };
}
exports.Command = Command;
