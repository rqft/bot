"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spotifySearch = void 0;
const api_1 = require("./api");
async function spotifySearch(search) {
    const cr = await api_1.api("https://evan.lol/spotify/search/top?q=" + encodeURIComponent(search), "json");
    if (cr.status == 404) {
        return undefined;
    }
    return cr;
}
exports.spotifySearch = spotifySearch;
