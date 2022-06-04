"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileExtensionFromUrl = exports.splitToFields = exports.padCodeBlockFromRows = exports.toTitleCase = exports.imagescriptOp = exports.convert = exports.groupArray = exports.cutArray = exports.buildTimestampString = exports.mergeArrays = exports.formatBytes = exports.SIByteUnits = exports.ByteUnits = exports.store = exports.onlyEmoji = exports.validateUnicodeEmojis = exports.toCodePointForTwemoji = exports.toCodePoint = exports.splitTextToDiscordHandle = exports.findMembersByUsername = exports.findMemberByUsername = exports.findMembersByChunkText = exports.findMembersByChunk = exports.findMemberByChunkText = exports.findMemberByChunk = exports.fetchMemberOrUserById = exports.toCardinalNumber = exports.validateUrl = exports.isSnowflake = exports.permissionsErrorList = exports.editOrReply = void 0;
const detritus_client_1 = require("detritus-client");
const command_1 = require("detritus-client/lib/command");
const constants_1 = require("detritus-client/lib/constants");
const interaction_1 = require("detritus-client/lib/interaction");
const v2_1 = require("imagescript/v2");
const pariah_1 = require("pariah");
const data_1 = require("pariah/dist/data");
const constants_2 = require("../constants");
const globals_1 = require("../globals");
const secrets_1 = require("../secrets");
const error_1 = require("./error");
const markdown_1 = require("./markdown");
function editOrReply(context, options = {}) {
    if (typeof options === "string") {
        options = { content: options };
    }
    if (context instanceof interaction_1.InteractionContext) {
        return context.editOrRespond({
            ...options,
            allowedMentions: { parse: [], ...options.allowedMentions },
        });
    }
    return context.editOrReply({
        reference: true,
        ...options,
        allowedMentions: {
            parse: [],
            repliedUser: false,
            ...options.allowedMentions,
        },
    });
}
exports.editOrReply = editOrReply;
function permissionsErrorList(failed) {
    const permissions = [];
    for (const permission of failed) {
        const key = String(permission);
        if (key in constants_2.PermissionsText) {
            permissions.push(constants_2.PermissionsText[key]);
        }
        else {
            permissions.push(key);
        }
    }
    return permissions.map((v) => v.toLowerCase());
}
exports.permissionsErrorList = permissionsErrorList;
function isSnowflake(data) {
    return /^\d{16,21}$/.test(data);
}
exports.isSnowflake = isSnowflake;
function validateUrl(value) {
    return constants_2.VALID_URL_REGEX.test(value);
}
exports.validateUrl = validateUrl;
function toCardinalNumber(number) {
    const ending = number % 10;
    switch (ending) {
        case 1:
            return `${number.toLocaleString()}st`;
        case 2:
            return `${number.toLocaleString()}nd`;
        case 3:
            return `${number.toLocaleString()}rd`;
        default:
            return `${number.toLocaleString()}th`;
    }
}
exports.toCardinalNumber = toCardinalNumber;
async function fetchMemberOrUserById(context, userId, memberOnly = false) {
    if (context.user.id === userId) {
        if (memberOnly) {
            if (context.member) {
                return context.member;
            }
        }
        else {
            return context.member || context.user;
        }
    }
    if (context instanceof command_1.Context) {
        const mention = context.message.mentions.get(userId);
        if (mention) {
            if (memberOnly) {
                if (mention instanceof detritus_client_1.Structures.Member) {
                    return mention;
                }
            }
            else {
                return mention;
            }
        }
    }
    try {
        const { guild } = context;
        if (guild) {
            const member = guild.members.get(userId);
            if (member) {
                if (member.isPartial) {
                    return await guild.fetchMember(userId);
                }
                return member;
            }
            return await guild.fetchMember(userId);
        }
        if (memberOnly) {
            throw new error_1.Err("User is not in this server");
        }
        if (context.users.has(userId)) {
            return context.users.get(userId);
        }
        return await context.rest.fetchUser(userId);
    }
    catch (error) {
        switch (error.code) {
            case constants_1.DiscordAbortCodes.UNKNOWN_MEMBER: {
                if (memberOnly) {
                    throw new error_1.Err("User is not in this server");
                }
                return await context.rest.fetchUser(userId);
            }
            case constants_1.DiscordAbortCodes.UNKNOWN_USER: {
                throw new error_1.Err("User not found");
            }
            default: {
                throw error;
            }
        }
    }
}
exports.fetchMemberOrUserById = fetchMemberOrUserById;
async function findMemberByChunk(context, username, discriminator) {
    const voiceChannel = context.voiceChannel;
    if (voiceChannel) {
        const members = voiceChannel.members;
        if (members) {
            const found = findMemberByUsername(members, username, discriminator);
            if (found) {
                return found;
            }
        }
    }
    const guild = context.guild;
    if (guild && !guild.isReady) {
        await guild.requestMembers({
            limit: 0,
            presences: true,
            query: "",
            timeout: 10000,
        });
    }
    const { channel } = context;
    if (channel) {
        const { messages } = channel;
        if (messages) {
            for (const [, message] of messages) {
                {
                    const members = [message.member, message.author].filter((v) => v);
                    const found = findMemberByUsername(members, username, discriminator);
                    if (found) {
                        return found;
                    }
                }
                {
                    const members = message.mentions;
                    const found = findMemberByUsername(members, username, discriminator);
                    if (found) {
                        return found;
                    }
                }
            }
        }
        {
            const found = findMemberByUsername(channel.recipients, username, discriminator);
            if (found) {
                return found;
            }
        }
        {
            if (guild && guild.memberCount < 1000) {
                const members = findMembersByUsername(channel.members, username, discriminator);
                if (members.length) {
                    const sorted = members.sort((x, y) => {
                        if (x.hoistedRole && y.hoistedRole) {
                            return y.hoistedRole.position - x.hoistedRole.position;
                        }
                        else if (x.hoistedRole) {
                            return -1;
                        }
                        else if (y.hoistedRole) {
                            return 1;
                        }
                        return 0;
                    });
                    return sorted[0];
                }
            }
        }
    }
    if (guild) {
        const members = findMembersByUsername(guild.members, username, discriminator);
        if (members.length) {
            const sorted = members.sort((x, y) => {
                if (x.hoistedRole && y.hoistedRole) {
                    return y.hoistedRole.position - x.hoistedRole.position;
                }
                else if (x.hoistedRole) {
                    return -1;
                }
                else if (y.hoistedRole) {
                    return 1;
                }
                return 0;
            });
            return sorted[0];
        }
    }
    else {
        {
            const found = findMemberByUsername([context.user, context.client.user || undefined], username, discriminator);
            if (found) {
                return found;
            }
        }
    }
    return null;
}
exports.findMemberByChunk = findMemberByChunk;
async function findMemberByChunkText(context, text) {
    const [username, discriminator] = splitTextToDiscordHandle(text);
    return await findMemberByChunk(context, username, discriminator);
}
exports.findMemberByChunkText = findMemberByChunkText;
async function findMembersByChunk(context, username, discriminator) {
    const guild = context.guild;
    if (guild) {
        if (!guild.isReady) {
            await guild.requestMembers({
                limit: 0,
                presences: true,
                query: "",
                timeout: 10000,
            });
        }
        const found = findMembersByUsername(guild.members, username, discriminator);
        if (found.length) {
            return found;
        }
    }
    else {
        const found = findMembersByUsername([context.user, context.client.user || undefined], username, discriminator);
        if (found.length) {
            return found;
        }
    }
    return [];
}
exports.findMembersByChunk = findMembersByChunk;
async function findMembersByChunkText(context, text) {
    const [username, discriminator] = splitTextToDiscordHandle(text);
    return await findMembersByChunk(context, username, discriminator);
}
exports.findMembersByChunkText = findMembersByChunkText;
function findMemberByUsername(members, username, discriminator) {
    for (const memberOrUser of members.values()) {
        if (memberOrUser) {
            if (discriminator) {
                if (memberOrUser.username.toLowerCase().startsWith(username) &&
                    memberOrUser.discriminator === discriminator) {
                    return memberOrUser;
                }
            }
            else {
                const nameMatches = memberOrUser.names.some((n) => n.toLowerCase().startsWith(username));
                if (nameMatches) {
                    return memberOrUser;
                }
            }
        }
    }
}
exports.findMemberByUsername = findMemberByUsername;
function findMembersByUsername(members, username, discriminator) {
    const found = [];
    for (const memberOrUser of members.values()) {
        if (memberOrUser) {
            if (discriminator) {
                if (memberOrUser.username.toLowerCase().startsWith(username) &&
                    memberOrUser.discriminator === discriminator) {
                    found.push(memberOrUser);
                }
            }
            else {
                const nameMatches = memberOrUser.names.some((n) => n.toLowerCase().startsWith(username));
                if (nameMatches) {
                    found.push(memberOrUser);
                }
            }
        }
    }
    return found;
}
exports.findMembersByUsername = findMembersByUsername;
function splitTextToDiscordHandle(text) {
    const parts = text.split("#");
    const username = parts.shift().slice(0, 32).toLowerCase();
    let discriminator = null;
    if (parts.length) {
        discriminator = parts.shift().padStart(4, "0");
    }
    return [username, discriminator];
}
exports.splitTextToDiscordHandle = splitTextToDiscordHandle;
function toCodePoint(unicodeSurrogates, separator = "-") {
    const r = [];
    let c = 0;
    let p = 0;
    let i = 0;
    while (i < unicodeSurrogates.length) {
        c = unicodeSurrogates.charCodeAt(i++);
        if (p) {
            r.push((0x10000 + ((p - 0xd800) << 10) + (c - 0xdc00)).toString(16));
            p = 0;
        }
        else if (0xd800 <= c && c <= 0xdbff) {
            p = c;
        }
        else {
            r.push(c.toString(16));
        }
    }
    return r.join(separator);
}
exports.toCodePoint = toCodePoint;
const U200D = String.fromCharCode(0x200d);
const UFE0F_REGEX = /\uFE0F/g;
function toCodePointForTwemoji(unicodeSurrogates) {
    if (unicodeSurrogates.indexOf(U200D) < 0) {
        unicodeSurrogates = unicodeSurrogates.replace(UFE0F_REGEX, "");
    }
    return toCodePoint(unicodeSurrogates);
}
exports.toCodePointForTwemoji = toCodePointForTwemoji;
function validateUnicodeEmojis(emoji) {
    return constants_2.UNICODE_EMOJI_REGEX.test(emoji);
}
exports.validateUnicodeEmojis = validateUnicodeEmojis;
function onlyEmoji(emoji) {
    return validateUnicodeEmojis(emoji) && emoji.match(constants_2.UNICODE_EMOJI_REGEX);
}
exports.onlyEmoji = onlyEmoji;
async function store(value, filename) {
    if (value instanceof data_1.Data) {
        value = value.payload;
    }
    let e = false;
    const storageChannel = await globals_1.client.rest
        .fetchChannel(secrets_1.Secrets.StorageChannelId)
        .catch(() => {
        e = true;
    });
    if (!storageChannel || e) {
        throw new error_1.Err(`Could not find storage channel, ask ${globals_1.client.owners
            .map((v) => v.tag)
            .join(", ")} to restart the bot`);
    }
    const storageMessage = await storageChannel.createMessage({
        content: Date.now().toString(),
        files: [{ filename, value }],
    });
    return storageMessage.attachments.first();
}
exports.store = store;
exports.ByteUnits = [
    "Bytes",
    "Kilobytes",
    "Megabytes",
    "Gigabytes",
    "Terabytes",
];
exports.SIByteUnits = [
    "Bytes",
    "Kebibytes",
    "Mebibytes",
    "Gibibytes",
    "Tebibytes",
];
function formatBytes(bytes, decimals = 2, noBiBytes = true, short = false) {
    if (bytes === 0)
        return short ? "0B" : "0 Bytes";
    const delimiter = noBiBytes ? 1000 : 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = (noBiBytes ? exports.ByteUnits : exports.SIByteUnits).map((x) => short ? x.slice(0, 1) + "B" : x);
    const i = Math.floor(Math.log(bytes) / Math.log(delimiter));
    return (parseFloat((bytes / Math.pow(delimiter, i)).toFixed(dm)) + " " + sizes[i]);
}
exports.formatBytes = formatBytes;
function mergeArrays(...arrays) {
    const merged = [];
    for (const array of arrays) {
        merged.push(...array);
    }
    return merged;
}
exports.mergeArrays = mergeArrays;
function buildTimestampString(unix) {
    return `${markdown_1.Markdown.Format.timestamp(unix, markdown_1.Markdown.TimestampStyles.RELATIVE)} ${markdown_1.Markdown.Format.bold("[")}${markdown_1.Markdown.Format.timestamp(unix, markdown_1.Markdown.TimestampStyles.DATE_SHORT).spoiler()}${markdown_1.Markdown.Format.bold("]")}`;
}
exports.buildTimestampString = buildTimestampString;
function cutArray(data, ...indexes) {
    const slices = Array.from(new Set(indexes)).sort();
    const cutted = [];
    let lock = 0;
    for (const slice of slices) {
        cutted.push(data.slice(lock, slice));
        lock = slice;
    }
    return cutted;
}
exports.cutArray = cutArray;
function groupArray(data, size) {
    const grouped = [];
    for (let i = 0; i < data.length; i += size) {
        grouped.push(data.slice(i, i + size));
    }
    return grouped;
}
exports.groupArray = groupArray;
async function convert(uri, format = constants_1.ImageFormats.PNG) {
    const instance = new pariah_1.Pariah(new URL(uri));
    const data = await instance.get.arrayBuffer();
    const buffer = Buffer.from(data.payload);
    const attachment = await store(buffer, "image." + format);
    return attachment.url;
}
exports.convert = convert;
async function imagescriptOp(data, callback) {
    if (data instanceof v2_1.Image) {
        return callback(data);
    }
    for (let i = 0; i < data.frames.length; i++) {
        const output = callback(data.frames[i].image);
        data.frames[i] = new v2_1.Frame(output.width, output.height, output);
    }
    return data;
}
exports.imagescriptOp = imagescriptOp;
function toTitleCase(payload) {
    return payload
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}
exports.toTitleCase = toTitleCase;
function padCodeBlockFromRows(strings, options = {}) {
    const padding = options.padding === undefined ? " " : options.padding;
    const padFunc = options.padFunc === undefined ? String.prototype.padStart : options.padFunc;
    const join = options.join === undefined ? " " : options.join;
    const columns = [];
    const columnsAmount = strings.reduce((x, row) => Math.max(x, row.length), 0);
    for (let i = 0; i < columnsAmount; i++) {
        const column = [];
        let max = 0;
        for (const row of strings) {
            if (i in row) {
                max = Math.max(max, row[i].length);
            }
        }
        for (const row of strings) {
            if (i in row) {
                column.push(padFunc.call(row[i], max, padding));
            }
        }
        columns.push(column);
    }
    const rows = [];
    for (let i = 0; i < strings.length; i++) {
        const row = [];
        for (const column of columns) {
            if (i in column) {
                row.push(column[i]);
            }
        }
        rows.push(row.join(join));
    }
    return rows;
}
exports.padCodeBlockFromRows = padCodeBlockFromRows;
function splitToFields(text, amount, character = "\n") {
    const parts = [];
    if (character) {
        const split = text.split(character);
        if (split.length === 1) {
            return split;
        }
        while (split.length) {
            let newText = "";
            while (newText.length < amount && split.length) {
                const part = split.shift();
                if (part) {
                    if (amount < newText.length + part.length + 2) {
                        split.unshift(part);
                        break;
                    }
                    newText += part + "\n";
                }
            }
            parts.push(newText);
        }
    }
    else {
        while (text.length) {
            parts.push(text.slice(0, amount));
            text = text.slice(amount);
        }
    }
    return parts;
}
exports.splitToFields = splitToFields;
function fileExtensionFromUrl(url) {
    try {
        return new URL(url).pathname.split("/").pop();
    }
    catch {
        return null;
    }
}
exports.fileExtensionFromUrl = fileExtensionFromUrl;
