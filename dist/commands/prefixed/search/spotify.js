"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pariah_1 = require("pariah");
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const parameters_1 = require("../../../tools/parameters");
const basecommand_1 = require("../basecommand");
class SearchSpotifyCommand extends basecommand_1.BaseCommand {
    constructor(client) {
        super(client, {
            name: "search spotify",
            metadata: (0, command_metadata_1.FunMetadata)("mp3", "<query: string> ?<-type: Array<MediaTypes>>", ["shiey settle down", "nf perception -type album"]),
            type: [{ name: "query", type: "string", consume: true }],
            args: [
                {
                    name: "type",
                    aliases: ["t"],
                    type: parameters_1.Parameters.array((value) => {
                        if (!Object.values(pariah_1.APIs.Spotify.Keys).includes(value)) {
                            throw new Error(`Invalid type ${value}`);
                        }
                        return value;
                    }, ","),
                    required: false,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Search.spotify;
}
exports.default = SearchSpotifyCommand;
