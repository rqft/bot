"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseslash_1 = require("../baseslash");
const average_color_1 = require("./average-color");
const brightness_1 = require("./brightness");
const color_1 = require("./color");
const fisheye_1 = require("./fisheye");
const invert_1 = require("./invert");
const mirror_1 = require("./mirror");
const resize_1 = require("./resize");
const rotate_1 = require("./rotate");
const saturation_1 = require("./saturation");
const spin_1 = require("./spin");
const tilt_1 = require("./tilt");
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
                new tilt_1.ImageTiltSlashSubCommand(),
                new average_color_1.ImageAverageColorSlashSubCommand(),
                new brightness_1.ImageBrightnessSlashSubCommand(),
                new fisheye_1.ImageFisheyeSlashSubCommand(),
                new invert_1.ImageInvertSlashSubCommand(),
                new saturation_1.ImageSaturationSlashSubCommand(),
            ],
        });
    }
}
exports.default = ImageSlashCommandGroup;
