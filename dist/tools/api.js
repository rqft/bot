"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Waifu2x = exports.Sarah = exports.YoutubeSearch = void 0;
const timers_1 = require("detritus-utils/lib/timers");
const form_data_1 = __importDefault(require("form-data"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const pariah_1 = require("pariah");
var YoutubeSearch;
(function (YoutubeSearch) {
    YoutubeSearch.Url = new URL("https://youtube.googleapis.com/youtube/v3");
    class API extends pariah_1.Pariah {
        token;
        constructor(token) {
            super(YoutubeSearch.Url, { headers: { accept: "application/json" } });
            this.token = token;
        }
        async search(query, maxResults = 25) {
            return await this.get.json("/search", {
                part: ["snippet"],
                q: query,
                maxResults,
                key: this.token,
            });
        }
    }
    YoutubeSearch.API = API;
})(YoutubeSearch = exports.YoutubeSearch || (exports.YoutubeSearch = {}));
class Sarah extends pariah_1.APIs.Jonathan.API {
    url = new URL("http://localhost:3000");
}
exports.Sarah = Sarah;
var Waifu2x;
(function (Waifu2x) {
    Waifu2x.Url = new URL("https://api.alcaamado.es/api/");
    class API extends pariah_1.Pariah {
        constructor() {
            super(Waifu2x.Url);
        }
        async convert(data) {
            const form = new form_data_1.default();
            form.append("denoise", 1);
            form.append("scale", "true");
            form.append("file", data, {
                filename: "result.png",
                contentType: "image/png",
            });
            return await this.post.json("/v1/waifu2x/convert", {}, {
                body: form,
            });
        }
        async grab(hash, type = "png") {
            return await this.get.buffer("/v2/waifu2x/get", {
                hash,
                type,
            });
        }
        async check(hash) {
            return await this.get.json("/v2/waifu2x/check", {
                hash,
            });
        }
        async use(url, type = "png") {
            const data = await (0, node_fetch_1.default)(url);
            const buffer = await data.buffer();
            const hash = await this.convert(buffer);
            let finished = false;
            while (!finished) {
                const check = await this.check(hash.payload.hash);
                finished = check.payload.finished;
                console.log(check.payload);
                await (0, timers_1.sleep)(1000);
            }
            return await this.grab(hash.payload.hash, type);
        }
    }
    Waifu2x.API = API;
})(Waifu2x = exports.Waifu2x || (exports.Waifu2x = {}));
