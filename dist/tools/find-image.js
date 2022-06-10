"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Find = void 0;
const detritus_client_1 = require("detritus-client");
const constants_1 = require("detritus-client/lib/constants");
const tools_1 = require("./tools");
var Find;
(function (Find) {
    let Formats;
    (function (Formats) {
        Formats["MP3"] = "mp3";
        Formats["OGG"] = "ogg";
        Formats["WAV"] = "wav";
        Formats["FLAC"] = "flac";
        Formats["PNG"] = "png";
        Formats["JPG"] = "jpg";
        Formats["JPEG"] = "jpeg";
        Formats["GIF"] = "gif";
        Formats["WEBP"] = "webp";
        Formats["MP4"] = "mp4";
        Formats["WEBM"] = "webm";
        Formats["MOV"] = "mov";
    })(Formats = Find.Formats || (Find.Formats = {}));
    Find.TRUSTED_URLS = [
        "cdn.discordapp.com",
        "images-ext-1.discordapp.net",
        "images-ext-2.discordapp.net",
        "media.discordapp.net",
    ];
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
        if (context instanceof detritus_client_1.Command.Context) {
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
                return null;
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
                        return null;
                    }
                    return await context.rest.fetchUser(userId);
                }
                case constants_1.DiscordAbortCodes.UNKNOWN_USER: {
                    return null;
                }
                default: {
                    throw error;
                }
            }
        }
    }
    Find.fetchMemberOrUserById = fetchMemberOrUserById;
    function findImageUrlInAttachment(attachment, format) {
        if (attachment.proxyUrl && (attachment.height || attachment.width)) {
            if (format && attachment.extension !== format) {
                return null;
            }
            if (attachment.isImage) {
                if (attachment.url) {
                    const url = new URL(attachment.url);
                    if (Find.TRUSTED_URLS.includes(url.host)) {
                        return attachment.url;
                    }
                }
                return attachment.proxyUrl;
            }
            else if (attachment.isVideo) {
                return attachment.proxyUrl + "?format=" + (format || "png");
            }
        }
        return null;
    }
    Find.findImageUrlInAttachment = findImageUrlInAttachment;
    function findImageUrlInEmbed(embed, ignoreGIFV = false, format) {
        if (!ignoreGIFV && embed.type === constants_1.MessageEmbedTypes.GIFV) {
            const url = findImageUrlInEmbed(embed, true, format);
            if (url && url.endsWith(".gif")) {
                return url;
            }
            if (embed.url) {
                return embed.url;
            }
            return null;
        }
        const { image } = embed;
        if (image && image.proxyUrl && (image.height || image.width)) {
            if (image.url) {
                const url = new URL(image.url);
                if (Find.TRUSTED_URLS.includes(url.host)) {
                    return image.url;
                }
            }
            return image.proxyUrl;
        }
        const { thumbnail } = embed;
        if (thumbnail &&
            thumbnail.proxyUrl &&
            (thumbnail.height || thumbnail.width)) {
            if (thumbnail.url) {
                const url = new URL(thumbnail.url);
                if (Find.TRUSTED_URLS.includes(url.host)) {
                    return thumbnail.url;
                }
            }
            return thumbnail.proxyUrl;
        }
        const { video } = embed;
        if (video && video.proxyUrl && (video.height || video.width)) {
            return video.proxyUrl + "?format=png";
        }
        return null;
    }
    Find.findImageUrlInEmbed = findImageUrlInEmbed;
    function findImageUrlInMessage(message, url, format) {
        if (url) {
            for (let [, embed] of message.embeds) {
                if (embed.url === url) {
                    return findImageUrlInEmbed(embed, undefined, format);
                }
            }
        }
        for (let [, attachment] of message.attachments) {
            const url = findImageUrlInAttachment(attachment, format);
            if (url) {
                return url;
            }
        }
        for (let [, embed] of message.embeds) {
            const url = findImageUrlInEmbed(embed, undefined, format);
            if (url) {
                return url;
            }
        }
        for (let [, sticker] of message.stickerItems) {
            return sticker.assetUrl;
        }
        return null;
    }
    Find.findImageUrlInMessage = findImageUrlInMessage;
    function findImageUrlInMessages(messages, format) {
        for (const message of messages.values()) {
            const url = findImageUrlInMessage(message, null, format);
            if (url) {
                return url;
            }
        }
        return null;
    }
    Find.findImageUrlInMessages = findImageUrlInMessages;
    function findImageUrlsInMessage(message, format) {
        const urls = new Set();
        for (let [, attachment] of message.attachments) {
            const url = findImageUrlInAttachment(attachment, format);
            if (url) {
                urls.add(url);
            }
        }
        for (let [, embed] of message.embeds) {
            const url = findImageUrlInEmbed(embed, undefined, format);
            if (url) {
                urls.add(url);
            }
        }
        for (let [, sticker] of message.stickerItems) {
            urls.add(sticker.assetUrl);
        }
        return urls.size ? Array.from(urls) : [];
    }
    Find.findImageUrlsInMessage = findImageUrlsInMessage;
    function findImageUrlsInMessages(messages, format) {
        const urls = new Set();
        for (const message of messages.values()) {
            const urlsFound = findImageUrlsInMessage(message, format);
            for (let url of urlsFound) {
                urls.add(url);
            }
        }
        return urls.size ? Array.from(urls) : [];
    }
    Find.findImageUrlsInMessages = findImageUrlsInMessages;
    function findMediaUrlInAttachment(attachment, options) {
        const findAudio = !options || options.audio || options.audio === undefined;
        const findImage = !options || options.image || options.image === undefined;
        const findVideo = !options || options.video || options.video === undefined;
        if (options && options.format) {
            if (attachment.extension !== options.format) {
                return null;
            }
        }
        if (attachment.proxyUrl) {
            if (attachment.isAudio && !findAudio) {
                return null;
            }
            if (attachment.isImage &&
                (!findImage || !(attachment.height || attachment.width))) {
                return null;
            }
            if (attachment.isVideo &&
                (!findVideo || !(attachment.height || attachment.width))) {
                return null;
            }
            if (attachment.url) {
                const url = new URL(attachment.url);
                if (Find.TRUSTED_URLS.includes(url.host)) {
                    return attachment.url;
                }
            }
            return attachment.proxyUrl;
        }
        return null;
    }
    Find.findMediaUrlInAttachment = findMediaUrlInAttachment;
    function findMediaUrlInEmbed(embed, ignoreGIFV = false, options) {
        const findImage = !options || options.image || options.image === undefined;
        const findVideo = !options || options.video || options.video === undefined;
        if (!ignoreGIFV && embed.type === constants_1.MessageEmbedTypes.GIFV && findImage) {
            if (options && options.format) {
                if (options.format !== Formats.GIF) {
                    return null;
                }
            }
            const url = findImageUrlInEmbed(embed, true);
            if (url && url.endsWith(".gif")) {
                return url;
            }
            if (embed.url) {
                return embed.url;
            }
            return null;
        }
        const { image } = embed;
        if (image && image.proxyUrl && (image.height || image.width) && findImage) {
            if (image.url) {
                const url = new URL(image.url);
                if (Find.TRUSTED_URLS.includes(url.host)) {
                    return image.url;
                }
            }
            return image.proxyUrl;
        }
        const { thumbnail } = embed;
        if (thumbnail &&
            thumbnail.proxyUrl &&
            (thumbnail.height || thumbnail.width) &&
            findImage) {
            if (thumbnail.url) {
                const url = new URL(thumbnail.url);
                if (Find.TRUSTED_URLS.includes(url.host)) {
                    return thumbnail.url;
                }
            }
            return thumbnail.proxyUrl;
        }
        const { video } = embed;
        if (video && video.proxyUrl && (video.height || video.width) && findVideo) {
            if (video.url) {
                const url = new URL(video.url);
                if (Find.TRUSTED_URLS.includes(url.host)) {
                    return video.url;
                }
            }
            return video.proxyUrl;
        }
        return null;
    }
    Find.findMediaUrlInEmbed = findMediaUrlInEmbed;
    function findMediaUrlInMessage(message, url, options) {
        const findImage = !options || options.image || options.image === undefined;
        if (url) {
            for (let [, embed] of message.embeds) {
                if (embed.url === url) {
                    return findMediaUrlInEmbed(embed, false, options);
                }
            }
        }
        for (let [, attachment] of message.attachments) {
            const url = findMediaUrlInAttachment(attachment, options);
            if (url) {
                return url;
            }
        }
        for (let [, embed] of message.embeds) {
            const url = findMediaUrlInEmbed(embed, false, options);
            if (url) {
                return url;
            }
        }
        if (findImage) {
            for (let [, sticker] of message.stickerItems) {
                return sticker.assetUrl;
            }
        }
        return null;
    }
    Find.findMediaUrlInMessage = findMediaUrlInMessage;
    function findMediaUrlInMessages(messages, options) {
        for (const message of messages.values()) {
            const url = findMediaUrlInMessage(message, null, options);
            if (url) {
                return url;
            }
        }
        return null;
    }
    Find.findMediaUrlInMessages = findMediaUrlInMessages;
    function findMediaUrlsInMessage(message, options) {
        const findImage = !options || options.image || options.image === undefined;
        const urls = new Set();
        for (let [, attachment] of message.attachments) {
            const url = findMediaUrlInAttachment(attachment, options);
            if (url) {
                urls.add(url);
            }
        }
        for (let [, embed] of message.embeds) {
            const url = findMediaUrlInEmbed(embed, false, options);
            if (url) {
                urls.add(url);
            }
        }
        if (findImage) {
            for (let [, sticker] of message.stickerItems) {
                urls.add(sticker.assetUrl);
            }
        }
        return urls.size ? Array.from(urls) : [];
    }
    Find.findMediaUrlsInMessage = findMediaUrlsInMessage;
    function findMediaUrlsInMessages(messages, options) {
        const urls = new Set();
        for (const message of messages.values()) {
            const urlsFound = findMediaUrlsInMessage(message, options);
            for (let url of urlsFound) {
                urls.add(url);
            }
        }
        return urls.size ? Array.from(urls) : [];
    }
    Find.findMediaUrlsInMessages = findMediaUrlsInMessages;
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
        }
        const { channel } = context;
        if (channel) {
            const { messages } = channel;
            if (messages) {
                for (let [, message] of messages) {
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
                if (guild) {
                    const channelMembers = channel.members;
                    const members = findMembersByUsername(channelMembers, username, discriminator);
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
    Find.findMemberByChunk = findMemberByChunk;
    async function findMemberByChunkText(context, text) {
        const [username, discriminator] = (0, tools_1.splitTextToDiscordHandle)(text);
        return await findMemberByChunk(context, username, discriminator);
    }
    Find.findMemberByChunkText = findMemberByChunkText;
    async function findMembersByChunk(context, username, discriminator) {
        const guild = context.guild;
        if (guild) {
            if (!guild.isReady) {
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
    Find.findMembersByChunk = findMembersByChunk;
    async function findMembersByChunkText(context, text) {
        const [username, discriminator] = (0, tools_1.splitTextToDiscordHandle)(text);
        return await findMembersByChunk(context, username, discriminator);
    }
    Find.findMembersByChunkText = findMembersByChunkText;
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
    Find.findMemberByUsername = findMemberByUsername;
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
    Find.findMembersByUsername = findMembersByUsername;
})(Find = exports.Find || (exports.Find = {}));
