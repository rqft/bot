"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileExtension = exports.formatBytes = exports.SIByteUnits = exports.ByteUnits = exports.permissionsText = exports.toCodePointForTwemoji = exports.toCodePoint = exports.respond = exports.fmt = void 0;
const constants_1 = require("detritus-client/lib/constants");
const constants_2 = require("../constants");
function fmt(value, contents) {
    let f = value;
    for (const [key, value] of Object.entries(contents)) {
        f = f.split(`{${key}}`).join(String(value));
    }
    f = f.split("\\bl").join("{").split("\\br").join("}");
    return f;
}
exports.fmt = fmt;
exports.respond = Object.assign(async (context, options) => {
    if (typeof options === "string") {
        options = { content: options };
    }
    return await context.editOrReply(Object.assign({ allowedMentions: { parse: [], repliedUser: false }, reference: true }, options));
}, {
    async fmt(context, value, contents, options = {}) {
        return await (0, exports.respond)(context, {
            content: fmt(value, contents),
            ...options,
        });
    },
});
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
function permissionsText(context) {
    if (context.can(constants_1.Permissions.ADMINISTRATOR)) {
        return [constants_2.PermissionsText[String(constants_1.Permissions.ADMINISTRATOR)]];
    }
    const text = [];
    for (const permission of Object.values(constants_1.Permissions)) {
        if (permission === constants_1.Permissions.NONE) {
            continue;
        }
        if (constants_2.IrrelevantPermissions.includes(permission)) {
            continue;
        }
        if (context.can(permission)) {
            text.push(constants_2.PermissionsText[String(permission)] ||
                `Unknown Permission (${permission})`);
        }
    }
    return text;
}
exports.permissionsText = permissionsText;
exports.ByteUnits = ["bytes", "kb", "mb", "gb", "tb"];
exports.SIByteUnits = ["bytes", "kib", "mib", "gib", "tib"];
function formatBytes(bytes, decimals = 2, noBiBytes = true) {
    if (bytes === 0)
        return "0 bytes";
    const delimiter = noBiBytes ? 1000 : 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = noBiBytes ? exports.ByteUnits : exports.SIByteUnits;
    const i = Math.floor(Math.log(bytes) / Math.log(delimiter));
    return (parseFloat((bytes / Math.pow(delimiter, i)).toFixed(dm)) + " " + sizes[i]);
}
exports.formatBytes = formatBytes;
function fileExtension(url) {
    return url.split(/[#?]/)[0].split(".").pop().trim();
}
exports.fileExtension = fileExtension;
