"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Find = void 0;
const constants_1 = require("detritus-client/lib/constants");
var Find;
(function (Find) {
    Find.TRUSTED_URLS = [
        "cdn.discordapp.com",
        "images-ext-1.discordapp.net",
        "images-ext-2.discordapp.net",
        "media.discordapp.net",
    ];
    function findImageUrlInAttachment(attachment, as) {
        if (attachment.proxyUrl && (attachment.height || attachment.width)) {
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
                return attachment.proxyUrl + `?format=${as || constants_1.ImageFormats.PNG}`;
            }
        }
        return null;
    }
    Find.findImageUrlInAttachment = findImageUrlInAttachment;
    function findImageUrlInEmbed(embed, ignoreGIFV = false, as) {
        if (!ignoreGIFV && embed.type === constants_1.MessageEmbedTypes.GIFV) {
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
            return video.proxyUrl + `?format=${as || constants_1.ImageFormats.PNG}`;
        }
        return null;
    }
    Find.findImageUrlInEmbed = findImageUrlInEmbed;
    function findImageUrlInMessage(message, url, as) {
        if (url) {
            for (const [, embed] of message.embeds) {
                if (embed.url === url) {
                    return findImageUrlInEmbed(embed, undefined, as);
                }
            }
        }
        for (const [, attachment] of message.attachments) {
            const url = findImageUrlInAttachment(attachment, as);
            if (url) {
                return url;
            }
        }
        for (const [, embed] of message.embeds) {
            const url = findImageUrlInEmbed(embed, undefined, as);
            if (url) {
                return url;
            }
        }
        for (const [, sticker] of message.stickerItems) {
            return sticker.assetUrl;
        }
        return null;
    }
    Find.findImageUrlInMessage = findImageUrlInMessage;
    function findImageUrlInMessages(messages, as) {
        for (const message of messages.values()) {
            const url = findImageUrlInMessage(message, undefined, as);
            if (url) {
                return url;
            }
        }
        return null;
    }
    Find.findImageUrlInMessages = findImageUrlInMessages;
    function findImageUrlsInMessage(message, as) {
        const urls = new Set();
        for (const [, attachment] of message.attachments) {
            const url = findImageUrlInAttachment(attachment, as);
            if (url) {
                urls.add(url);
            }
        }
        for (const [, embed] of message.embeds) {
            const url = findImageUrlInEmbed(embed, undefined, as);
            if (url) {
                urls.add(url);
            }
        }
        for (const [, sticker] of message.stickerItems) {
            urls.add(sticker.assetUrl);
        }
        return urls.size ? Array.from(urls) : [];
    }
    Find.findImageUrlsInMessage = findImageUrlsInMessage;
    function findImageUrlsInMessages(messages, as) {
        const urls = new Set();
        for (const message of messages.values()) {
            const urlsFound = findImageUrlsInMessage(message, as);
            for (const url of urlsFound) {
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
            for (const [, embed] of message.embeds) {
                if (embed.url === url) {
                    return findMediaUrlInEmbed(embed, false, options);
                }
            }
        }
        for (const [, attachment] of message.attachments) {
            const url = findMediaUrlInAttachment(attachment, options);
            if (url) {
                return url;
            }
        }
        for (const [, embed] of message.embeds) {
            const url = findMediaUrlInEmbed(embed, false, options);
            if (url) {
                return url;
            }
        }
        if (findImage) {
            for (const [, sticker] of message.stickerItems) {
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
        for (const [, attachment] of message.attachments) {
            const url = findMediaUrlInAttachment(attachment, options);
            if (url) {
                urls.add(url);
            }
        }
        for (const [, embed] of message.embeds) {
            const url = findMediaUrlInEmbed(embed, false, options);
            if (url) {
                urls.add(url);
            }
        }
        if (findImage) {
            for (const [, sticker] of message.stickerItems) {
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
            for (const url of urlsFound) {
                urls.add(url);
            }
        }
        return urls.size ? Array.from(urls) : [];
    }
    Find.findMediaUrlsInMessages = findMediaUrlsInMessages;
})(Find = exports.Find || (exports.Find = {}));
