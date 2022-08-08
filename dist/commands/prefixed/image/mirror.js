"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_1 = require("@rqft/fetch");
const command_metadata_1 = require("../../../tools/command-metadata");
const formatter_1 = require("../../../tools/formatter");
const basecommand_1 = require("../basecommand");
class ImageMirrorCommand extends basecommand_1.BaseImageCommand {
    constructor(client) {
        super(client, {
            name: "image mirror",
            metadata: (0, command_metadata_1.ImageMetadata)("mirror an image on itself", "<target: Image> <method: MirrorMethod=left>", ["insyri left", "@insyri#7314 right", "533757461706964993 top"]),
            args: [
                {
                    name: "method",
                    type: "string",
                    default: fetch_1.APIs.Jonathan.MirrorMethods.LEFT,
                    choices: Object.values(fetch_1.APIs.Jonathan.MirrorMethods),
                    required: false,
                },
            ],
        });
    }
    run = formatter_1.Formatter.Image.mirror;
}
exports.default = ImageMirrorCommand;
