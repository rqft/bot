"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
const image_flop_1 = require("../../api/routes/image.flop");
const secrets_1 = require("../../secrets");
const api_1 = require("../api");
const tools_1 = require("../tools");
const embed_1 = require("./embed");
var Image;
(function (Image) {
    Image.instance = new api_1.Jonathan.API(secrets_1.Secrets.ApiToken);
    async function mirror(context, args) {
        const { target, method } = args;
        const m = method || image_flop_1.MirrorMethods.LEFT;
        const { payload: image } = await Image.instance.imageMirror(target, m);
        const embed = await embed_1.Embed.image(context, image, `mirror-${m.toLowerCase()}.png`);
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
        const { payload: image } = await Image.instance.imageResize(target, size);
        const embed = await embed_1.Embed.image(context, image, "resize.png");
        return await (0, tools_1.editOrReply)(context, { embed });
    }
    Image.resize = resize;
    async function rotate(context, args) {
        let { target, degrees } = args;
        degrees %= 360;
        const { payload: image } = await Image.instance.imageRotate(target, degrees);
        const embed = await embed_1.Embed.image(context, image, "rotate.png");
        embed.setDescription(`Angle: ${degrees} degree(s)`);
        return await (0, tools_1.editOrReply)(context, { embed });
    }
    Image.rotate = rotate;
})(Image = exports.Image || (exports.Image = {}));