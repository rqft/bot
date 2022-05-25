"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parameters = void 0;
const detritus_client_1 = require("detritus-client");
const detritus_client_rest_1 = require("detritus-client-rest");
const constants_1 = require("detritus-client/lib/constants");
const utils_1 = require("detritus-client/lib/utils");
const detritus_utils_1 = require("detritus-utils");
const constants_2 = require("../constants");
const endpoints_1 = require("../endpoints");
const globals_1 = require("../globals");
const error_1 = require("./error");
const find_image_1 = require("./find-image");
const markdown_1 = require("./markdown");
const tools_1 = require("./tools");
var Parameters;
(function (Parameters) {
    function array(use) {
        return function (value) {
            return value
                .split("|")
                .map((x) => x.trim())
                .map(use);
        };
    }
    Parameters.array = array;
    function codeblock(value) {
        const { matches } = (0, utils_1.regex)(constants_1.DiscordRegexNames.TEXT_CODEBLOCK, value);
        if (matches.length && matches[0]) {
            return matches[0];
        }
        return { text: value };
    }
    Parameters.codeblock = codeblock;
    function number(options = {}) {
        return (valueStrOrNum) => {
            const value = parseInt(valueStrOrNum);
            if (isNaN(value)) {
                throw new error_1.Err("wasn't a number", { status: 400 });
            }
            if (options.max !== undefined && options.min !== undefined) {
                if (value < options.min || options.max < value) {
                    throw new error_1.Err(`must be between ${options.min} and ${options.max}`);
                }
            }
            else if (options.max !== undefined) {
                if (options.max < value) {
                    throw new error_1.Err(`must be less than ${options.max}`, { status: 400 });
                }
            }
            else if (options.min !== undefined) {
                if (value < options.min) {
                    throw new error_1.Err(`must be more than ${options.min}`, { status: 400 });
                }
            }
            return value;
        };
    }
    Parameters.number = number;
    function percentage(value) {
        if (typeof value === "string") {
            value = value.replace(/%/g, "");
        }
        const percentage = parseFloat(value);
        if (isNaN(percentage)) {
            return percentage;
        }
        return Math.max(0, Math.min(percentage / 100));
    }
    Parameters.percentage = percentage;
    function snowflake(value) {
        if (!(0, tools_1.isSnowflake)(value)) {
            throw new error_1.Err("wasn't a valid snowflake", { status: 400 });
        }
        return value;
    }
    Parameters.snowflake = snowflake;
    function url(value) {
        if (value) {
            if (!/^https?:\/\//.test(value)) {
                value = `http://${value}`;
            }
            if (!(0, tools_1.validateUrl)(value)) {
                throw new error_1.Err("wasn't a valid url", { status: 400 });
            }
        }
        return new URL(value);
    }
    Parameters.url = url;
    function emoji(options = {}) {
        return (value) => {
            if (options.unicode) {
                if (!constants_2.UNICODE_EMOJI_REGEX.test(value)) {
                    throw new error_1.Err("wasn't a valid unicode emoji", { status: 400 });
                }
                return value;
            }
            const matched = markdown_1.Markdown.Match.emoji(value);
            if (matched.matches.length === 0) {
                throw new error_1.Err("wasn't a valid emoji", { status: 400 });
            }
            return value;
        };
    }
    Parameters.emoji = emoji;
    let EmojiType;
    (function (EmojiType) {
        EmojiType["TWEMOJI"] = "twemoji";
        EmojiType["CUSTOM"] = "custom";
    })(EmojiType = Parameters.EmojiType || (Parameters.EmojiType = {}));
    function emojiUrl(value) {
        value = value.toLowerCase().trim();
        if (constants_2.UNICODE_EMOJI_REGEX.test(value)) {
            const points = (0, tools_1.toCodePointForTwemoji)(value);
            const url = `https://cdn.notsobot.com/twemoji/512x512/${points}.png`;
            return { url, type: EmojiType.TWEMOJI, raw: points };
        }
        const matches = markdown_1.Markdown.Match.emoji(value);
        if (matches.matches.length === 0) {
            return null;
        }
        const emoji = matches.matches[0];
        return {
            url: detritus_client_rest_1.Endpoints.Urls.CDN.slice(0, -1) + detritus_client_rest_1.Endpoints.CDN.EMOJI(emoji.id, emoji.animated ? constants_1.ImageFormats.GIF : constants_1.ImageFormats.PNG),
            type: EmojiType.CUSTOM,
            id: emoji.id,
            raw: value,
        };
    }
    Parameters.emojiUrl = emojiUrl;
    async function user(value, _context) {
        if (!value) {
            return Parameters.Default.author(_context);
        }
        const found = [globals_1.client, globals_1.selfclient]
            .map((v) => v.users.toArray())
            .flat(1)
            .find((key) => {
            return (key.username.toLowerCase().includes(value) ||
                key.toString().toLowerCase() === value ||
                key.id === value.replace(/\D/g, ""));
        });
        if (!found) {
            try {
                const fetchy = await globals_1.client.rest.fetchUser(value.replace(/\D/g, ""));
                if (fetchy) {
                    return fetchy;
                }
            }
            catch (e) {
                throw new error_1.Err("not found", { status: 404 });
            }
        }
        return found;
    }
    Parameters.user = user;
    function channel(options = {}) {
        options = Object.assign({ inGuild: true }, options);
        return (value, context) => {
            if (!value) {
                return Parameters.Default.channel(context);
            }
            if (value) {
                {
                    const { matches } = (0, utils_1.regex)(constants_1.DiscordRegexNames.MENTION_CHANNEL, value);
                    if (matches.length) {
                        const { id: channelId } = matches[0];
                        const channel = context.channels.get(channelId);
                        if (channel &&
                            (!options.types || options.types.includes(channel.type))) {
                            if (!options.inGuild || channel.guildId === context.guildId) {
                                return channel;
                            }
                            return null;
                        }
                    }
                }
                if ((0, tools_1.isSnowflake)(value)) {
                    const channel = context.channels.get(value);
                    if (channel &&
                        (!options.types || options.types.includes(channel.type))) {
                        if (!options.inGuild || channel.guildId === context.guildId) {
                            return channel;
                        }
                        return null;
                    }
                }
                const { guild } = context;
                if (guild) {
                    let channels;
                    const { types: channelTypes } = options;
                    if (channelTypes) {
                        channels = guild.channels.filter((channel) => channelTypes.includes(channel.type));
                    }
                    else {
                        channels = guild.channels.toArray();
                    }
                    channels = channels.sort((x, y) => (x.position || 0) - (y.position || 0));
                    for (let channel of channels) {
                        if (channel.name.toLowerCase().startsWith(value)) {
                            return channel;
                        }
                    }
                    for (let channel of channels) {
                        if (channel.name.toLowerCase().includes(value)) {
                            return channel;
                        }
                    }
                }
            }
            return null;
        };
    }
    Parameters.channel = channel;
    function channels(options = {}) {
        const findChannel = channel(options);
        return (value, context) => {
            if (value) {
                const channels = [];
                for (let arg of stringArguments(value)) {
                    const found = findChannel(arg, context);
                    if (found) {
                        channels.push(found);
                    }
                }
                return channels;
            }
            return [];
        };
    }
    Parameters.channels = channels;
    function role(value, context) {
        if (value) {
            const { guild } = context;
            if (guild) {
                {
                    const { matches } = (0, utils_1.regex)(constants_1.DiscordRegexNames.MENTION_ROLE, value);
                    if (matches.length) {
                        const { id: roleId } = matches[0];
                        const role = guild.roles.get(roleId);
                        if (role) {
                            return role;
                        }
                    }
                }
                if ((0, tools_1.isSnowflake)(value)) {
                    const role = guild.roles.get(value);
                    if (role) {
                        return role;
                    }
                }
                value = value.toLowerCase();
                for (let [, role] of guild.roles) {
                    if (role.name.toLowerCase().startsWith(value)) {
                        return role;
                    }
                }
                for (let [, role] of guild.roles) {
                    if (role.name.toLowerCase().includes(value)) {
                        return role;
                    }
                }
            }
        }
        return Default.defaultRole(context);
    }
    Parameters.role = role;
    Parameters.QuotesAll = {
        '"': '"',
        "'": "'",
        "’": "’",
        "‚": "‛",
        "“": "”",
        "„": "‟",
        "「": "」",
        "『": "』",
        "〝": "〞",
        "﹁": "﹂",
        "﹃": "﹄",
        "＂": "＂",
        "｢": "｣",
        "«": "»",
        "《": "》",
        "〈": "〉",
    };
    Parameters.Quotes = {
        END: Object.values(Parameters.QuotesAll),
        START: Object.keys(Parameters.QuotesAll),
    };
    function stringArguments(value) {
        const results = [];
        while (value.length) {
            let result = value.slice(0, 1);
            value = value.slice(1);
            if (Parameters.Quotes.START.includes(result)) {
                let index = value.indexOf(Parameters.QuotesAll[result], 1);
                if (index !== -1) {
                    result = value.slice(0, index);
                    value = value.slice(index + 1).trim();
                    results.push(result);
                    continue;
                }
            }
            let index = value.indexOf(" ");
            if (index === -1) {
                result += value.slice(0, value.length);
                value = "";
            }
            else {
                result += value.slice(0, index);
                value = value.slice(index).trim();
            }
            results.push(result);
        }
        return results;
    }
    Parameters.stringArguments = stringArguments;
    function imageUrl(as) {
        return async (value, context) => {
            if (!value) {
                value = '^';
            }
            try {
                if (context instanceof detritus_client_1.Command.Context) {
                    {
                        const url = find_image_1.FindImage.findImageUrlInMessages([context.message], as);
                        if (url) {
                            return url;
                        }
                    }
                    {
                        const { messageReference } = context.message;
                        if (messageReference && messageReference.messageId) {
                            const message = messageReference.message ||
                                (await context.rest.fetchMessage(messageReference.channelId, messageReference.messageId));
                            const url = find_image_1.FindImage.findImageUrlInMessages([message], as);
                            if (url) {
                                return url;
                            }
                        }
                    }
                }
                if (value) {
                    if (value === "^") {
                        return await Default.imageUrl(as)(context);
                    }
                    {
                        const { matches } = (0, utils_1.regex)(constants_1.DiscordRegexNames.TEXT_URL, value);
                        if (matches.length) {
                            const [match] = matches;
                            const { text } = match;
                            {
                                const messageLink = (0, utils_1.regex)(constants_1.DiscordRegexNames.JUMP_CHANNEL_MESSAGE, text);
                                if (messageLink.matches.length) {
                                    const { channelId, messageId } = messageLink.matches[0];
                                    if (channelId && messageId) {
                                        const message = context.messages.get(messageId) ||
                                            (await context.rest.fetchMessage(channelId, messageId));
                                        const url = find_image_1.FindImage.findImageUrlInMessages([message], as);
                                        if (url) {
                                            return url;
                                        }
                                    }
                                    return null;
                                }
                            }
                            if (context instanceof detritus_client_1.Command.Context) {
                                if (!context.message.embeds.length) {
                                    await detritus_utils_1.Timers.sleep(1000);
                                }
                                const url = find_image_1.FindImage.findImageUrlInMessages([context.message], as);
                                return url || text;
                            }
                            else {
                                return text;
                            }
                        }
                    }
                    if (value.includes("#") && !value.startsWith("#")) {
                        const found = await Parameters.user(value, context);
                        if (found) {
                            return found.avatarUrlFormat(as, { size: 1024 });
                        }
                        return null;
                    }
                    {
                        const { matches } = (0, utils_1.regex)(constants_1.DiscordRegexNames.MENTION_USER, value);
                        if (matches.length) {
                            const [match] = matches;
                            const { id: userId } = match;
                            if ((0, tools_1.isSnowflake)(userId)) {
                                value = userId;
                            }
                        }
                    }
                    if ((0, tools_1.isSnowflake)(value)) {
                        const userId = value;
                        let user;
                        if (context instanceof detritus_client_1.Command.Context &&
                            context.message.mentions.has(userId)) {
                            user = context.message.mentions.get(userId);
                        }
                        else {
                            user = await context.rest.fetchUser(userId);
                        }
                        return user.avatarUrlFormat(as, { size: 1024 });
                    }
                    {
                        const { matches } = (0, utils_1.regex)(constants_1.DiscordRegexNames.EMOJI, value);
                        if (matches.length) {
                            const [match] = matches;
                            const { id } = match;
                            return detritus_client_rest_1.Endpoints.CDN.URL + detritus_client_rest_1.Endpoints.CDN.EMOJI(id, as);
                        }
                    }
                    {
                        const emojis = (0, tools_1.onlyEmoji)(value);
                        if (emojis && emojis.length) {
                            for (let emoji of emojis) {
                                const codepoint = (0, tools_1.toCodePointForTwemoji)(emoji);
                                return endpoints_1.VyboseEndpoints.CUSTOM.TWEMOJI_SVG(codepoint);
                            }
                        }
                    }
                    {
                        const found = await Parameters.user(value, context);
                        if (found) {
                            return found.avatarUrlFormat(as, { size: 1024 });
                        }
                    }
                }
            }
            catch (error) {
                throw new error_1.Err(error);
            }
            throw new error_1.Err("No images found");
        };
    }
    Parameters.imageUrl = imageUrl;
    let Default;
    (function (Default) {
        function imageUrl(as) {
            return async (context) => {
                if (!context.channel) {
                    return null;
                }
                const messages = await context.channel.fetchMessages({ limit: 100 });
                const image = find_image_1.FindImage.findImageUrlInMessages(messages, as);
                if (image) {
                    return image;
                }
                return null;
            };
        }
        Default.imageUrl = imageUrl;
        function applications(context) {
            return context.applications.toArray();
        }
        Default.applications = applications;
        function author(context) {
            return context.user;
        }
        Default.author = author;
        function channel(context) {
            return context.channel;
        }
        Default.channel = channel;
        function defaultRole(context) {
            return (context.guild && context.guild.defaultRole) || null;
        }
        Default.defaultRole = defaultRole;
        function guild(context) {
            return context.guild || null;
        }
        Default.guild = guild;
        async function members(context) {
            const guild = context.guild;
            if (guild) {
                if (guild.isReady) {
                    return guild.members.toArray();
                }
                const { members } = await guild.requestMembers({
                    limit: 0,
                    presences: true,
                    query: "",
                    timeout: 10000,
                });
                return members.toArray();
            }
            return [context.member || context.user];
        }
        Default.members = members;
        function noEmbed(context) {
            if (context.channel) {
                return !context.channel.canEmbedLinks;
            }
            return !context.inDm;
        }
        Default.noEmbed = noEmbed;
        function safe(context) {
            const { channel } = context;
            if (channel) {
                if (channel.isDm) {
                    return false;
                }
                if (channel.nsfw) {
                    return false;
                }
                const { guild } = channel;
                if (guild) {
                    switch (guild.explicitContentFilter) {
                        case constants_1.GuildExplicitContentFilterTypes.MEMBERS_WITHOUT_ROLES:
                            {
                                const { member } = context;
                                if (member && member.roles.length === 1) {
                                    return true;
                                }
                            }
                            break;
                        case constants_1.GuildExplicitContentFilterTypes.ALL_MEMBERS: {
                            return true;
                        }
                    }
                }
            }
            return false;
        }
        Default.safe = safe;
    })(Default = Parameters.Default || (Parameters.Default = {}));
    let Autocomplete;
    (function (Autocomplete) {
        function choices(items) {
            return async (context) => {
                let choices = items;
                if (context.value) {
                    const value = context.value.toLowerCase();
                    choices = choices.filter((choice) => {
                        return String(choice).toLowerCase().includes(value);
                    });
                }
                return await context.respond({
                    choices: choices
                        .slice(0, 25)
                        .map((choice) => ({ name: String(choice), value: String(choice) })),
                });
            };
        }
        Autocomplete.choices = choices;
    })(Autocomplete = Parameters.Autocomplete || (Parameters.Autocomplete = {}));
})(Parameters = exports.Parameters || (exports.Parameters = {}));
