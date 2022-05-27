"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
exports.animal = exports.AnimalMethods = exports.canvas = exports.CanvasMethods = exports.BannedImageOps = exports.instance = void 0;
const pariah_1 = require("pariah");
const error_1 = require("../error");
const tools_1 = require("../tools");
const Embed = __importStar(require("./embed"));
exports.instance = new pariah_1.APIs.SomeRandomApi.API();
exports.BannedImageOps = [
    pariah_1.APIs.SomeRandomApi.CanvasMisc.COLOR_VIEWER,
    pariah_1.APIs.SomeRandomApi.CanvasMisc.FAKE_TWEET,
    pariah_1.APIs.SomeRandomApi.CanvasMisc.FAKE_YOUTUBE_COMMENT,
    pariah_1.APIs.SomeRandomApi.CanvasMisc.HEX_TO_RGB,
    pariah_1.APIs.SomeRandomApi.CanvasFilter.COLOR,
    pariah_1.APIs.SomeRandomApi.CanvasMisc.ITS_SO_STUPID,
];
exports.CanvasMethods = (0, tools_1.mergeArrays)(Object.values(pariah_1.APIs.SomeRandomApi.CanvasFilter), Object.values(pariah_1.APIs.SomeRandomApi.CanvasMisc), Object.values(pariah_1.APIs.SomeRandomApi.CanvasOverlay)).filter((b) => !exports.BannedImageOps.includes(b));
async function canvas(context, args) {
    if (!args.target) {
        throw new error_1.Err("Can't find any images");
    }
    if (!args.method) {
        throw new error_1.Err("No canvas method specified");
    }
    if (!exports.CanvasMethods.includes(args.method)) {
        throw new error_1.Err(`Canvas method "${args.method}" is not supported.`);
    }
    args.target = await (0, tools_1.convert)(args.target);
    const { payload: data } = await exports.instance.canvas(args.method, args.target, args);
    const embed = await Embed.image(context, data, `${args.method}.png`);
    return await (0, tools_1.editOrReply)(context, { embed });
}
exports.canvas = canvas;
exports.AnimalMethods = Object.values(pariah_1.APIs.SomeRandomApi.Animals);
async function animal(context, args) {
    const data = await exports.instance.animal(args.animal);
    let embed = Embed.user(context);
    if (data.link) {
        embed = await Embed.image(context, data.link, `${args.animal}.png`);
    }
    if (data.fact) {
        embed.setDescription(data.fact);
    }
    return await (0, tools_1.editOrReply)(context, { embed });
}
exports.animal = animal;
