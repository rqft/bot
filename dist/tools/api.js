"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoutubeSearch = void 0;
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
