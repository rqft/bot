"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseslash_1 = require("../baseslash");
const image_1 = require("./image");
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
            ],
        });
    }
}
exports.default = SearchSlashCommandGroup;
