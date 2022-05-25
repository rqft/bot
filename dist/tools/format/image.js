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
exports.rotate = exports.resize = exports.color = exports.spin = exports.mirror = exports.instance = void 0;
const image_flop_1 = require("../../api/routes/image.flop");
const secrets_1 = require("../../secrets");
const api_1 = require("../api");
const tools_1 = require("../tools");
const Embed = __importStar(require("./embed"));
exports.instance = new api_1.Jonathan.API(secrets_1.Secrets.ApiToken);
async function mirror(context, args) {
    const { target, method } = args;
    const m = method || image_flop_1.MirrorMethods.LEFT;
    const image = await exports.instance.imageMirror(target, m);
    const embed = await Embed.image(context, image, `mirror-${m.toLowerCase()}.png`);
    return await (0, tools_1.editOrReply)(context, { embed });
}
exports.mirror = mirror;
async function spin(context, args) {
    const { target } = args;
    const image = await exports.instance.imageSpin(target);
    const embed = await Embed.image(context, image, "spin.gif");
    return await (0, tools_1.editOrReply)(context, { embed });
}
exports.spin = spin;
async function color(context, args) {
    const { color, size } = args;
    const image = await exports.instance.imageColor(size, color);
    const embed = await Embed.image(context, image, "color.png");
    return await (0, tools_1.editOrReply)(context, { embed });
}
exports.color = color;
async function resize(context, args) {
    const { target, size } = args;
    const image = await exports.instance.imageResize(target, size);
    const embed = await Embed.image(context, image, "resize.png");
    return await (0, tools_1.editOrReply)(context, { embed });
}
exports.resize = resize;
async function rotate(context, args) {
    let { target, degrees } = args;
    degrees %= 360;
    const image = await exports.instance.imageRotate(target, degrees);
    const embed = await Embed.image(context, image, "rotate.png");
    return await (0, tools_1.editOrReply)(context, { embed });
}
exports.rotate = rotate;
