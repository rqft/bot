"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseslash_1 = require("../baseslash");
const ajit_1 = require("./ajit");
const emoji_mosaic_1 = require("./emoji-mosaic");
const eyes_1 = require("./eyes");
const flag_1 = require("./flag");
const glitch_1 = require("./glitch");
const jpeg_1 = require("./jpeg");
const lego_1 = require("./lego");
const screenshot_1 = require("./screenshot");
const snapchat_1 = require("./snapchat");
const sonic_1 = require("./sonic");
const thonkify_1 = require("./thonkify");
class PxlSlashCommandGroup extends baseslash_1.BaseSlashCommand {
    name = "pxl";
    description = "mat men";
    constructor() {
        super({
            options: [
                new ajit_1.PxlAjitSlashSubCommand(),
                new emoji_mosaic_1.PxlEmojiMosaicSlashSubCommand(),
                new eyes_1.PxlEyesSlashSubCommand(),
                new flag_1.PxlFlagSlashSubCommand(),
                new glitch_1.PxlGlitchSlashSubCommand(),
                new jpeg_1.PxlJpegSlashSubCommand(),
                new lego_1.PxlLegoSlashSubCommand(),
                new snapchat_1.PxlSnapchatSlashSubCommand(),
                new screenshot_1.PxlScreenshotSlashSubCommand(),
                new sonic_1.PxlSonicSlashSubCommand(),
                new thonkify_1.PxlThonkifySlashSubCommand(),
            ],
        });
    }
}
exports.default = PxlSlashCommandGroup;
