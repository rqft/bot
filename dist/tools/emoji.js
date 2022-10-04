"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnicodeEmoji = exports.CustomEmoji = void 0;
const detritus_client_1 = require("detritus-client");
const constants_1 = require("../constants");
const globals_1 = require("../globals");
const util_1 = require("./util");
class CustomEmoji {
    animated = false;
    name;
    id;
    constructor(identifier) {
        console.log("C", identifier);
        if (/^<.+?>$/.test(identifier)) {
            identifier = identifier.replace(/^<:?|>$/g, "");
        }
        console.log("id", identifier);
        if (identifier.startsWith("a:")) {
            this.animated = true;
            identifier = identifier.replace(/^a:/, "");
        }
        console.log("id2", identifier);
        [this.name, this.id] = identifier.split(":");
    }
    identifier() {
        return (0, util_1.fmt)("[name]:[id]", {
            name: this.name,
            id: this.id,
        });
    }
    mention() {
        return (0, util_1.fmt)("<[animated]:[id]>", {
            animated: this.animated ? "a" : "",
            id: this.identifier(),
        });
    }
    url() {
        return (detritus_client_1.Endpoints.Urls.CDN.slice(0, -1) +
            detritus_client_1.Endpoints.CDN.EMOJI(this.id, this.animated ? "gif" : "png"));
    }
    data() {
        return globals_1.client.emojis.find((x) => x.id === this.id);
    }
    static url(text) {
        return new this(text).url();
    }
}
exports.CustomEmoji = CustomEmoji;
class UnicodeEmoji {
    emoji;
    constructor(emoji) {
        this.emoji = emoji;
    }
    codepoints() {
        return (0, util_1.toCodePointForTwemoji)(this.emoji);
    }
    url() {
        return `https://derpystuff.gitlab.io/webstorage3/container/twemoji-JedKxRr7RNYrgV9Sauy8EGAu/${this.codepoints()}.png`;
    }
    info() {
        return (constants_1.emojis.find((x) => x.emoji === this.emoji) ||
            (() => {
                throw new Error("Could not find emoji");
            })());
    }
}
exports.UnicodeEmoji = UnicodeEmoji;
