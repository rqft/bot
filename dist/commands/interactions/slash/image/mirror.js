"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageMirrorSlashSubCommand = void 0;
const fetch_1 = require("@rqft/fetch");
const constants_1 = require("detritus-client/lib/constants");
const formatter_1 = require("../../../../tools/formatter");
const tools_1 = require("../../../../tools/tools");
const baseslash_1 = require("../baseslash");
class ImageMirrorSlashSubCommand extends baseslash_1.BaseSlashSubCommand {
    name = "mirror";
    description = "make image mirrored on self";
    constructor() {
        super({
            options: [
                new baseslash_1.BaseImageOption(),
                {
                    name: "method",
                    description: "what way to start from",
                    type: constants_1.ApplicationCommandOptionTypes.STRING,
                    required: false,
                    choices: Object.entries(fetch_1.APIs.Jonathan.MirrorMethods).map(([name, value]) => ({
                        name: (0, tools_1.toTitleCase)(name),
                        value,
                    })),
                },
            ],
        });
    }
    run = formatter_1.Formatter.Image.mirror;
}
exports.ImageMirrorSlashSubCommand = ImageMirrorSlashSubCommand;
