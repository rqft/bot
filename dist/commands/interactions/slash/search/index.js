"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseslash_1 = require("../baseslash");
const dictionary_1 = require("./dictionary");
const image_1 = require("./image");
const spotify_1 = require("./spotify");
const urban_1 = require("./urban");
const web_1 = require("./web");
const youtube_1 = require("./youtube");
class SearchSlashCommandGroup extends baseslash_1.BaseSlashCommand {
    name = "search";
    description = "google exists you know";
    constructor() {
        super({
            options: [
                new image_1.SearchImageSlashSubCommand(),
                new web_1.SearchWebSlashSubCommand(),
                new youtube_1.SearchYoutubeSlashSubCommand(),
                new dictionary_1.SearchDictionarySlashSubCommand(),
                new urban_1.SearchUrbanSlashSubCommand(),
                new spotify_1.SearchSpotifySlashSubCommand(),
            ],
        });
    }
}
exports.default = SearchSlashCommandGroup;
