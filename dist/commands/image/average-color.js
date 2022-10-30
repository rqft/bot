"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const embed_1 = require("../../tools/embed");
const fetch_1 = require("../../tools/fetch");
const util_1 = require("../../tools/util");
const base_command_1 = require("../../wrap/base-command");
const builder_1 = require("../../wrap/builder");
exports.default = (0, builder_1.Command)('average-color [image] [image]', {
    args: (self) => ({
        image: self.imageUrl({ size: 512 }),
    }),
    metadata: (0, base_command_1.img)('get average color of image'),
}, async (context, args) => {
    const payload = await fetch_1.Instances.self.imageAverageColor(args.image);
    const color = payload.unwrap().data.toString(16).padStart(8);
    const embed = embed_1.Embeds.user(context);
    embed.setDescription((0, util_1.fmt)('Color: #{color}', { color }));
    embed.setImage('https://api.clancy.lol/image/color/256/' + color);
    embed.setThumbnail(args.image);
    return await (0, util_1.respond)(context, { embed });
});
