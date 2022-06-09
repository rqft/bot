"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchSpotifySlashSubCommand = void 0;
const constants_1 = require("detritus-client/lib/constants");
const pariah_1 = require("pariah");
const formatter_1 = require("../../../../tools/formatter");
const parameters_1 = require("../../../../tools/parameters");
const baseslash_1 = require("../baseslash");
class SearchSpotifySlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "spotify";
    description = "look at mp3";
    constructor() {
        super({
            options: [
                {
                    name: "query",
                    description: "what to search for",
                    type: constants_1.ApplicationCommandOptionTypes.STRING,
                    required: true,
                },
                {
                    name: "type",
                    description: "comma separated list of types",
                    type: constants_1.ApplicationCommandOptionTypes.STRING,
                    required: false,
                    value: parameters_1.Parameters.array((value) => {
                        if (!Object.values(pariah_1.APIs.Spotify.Keys).includes(value)) {
                            throw new Error(`Invalid type ${value}`);
                        }
                        return value;
                    }, ","),
                },
            ],
        });
    }
    run = formatter_1.Formatter.Search.urban;
}
exports.SearchSpotifySlashSubCommand = SearchSpotifySlashSubCommand;
