"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseslash_1 = require("../baseslash");
const color_1 = require("./color");
const mirror_1 = require("./mirror");
const resize_1 = require("./resize");
const spin_1 = require("./spin");
class ImageSlashCommandGroup extends baseslash_1.BaseSlashCommand {
    name = "image";
    description = "adobe photoshop";
    constructor() {
        super({
            options: [
                new mirror_1.ImageMirrorSlashSubCommand(),
                new spin_1.ImageSpinSlashSubCommand(),
                new color_1.ImageColorSlashSubCommand(),
                new resize_1.ImageResizeSlashSubCommand(),
            ],
        });
    }
}
exports.default = ImageSlashCommandGroup;
