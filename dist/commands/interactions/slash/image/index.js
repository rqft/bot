"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseslash_1 = require("../baseslash");
const color_1 = require("./color");
const mirror_1 = require("./mirror");
const resize_1 = require("./resize");
const rotate_1 = require("./rotate");
const spin_1 = require("./spin");
const tint_1 = require("./tint");
const url_1 = require("./url");
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
                new rotate_1.ImageRotateSlashSubCommand(),
                new url_1.ImageUrlSlashSubCommand(),
                new tint_1.ImageTintSlashSubCommand(),
            ],
        });
    }
}
exports.default = ImageSlashCommandGroup;
