"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseVideoCommand = exports.BaseAudioCommand = exports.BaseMediaCommand = exports.BaseImageCommand = exports.BaseCommand = exports.DefaultOptions = void 0;
const command_1 = require("detritus-client/lib/command");
const constants_1 = require("detritus-client/lib/constants");
const error_1 = require("../../tools/error");
const find_image_1 = require("../../tools/find-image");
const markdown_1 = require("../../tools/markdown");
const parameters_1 = require("../../tools/parameters");
const tools_1 = require("../../tools/tools");
exports.DefaultOptions = {
    triggerTypingAfter: 1000,
    ratelimits: [
        { duration: 2500, limit: 3, type: constants_1.CommandRatelimitTypes.USER },
        { duration: 5000, limit: 10, type: constants_1.CommandRatelimitTypes.CHANNEL },
        { duration: 10000, limit: 20, type: constants_1.CommandRatelimitTypes.GUILD },
    ],
};
class BaseCommand extends command_1.Command {
    use;
    expensive = false;
    metadata;
    constructor(client, options) {
        console.log("creating", options.name);
        super(client, Object.assign({}, exports.DefaultOptions, options));
        this.metadata = options.metadata;
    }
    get commandUsage() {
        const metadata = this.metadata;
        if (typeof metadata.usage === "string") {
            return `${this.fullName} ${metadata.usage}`.trim();
        }
        return this.fullName;
    }
    async onBefore() {
        this.use = new Date();
        console.log(`recieved ${this.fullName} in ${Date.now() - this.use.getTime()}ms`);
        return true;
    }
    async onBeforeRun(context, args) {
        console.log(`processing ${this.fullName} in ${Date.now() - this.use.getTime()}ms`);
        await (0, tools_1.editOrReply)(context, "ok, processing" + (this.expensive ? " (this may take a while)" : ""));
        return true || args;
    }
    async onCancelRun(context, args) {
        console.log(`cancelled ${this.fullName} in ${Date.now() - this.use.getTime()}ms`, {} || args);
        return await (0, tools_1.editOrReply)(context, markdown_1.Markdown.Format.codeblock(this.commandUsage).toString());
    }
    async onPermissionsFail(context, failed) {
        const permissions = (0, tools_1.permissionsErrorList)(failed);
        return await (0, tools_1.editOrReply)(context, `hey you need ${permissions.join(", ")} to run this`);
    }
    async onPermissionsFailClient(context, failed) {
        const permissions = (0, tools_1.permissionsErrorList)(failed);
        return await (0, tools_1.editOrReply)(context, `hey i need ${permissions.join(", ")} to run this`);
    }
    async onRatelimit(context, ratelimits) {
        if (!context.canReply) {
            return;
        }
        let replied = false;
        for (const { item, ratelimit, remaining } of ratelimits) {
            if (remaining < 1000 || replied || item.replied) {
                item.replied = true;
                continue;
            }
            replied = item.replied = true;
            let noun = "you funny people are";
            switch (ratelimit.type) {
                case constants_1.CommandRatelimitTypes.CHANNEL: {
                    noun = "this channel is";
                    break;
                }
                case constants_1.CommandRatelimitTypes.GUILD: {
                    noun = "this server is";
                    break;
                }
                case constants_1.CommandRatelimitTypes.USER: {
                    noun = "you are";
                    break;
                }
            }
            const content = `${noun} going really fast please slow down :( (wait ${markdown_1.Markdown.toTimeString(remaining, undefined, false)})`;
            return await (0, tools_1.editOrReply)(context, content);
        }
    }
    async onRunError(context, _args, error) {
        await (0, tools_1.editOrReply)(context, error_1.Err.from(error).toThrown());
        throw error;
    }
    async onError(context, _args, error) {
        await (0, tools_1.editOrReply)(context, error_1.Err.from(error).toThrown());
        throw error;
    }
    async onTypeError(context, _args, errors) {
        const description = ["hey u have some wrong inputs\n"];
        const store = {};
        for (const key in errors) {
            const value = errors[key];
            const message = value.message;
            if (message in store) {
                description.push(`${key}: same as ${store[message]}`);
            }
            else {
                description.push(`${key}: ${message}`);
            }
            store[message] = key;
        }
        return await (0, tools_1.editOrReply)(context, description.join("\n"));
    }
}
exports.BaseCommand = BaseCommand;
class BaseImageCommand extends BaseCommand {
    triggerTypingAfter = 250;
    constructor(client, options, format) {
        options.type = [
            {
                name: "target",
                type: parameters_1.Parameters.imageUrl(format),
                required: true,
            },
            ...coerceType(options.type),
        ];
        super(client, Object.assign({}, exports.DefaultOptions, {
            permissionsClient: [
                constants_1.Permissions.ATTACH_FILES,
                constants_1.Permissions.EMBED_LINKS,
            ],
        }, options));
    }
    async onBeforeRun(context, args) {
        if (args.target) {
            context.metadata = Object.assign({}, context.metadata, {
                contentUrl: args.target,
            });
        }
        return !!args.target;
    }
    onCancelRun(context, args) {
        if (args.target === undefined) {
            return (0, tools_1.editOrReply)(context, "⚠ `Cannot find any images`");
        }
        return super.onCancelRun(context, args);
    }
    onSuccess(context, args) {
        if (context.response) {
            const responseUrl = find_image_1.Find.findImageUrlInMessages([context.response]);
            if (responseUrl) {
                context.metadata = Object.assign({}, context.metadata, { responseUrl });
            }
        }
        if (super.onSuccess) {
            return super.onSuccess(context, args);
        }
    }
}
exports.BaseImageCommand = BaseImageCommand;
class BaseMediaCommand extends BaseCommand {
    triggerTypingAfter = 250;
    constructor(media, commandClient, options) {
        options.type = [
            {
                name: "target",
                type: parameters_1.Parameters.mediaUrl(media),
                required: true,
            },
            ...coerceType(options.type),
        ];
        super(commandClient, Object.assign({}, exports.DefaultOptions, Object.assign({}, options)));
    }
    async onBeforeRun(context, args) {
        if (args.target) {
            context.metadata = Object.assign({}, context.metadata, {
                contentUrl: args.target,
            });
        }
        return !!args.target;
    }
    async onCancelRun(context, args) {
        if (args.target === undefined) {
            return (0, tools_1.editOrReply)(context, "❌ `Cannot find any media`");
        }
        return super.onCancelRun(context, args);
    }
    onSuccess(context, args) {
        if (super.onSuccess) {
            super.onSuccess(context, args);
        }
    }
}
exports.BaseMediaCommand = BaseMediaCommand;
class BaseAudioCommand extends BaseMediaCommand {
    constructor(commandClient, options) {
        super({ audio: true, video: false, image: false }, commandClient, options);
    }
}
exports.BaseAudioCommand = BaseAudioCommand;
class BaseVideoCommand extends BaseMediaCommand {
    constructor(commandClient, options) {
        super({ audio: false, video: true, image: false }, commandClient, options);
    }
}
exports.BaseVideoCommand = BaseVideoCommand;
function coerceType(argument) {
    if (!argument) {
        return [];
    }
    if (Array.isArray(argument)) {
        return argument;
    }
    return [argument];
}
