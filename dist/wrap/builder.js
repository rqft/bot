"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = exports.DefaultArgs = exports.CommandArgumentBuilders = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const emoji_1 = require("../tools/emoji");
const image_search_1 = require("../tools/image-search");
const base_command_1 = require("./base-command");
const parser_1 = require("./parser");
exports.CommandArgumentBuilders = {
    string(options) {
        return (value) => {
            if (value === undefined || value === '') {
                throw new RangeError('must provide a value');
            }
            if (options) {
                if (options.choices && options.choices.length) {
                    if (options.choices.includes(value)) {
                        return value;
                    }
                    throw new RangeError(`must be one of [ ${options.choices.join(', ')} ]`);
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
            if (value === undefined || value === '') {
                throw new RangeError('must provide a value');
            }
            const float = Number.parseFloat(value);
            if (options) {
                if (options.choices && options.choices.length) {
                    if (options.choices.includes(float)) {
                        return float;
                    }
                    throw new RangeError(`must be one of [ ${options.choices.join(', ')} ]`);
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
            if (value === undefined || value === '') {
                throw new RangeError('must provide a value');
            }
            const float = this.number(options)(value, context);
            const int = float | 0;
            if (float !== int) {
                throw new RangeError('must be an integer');
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
            if (value === undefined || value === '') {
                throw new RangeError('must provide a value');
            }
            const { guild } = context;
            if (guild) {
                const found = guild.channels.find((channel) => {
                    if (options && options.type) {
                        if (channel.constructor !== parser_1.ChannelConstructors[options.type]) {
                            return false;
                        }
                    }
                    return channel.id === value.replace(/\D/g, '');
                });
                if (found) {
                    return found;
                }
                throw new RangeError('no channels found');
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
            if (value === undefined || value === '') {
                throw new RangeError('must provide a value');
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
            if (value === undefined || value === '') {
                throw new RangeError('must provide a value');
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
            if (value === undefined || value === '') {
                throw new RangeError('must provide a value');
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
            if (value === undefined || value === '') {
                throw new RangeError('must provide a value');
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
        return async (value, context) => {
            if (value === undefined || value === '') {
                throw new RangeError('must provide a value');
            }
            const found = context.client.users.find((user) => user.tag.toLowerCase().includes(value.toLowerCase()) ||
                user.id === value.replace(/\D/g, ''));
            if (found === undefined) {
                try {
                    return await context.client.rest.fetchUser(value);
                }
                catch {
                    void 0;
                }
                throw new RangeError('user not found');
            }
            return found;
        };
    },
    userOptional(options) {
        return async (value, context) => {
            if (value === undefined) {
                value = options?.default;
            }
            if (value) {
                return await this.user()(value, context);
            }
            return undefined;
        };
    },
    member() {
        return (value, context) => {
            if (value === undefined || value === '') {
                throw new RangeError('must provide a value');
            }
            const { guild } = context;
            if (guild) {
                const found = guild.members.find((user) => user.tag === value || user.id === value.replace(/\D/g, ''));
                if (found === undefined) {
                    throw new RangeError('member not found');
                }
                return found;
            }
            throw new RangeError('must be in a guild');
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
            if (value === undefined || value === '') {
                throw new RangeError('must provide a value');
            }
            const { guild } = context;
            if (guild) {
                const found = guild.roles.find((user) => user.name === value || user.id === value.replace(/\D/g, ''));
                if (found === undefined) {
                    throw new RangeError('role not found');
                }
                return found;
            }
            throw new RangeError('must be in a guild');
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
    emoji() {
        return (value, context) => {
            if (value === undefined || value === '') {
                throw new RangeError('must provide a value');
            }
            console.log(value, value.replace(/\D/g, ''));
            const found = context.client.emojis.find((emoji) => emoji.id === value.replace(/\D/g, ''));
            if (found === undefined) {
                throw new RangeError('emoji not found');
            }
            return found;
        };
    },
    emojiOptional(options) {
        return (value, context) => {
            if (value === undefined) {
                value = options?.default;
            }
            if (value) {
                return this.emoji()(value, context);
            }
            return undefined;
        };
    },
    unicodeEmoji() {
        return (value) => {
            return new emoji_1.UnicodeEmoji(value);
        };
    },
    unicodeEmojiOptional(options) {
        return (value, context) => {
            if (value === undefined) {
                value = options?.default;
            }
            if (value) {
                return this.unicodeEmoji()(value, context);
            }
            return undefined;
        };
    },
    array(options) {
        return (value) => {
            const sliced = value.split(options?.split || ' ');
            if (options?.choices && options?.choices.length) {
                if (!sliced.every((x) => options?.choices?.includes(x))) {
                    throw new RangeError(`must be one of [ ${options.choices.join(', ')} ]`);
                }
            }
            const data = sliced.map(options?.map || ((x) => x));
            if (options) {
                if (options.maxLength && data.length > options.maxLength) {
                    throw new RangeError(`must be less than ${options.maxLength} items`);
                }
                if (options.minLength && data.length < options.minLength) {
                    throw new RangeError(`must be more than ${options.maxLength} items`);
                }
            }
            return data;
        };
    },
    arrayOptional(options) {
        return (value, context) => {
            if (value === undefined) {
                value = options?.default;
            }
            if (value) {
                return this.array(options)(value, context);
            }
            return undefined;
        };
    },
    mediaUrl(types) {
        return async (value, context) => {
            console.log('using murl', value);
            const urls = await (0, image_search_1.findMediaUrls)(types || image_search_1.AllMediaTypes, context, value);
            console.log(urls);
            if (urls.length === 0) {
                throw new Error('no media urls found');
            }
            return urls.at(0);
        };
    },
    mediaUrlOptional(types, options) {
        return async (value, context) => {
            if (value === undefined) {
                value = options?.default;
            }
            if (value) {
                return this.mediaUrl(types)(value, context);
            }
            return undefined;
        };
    },
    media(types) {
        return async (value, context) => {
            const url = await this.mediaUrl(types)(value, context);
            const response = await (0, node_fetch_1.default)(url);
            return await response.buffer();
        };
    },
    mediaOptional(types, options) {
        return async (value, context) => {
            if (value === undefined) {
                value = options?.default;
            }
            if (value) {
                return this.media(types)(value, context);
            }
            return undefined;
        };
    },
    audio() {
        return this.media(['Audio']);
    },
    audioOptional(options) {
        return this.mediaOptional(['Audio'], options);
    },
    audioUrl() {
        return this.mediaUrl(['Audio']);
    },
    audioUrlOptional(options) {
        return this.mediaUrlOptional(['Audio'], options);
    },
    image() {
        return this.media(['Image']);
    },
    imageOptional(options) {
        return this.mediaOptional(['Image'], options);
    },
    imageUrl() {
        return this.mediaUrl(['Image']);
    },
    imageUrlOptional(options) {
        return this.mediaUrlOptional(['Image'], options);
    },
    video() {
        return this.media(['Video']);
    },
    videoOptional(options) {
        return this.mediaOptional(['Video'], options);
    },
    videoUrl() {
        return this.mediaUrl(['Video']);
    },
    videoUrlOptional(options) {
        return this.mediaUrlOptional(['Video'], options);
    },
};
exports.DefaultArgs = new Proxy({}, {
    get() {
        return exports.CommandArgumentBuilders.string();
    },
});
function Command(syntax, options, run) {
    const [, cmd] = /^(.+?)(?: \[|$)/.exec(syntax) || [];
    const ids = syntax.match(/\[.+?\]/g) || [];
    const opt = [];
    const flg = [];
    const builder = (options.args || (() => exports.DefaultArgs))(exports.CommandArgumentBuilders);
    for (const id of ids) {
        const id2 = id.replace(/\[|\]/g, '');
        const [, name, def] = /^\[(?:\.{3})?-?(.+?)\??(?:=(.*?))?\]$/.exec(id) || [];
        const arg = { name: name || '', required: true };
        const isFlag = /^\[(?:\.{3})?-/.test(id);
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
                name: cmd || '',
                metadata: options.metadata,
                ...options,
                type: opt,
                args: flg,
                aliases: options.aliases ? Array.from(options.aliases) : undefined,
            }, syntax);
        }
        run(context, args) {
            return run(context, args);
        }
    };
}
exports.Command = Command;
