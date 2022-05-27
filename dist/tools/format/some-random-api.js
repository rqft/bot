"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SomeRandomApi = void 0;
const pariah_1 = require("pariah");
const error_1 = require("../error");
const tools_1 = require("../tools");
const embed_1 = require("./embed");
var SomeRandomApi;
(function (SomeRandomApi) {
    SomeRandomApi.instance = new pariah_1.APIs.SomeRandomApi.API();
    SomeRandomApi.BannedImageOps = [
        pariah_1.APIs.SomeRandomApi.CanvasMisc.COLOR_VIEWER,
        pariah_1.APIs.SomeRandomApi.CanvasMisc.FAKE_TWEET,
        pariah_1.APIs.SomeRandomApi.CanvasMisc.FAKE_YOUTUBE_COMMENT,
        pariah_1.APIs.SomeRandomApi.CanvasMisc.HEX_TO_RGB,
        pariah_1.APIs.SomeRandomApi.CanvasFilter.COLOR,
        pariah_1.APIs.SomeRandomApi.CanvasMisc.ITS_SO_STUPID,
    ];
    SomeRandomApi.CanvasMethods = (0, tools_1.mergeArrays)(Object.values(pariah_1.APIs.SomeRandomApi.CanvasFilter), Object.values(pariah_1.APIs.SomeRandomApi.CanvasMisc), Object.values(pariah_1.APIs.SomeRandomApi.CanvasOverlay)).filter((b) => !SomeRandomApi.BannedImageOps.includes(b));
    async function canvas(context, args) {
        if (!args.target) {
            throw new error_1.Err("Can't find any images");
        }
        if (!args.method) {
            throw new error_1.Err("No canvas method specified");
        }
        if (!SomeRandomApi.CanvasMethods.includes(args.method)) {
            throw new error_1.Err(`Canvas method "${args.method}" is not supported.`);
        }
        args.target = await (0, tools_1.convert)(args.target);
        const { payload: data } = await SomeRandomApi.instance.canvas(args.method, args.target, args);
        const embed = await embed_1.Embed.image(context, data, `${args.method}.png`);
        return await (0, tools_1.editOrReply)(context, { embed });
    }
    SomeRandomApi.canvas = canvas;
    SomeRandomApi.AnimalMethods = Object.values(pariah_1.APIs.SomeRandomApi.Animals);
    async function animal(context, args) {
        const data = await SomeRandomApi.instance.animal(args.animal);
        let embed = embed_1.Embed.user(context);
        if (data.link) {
            embed = await embed_1.Embed.image(context, data.link, `${args.animal}.png`);
        }
        if (data.fact) {
            embed.setDescription(data.fact);
        }
        return await (0, tools_1.editOrReply)(context, { embed });
    }
    SomeRandomApi.animal = animal;
})(SomeRandomApi = exports.SomeRandomApi || (exports.SomeRandomApi = {}));
