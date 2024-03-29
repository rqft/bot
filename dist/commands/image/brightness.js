"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const embed_1 = require("../../tools/embed");
const fetch_1 = require("../../tools/fetch");
const util_1 = require("../../tools/util");
const base_command_1 = require("../../wrap/base-command");
const builder_1 = require("../../wrap/builder");
exports.default = (0, builder_1.Command)('brightness [image] [amount?] [-scale?]', {
    args: (self) => ({
        image: self.imageUrl({ size: 512 }),
        amount: self.number(),
        scale: self.booleanOptional(),
    }),
    metadata: (0, base_command_1.img)('set brightness of image', ['2', '2 -scale', '2', '2']),
}, async (context, args) => {
    const payload = await fetch_1.Instances.self
        .imageBrightness(args.image, args.amount, args.scale)
        .then((0, util_1.handleError)(context));
    return await (0, util_1.respond)(context, await embed_1.Embeds.image(context, payload.unwrap(), 'brightness'));
});
