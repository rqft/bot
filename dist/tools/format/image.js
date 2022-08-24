"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
const fetch_1 = require("@rqft/fetch");
const api_1 = require("../api");
const error_1 = require("../error");
const tools_1 = require("../tools");
const embed_1 = require("./embed");
var Image;
(function (Image) {
    Image.instance = new api_1.Sarah();
    async function mirror(context, args) {
        const { target, method } = args;
        const m = method || fetch_1.APIs.Jonathan.MirrorMethods.LEFT;
        const { payload: image, headers } = await Image.instance.imageMirror(target, m);
        const embed = await embed_1.Embed.image(context, image, `mirror-${m.toLowerCase()}.${(0, tools_1.extensionFromHeaders)(headers)}`);
        return await (0, tools_1.editOrReply)(context, { embed });
    }
    Image.mirror = mirror;
    async function spin(context, args) {
        const { target } = args;
        const { payload: image } = await Image.instance.imageSpin(target);
        const embed = await embed_1.Embed.image(context, image, "spin.gif");
        return await (0, tools_1.editOrReply)(context, { embed });
    }
    Image.spin = spin;
    async function color(context, args) {
        const { color, size } = args;
        const { payload: image } = await Image.instance.imageColor(size, color);
        const embed = await embed_1.Embed.image(context, image, "color.png");
        return await (0, tools_1.editOrReply)(context, { embed });
    }
    Image.color = color;
    async function resize(context, args) {
        const { target, size } = args;
        const { payload: image, headers } = await Image.instance.imageResize(target, size);
        const embed = await embed_1.Embed.image(context, image, `resize.${(0, tools_1.extensionFromHeaders)(headers)}`);
        return await (0, tools_1.editOrReply)(context, { embed });
    }
    Image.resize = resize;
    async function rotate(context, args) {
        let { target, degrees } = args;
        degrees %= 360;
        const { payload: image, headers } = await Image.instance.imageRotate(target, degrees);
        const embed = await embed_1.Embed.image(context, image, `rotate.${(0, tools_1.extensionFromHeaders)(headers)}`);
        embed.setDescription(`Angle: ${degrees} degree(s)`);
        return await (0, tools_1.editOrReply)(context, { embed });
    }
    Image.rotate = rotate;
    async function url(context, args) {
        const name = (0, tools_1.fileNameFromUrl)(args.target) || "unknown.gif";
        const embed = await embed_1.Embed.image(context, args.target, "url." + (0, tools_1.extensionFromFileName)(name));
        embed.setDescription(`URL: [${name}](${args.target})`);
        return await (0, tools_1.editOrReply)(context, { embed });
    }
    Image.url = url;
    async function tilt(context, args) {
        const { target, amount } = args;
        const { payload: image, headers } = await Image.instance.imageTilt(target, amount);
        const embed = await embed_1.Embed.image(context, image, `tilt.${(0, tools_1.extensionFromHeaders)(headers)}`);
        return await (0, tools_1.editOrReply)(context, { embed });
    }
    Image.tilt = tilt;
    async function tint(context, args) {
        const { target, color, opacity } = args;
        const { payload: image, headers } = await Image.instance.imageTint(target, color, (opacity || 50) / 100);
        const embed = await embed_1.Embed.image(context, image, `tint.${(0, tools_1.extensionFromHeaders)(headers)}`);
        return await (0, tools_1.editOrReply)(context, { embed });
    }
    Image.tint = tint;
    async function averageColor(context, args) {
        const { target } = args;
        const { payload: { data: color }, } = await Image.instance.imageAverageColor(target);
        const { payload: image } = await Image.instance.imageColor(512, color.toString(16));
        const embed = await embed_1.Embed.image(context, image, "color.png");
        return await (0, tools_1.editOrReply)(context, { embed });
    }
    Image.averageColor = averageColor;
    async function brightness(context, args) {
        const { target, amount } = args;
        const { payload: image, headers } = await Image.instance.imageBrightness(target, (amount || 50) / 100);
        const embed = await embed_1.Embed.image(context, image, `brightness.${(0, tools_1.extensionFromHeaders)(headers)}`);
        return await (0, tools_1.editOrReply)(context, { embed });
    }
    Image.brightness = brightness;
    async function fisheye(context, args) {
        const { target, amount } = args;
        const { payload: image, headers } = await Image.instance.imageFisheye(target, amount || 2);
        const embed = await embed_1.Embed.image(context, image, `fisheye.${(0, tools_1.extensionFromHeaders)(headers)}`);
        return await (0, tools_1.editOrReply)(context, { embed });
    }
    Image.fisheye = fisheye;
    async function invert(context, args) {
        const { target, method } = args;
        const m = method || fetch_1.APIs.Jonathan.InvertMethods.INVERT;
        const { payload: image } = await Image.instance.imageInvert(target, m);
        const embed = await embed_1.Embed.image(context, image, `invert-${m.toLowerCase()}.png`);
        return await (0, tools_1.editOrReply)(context, { embed });
    }
    Image.invert = invert;
    async function saturation(context, args) {
        const { target, amount } = args;
        const { payload: image, headers } = await Image.instance.imageSaturation(target, (amount || 50) / 100);
        const embed = await embed_1.Embed.image(context, image, `saturation.${(0, tools_1.extensionFromHeaders)(headers)}`);
        return await (0, tools_1.editOrReply)(context, { embed });
    }
    Image.saturation = saturation;
    const w2xInstance = new api_1.Waifu2x.API();
    async function upscale(context, args) {
        const { target } = args;
        const { payload: image } = await w2xInstance.use(target);
        const embed = await embed_1.Embed.image(context, image, "upscale.png");
        return await (0, tools_1.editOrReply)(context, { embed });
    }
    Image.upscale = upscale;
    async function generate(context, args) {
        const { query, style } = args;
        const { payload } = await Image.instance.wombo(style, query);
        if (payload.status.state === "error") {
            throw new error_1.Err(payload.status.message, { status: payload.status.code });
        }
        const embed = await embed_1.Embed.image(context, payload.data, "wombo.png", undefined, true);
        return await (0, tools_1.editOrReply)(context, { embed });
    }
    Image.generate = generate;
    async function graph(context, args) {
        console.log(Image.instance.url);
        const r = await Image.instance.graph(args.expr, args);
        const txt = new TextDecoder().decode(r.payload);
        let j = null;
        try {
            j = JSON.parse(txt);
        }
        catch {
            const embed = await embed_1.Embed.image(context, r.payload, "graph.png");
            return await (0, tools_1.editOrReply)(context, { embed });
        }
        if (j !== null || j !== undefined) {
            if (a(j)) {
                throw new error_1.Err(j.status.message, { status: j.status.code });
            }
        }
        return null;
    }
    Image.graph = graph;
})(Image = exports.Image || (exports.Image = {}));
function a(j) {
    return "status" in j;
}
