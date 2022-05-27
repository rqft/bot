"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Formatter = void 0;
const basic_1 = require("./format/basic");
const embed_1 = require("./format/embed");
const image_1 = require("./format/image");
const imagga_1 = require("./format/imagga");
const info_channel_1 = require("./format/info.channel");
const info_emoji_1 = require("./format/info.emoji");
const info_guild_1 = require("./format/info.guild");
const info_image_1 = require("./format/info.image");
const info_role_1 = require("./format/info.role");
const info_user_1 = require("./format/info.user");
const Other = __importStar(require("./format/other"));
const pxl_1 = require("./format/pxl");
const some_random_api_1 = require("./format/some-random-api");
const tag_1 = require("./format/tag");
exports.Formatter = {
    Basic: basic_1.Basic,
    Embed: embed_1.Embed,
    Pxl: pxl_1.Pxl,
    Image: image_1.Image,
    Tag: tag_1.Tag,
    Imagga: imagga_1.Imagga,
    SomeRandomApi: some_random_api_1.SomeRandomApi,
    Info: {
        channel: info_channel_1.channel,
        user: info_user_1.user,
        emoji: info_emoji_1.emoji,
        image: info_image_1.image,
        role: info_role_1.role,
        guild: info_guild_1.guild,
    },
    ...Other,
};
