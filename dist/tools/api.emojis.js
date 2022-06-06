"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmojiData = void 0;
const pariah_1 = require("pariah");
var EmojiData;
(function (EmojiData) {
    EmojiData.Uri = new URL("https://emoji-api.com/");
    class API extends pariah_1.Pariah {
        token;
        constructor(token) {
            super(EmojiData.Uri);
            this.token = token;
        }
        async listAll() {
            return await this.get.json("/emojis", {
                access_key: this.token,
            });
        }
        async search(search) {
            return await this.get.json("/emojis", {
                access_key: this.token,
                search,
            });
        }
        async single(slug) {
            return await this.get.json("/emojis/:slug", {
                access_key: this.token,
                ":slug": slug,
            });
        }
        async categories() {
            return await this.get.json("/categories", {
                access_key: this.token,
            });
        }
        async category(slug) {
            return await this.get.json("/categories/:slug", {
                access_key: this.token,
                ":slug": slug,
            });
        }
        async searchBy(key, value) {
            const payload = await this.listAll();
            return payload.payload.find((emoji) => emoji[key] === value);
        }
    }
    EmojiData.API = API;
})(EmojiData = exports.EmojiData || (exports.EmojiData = {}));
